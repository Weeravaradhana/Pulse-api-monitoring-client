import {NextRequest, NextResponse} from "next/server";

export function middleware(request: NextRequest){
    const {pathname} = request.nextUrl;

    if (pathname.startsWith('/verify-otp')){
        const hasRegistrationIntent = request.cookies.has('registration_intent');

        if (!hasRegistrationIntent){
            return NextResponse.redirect(new URL('/register', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/verify-otp']
}