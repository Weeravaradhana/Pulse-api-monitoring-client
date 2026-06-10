import {NextRequest, NextResponse} from "next/server";

export function middleware(request: NextRequest){
    const {pathname} = request.nextUrl;
    const hasRegistrationIntent = request.cookies.has('registration_intent');
    const accessToken = request.cookies.has('accessToken');

    if (pathname.startsWith('/verify-otp')){
        if (!hasRegistrationIntent){
            return NextResponse.redirect(new URL('/register', request.url));
        }
    }

   if (pathname.startsWith('/dashboard')){
        if (!accessToken){
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    if (pathname === '/login' || pathname === '/register'){
        if (accessToken){
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/verify-otp',
        '/dashboard/:path*',
        '/login',
        '/register'
    ]
}