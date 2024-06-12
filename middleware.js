// import { NextResponse } from 'next/server';
// import { useSelector } from 'react-redux';
// import Session from './service/session';

// // This function can be marked `async` if using `await` inside
// export function middleware(request) {
//   // Implement your middleware logic here
//   // For example, checking for authentication
//   const isAuthenticated = checkAuthentication(request);

//   // If authenticated, allow access to the private route
//   if (isAuthenticated) {
//     return NextResponse.next();
//   } else {
//     // If not authenticated, redirect to the home page or login page
//     return NextResponse.redirect(new URL('/login', request.url));
//   }
// }

// function checkAuthentication(request) {
//   // Implement your authentication logic here
//   // For example, check if the user is logged in
//   // request.authToken
//   // const authToken = request.authToken.get('authToken');
//   // const {authToken}=useSelector()
//   const authToken = Session.get('authToken');
//   console.log("authToken-->", authToken);
//   return authToken !== undefined; // Return true if authenticated, false otherwise
// }

// // Specify the type of middleware and paths to match
// export const config = {
//   type: 'function', // Specify the type of middleware
//   matcher: ['/salonlist/salonid/salon', '/my-appointment', '/wishlist', '/profile'],
// };

import { NextResponse } from 'next/server';
import { parse } from 'cookie';

export function middleware(request) {
  const publicPaths = ['/login', '/signup'];
  const { pathname } = new URL(request.url);

  const isPublicPath = publicPaths.includes(pathname);

  if (isPublicPath) {
    return NextResponse.next();
  }

  const isAuthenticated = checkAuthentication(request);

  if (isAuthenticated) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

function checkAuthentication(request) {
  const cookies = parse(request.headers.get('cookie') || '');
  const authToken = cookies.authToken;
  console.log("authToken -->", authToken); // Token को कंसोल में प्रिंट करना
  return authToken !== undefined;
}

export function logout() {
  // यहां कुकी को क्लाइंट-साइड पर हटाने के लिए लॉजिक जोड़ा जा सकता है
  // हालांकि, क्लाइंट-साइड कोड यहां काम नहीं करेगा क्योंकि यह सर्वर-साइड मिडलवेयर है
}

export const config = {
  matcher: [
    '/salonlist/salonid/salon',
    '/my-appointment',
    '/wishlist',
    '/profile',
    '/protected/(.*)' // Add other protected routes here if needed
  ],
};
