import { NextRequest, NextResponse } from "next/server";

export function middleware(request:NextRequest){
    const useCookie = request.cookies.get('user')
    const isLoggedIn = !!useCookie
    const protectedPaths = ['/products/add', '/products/edit']
    const isProtectedPath = protectedPaths.some(path =>
        request.nextUrl.pathname.startsWith(path)
    )
    if (isProtectedPath && !isLoggedIn) {
        return NextResponse.redirect(new URL('/login',request.url))
    } 
    return NextResponse.next()
}
export const config ={
    matcher:['/products/:path*']
}