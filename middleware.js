import { NextResponse } from 'next/server';

export async function middleware(req) {
  const protectedRoutes = ['/wishList', '/profile','/appointment','/notifications','/'];

  if (protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
    const token = req.cookies.get('token');
    //const token =tokenData.value ;// Assuming token is stored in cookies
    if (!token) {
     const loginUrl = new URL('/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
   matcher: [ '/wishList', '/profile','/appointment','/notifications',],
};