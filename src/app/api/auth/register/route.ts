import axios from "axios";
import {NextResponse} from "next/server";

export async function POST(request: Request){
    try {
        const body = await request.json();
        const { firstName, lastName, email, password } = body;
        const backendResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`,{
            firstName,
            lastName,
            email,
            password
        });

        return NextResponse.json({success: true, data: backendResponse.data})
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