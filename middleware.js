import { NextResponse } from 'next/server';
import { useSelector } from 'react-redux';
import Session from './service/session';

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  // Implement your middleware logic here
  // For example, checking for authentication
  const isAuthenticated = checkAuthentication(request);

  // If authenticated, allow access to the private route
  if (isAuthenticated) {
    return NextResponse.next();
  } else {
    // If not authenticated, redirect to the home page or login page
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

function checkAuthentication(request) {
  // Implement your authentication logic here
  // For example, check if the user is logged in
  // request.authToken
  // const authToken = request.authToken.get('authToken');
  // const {authToken}=useSelector()
  const authToken = Session.get('authToken');
  console.log("authToken-->",authToken);
  return authToken !== undefined; // Return true if authenticated, false otherwise
}

// Specify the type of middleware and paths to match
export const config = {
  type: 'function', // Specify the type of middleware
  matcher: ['/salonlist/salonid/salon', '/my-appointment', '/wishlist'],
};
