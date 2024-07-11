import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    // Redirect users to the custom login page
    signIn: '/login', 
  },  
  callbacks: {
    // Prevent users from accessing the dashboard pages unless they are logged in.
    // The auth property contains the user's session, 
    // The request property contains the incoming request.
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      
      if (isOnDashboard) {
        // If a user is authenticated, allow them to access dashboard page.
        if (isLoggedIn) return true; 
        // If a user is unauthenticated, redirect them to login page.
        return false; 
      } else if (isLoggedIn) {
        // If a user is authenticated but not in dashboard page, 
        //   redirect them to dashboard page.
        return Response.redirect(new URL('/dashboard', nextUrl));  
      }
      
      return true;
    },
  },
  // An array of different login options / providers
  providers: [],
} satisfies NextAuthConfig;