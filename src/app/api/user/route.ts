
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import {jwtVerify} from 'jose'

interface TokenPayload {
    email: string;
    userId: string;
}

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const secretKey = process.env.JWT_ACCESS_SECRET;

        if (!secretKey) {
            console.error("CRITICAL CONFIG ERROR: JWT_ACCESS_SECRET is not defined.");
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
        const encodedSecret = new TextEncoder().encode(secretKey);
        const { payload } = await jwtVerify(token, encodedSecret);
        const decodedPayload = payload as unknown as TokenPayload;

        return NextResponse.json({
            success: true,
            data: {
                email: decodedPayload.email,
            }
        })
    }catch (error: unknown){
       if (error instanceof Error){
           if (error.name === 'JWTExpired' || error.name === 'JAWSSignatureVerificationFailed' ){
               return NextResponse.json({ error: "Invalid or Expired Token" }, { status: 401 });
           }
           console.error("JWT Verification System Error:", error.message);
       }

        return NextResponse.json({ error: "Internal Authentication Error" }, { status: 500 });
    }

}