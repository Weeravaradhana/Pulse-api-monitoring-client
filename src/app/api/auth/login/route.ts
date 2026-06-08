import axios from 'axios';
import {NextRequest, NextResponse} from "next/server";
import {setCookie} from 'cookies-next';


export async function POST(request: NextRequest){
    try {
        const body = await request.json();
        const { email, password } = body;
        const backendResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            email,
            password
        });

        const {accessToken, user, refreshToken} = backendResponse.data;
        const response = NextResponse.json({success: true, user});

        setCookie('accessToken', accessToken, {
            req: request,
            res: response,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60,
            path: '/'
        });
        setCookie('refreshToken',refreshToken, {
            req: request,
            res: response,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7*24*60*60,
            path: '/'
        })
        return response;

    }catch (error: unknown){
        let statusCode = 500;
        let errorMessage = 'Authentication failed';

        if (axios.isAxiosError(error)){
            statusCode = error.response?.status || 500;
            errorMessage = error.response?.data?.message || errorMessage;
        }

        return NextResponse.json({message: errorMessage}, {status: statusCode})
    }
}





















