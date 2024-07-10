import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login', // Redirect users to our custom login page
  },  
  callbacks: {
    // Prevent users from accessing the dashboard pages unless they are logged in.
    // The auth property contains the user's session, 
    // The request property contains the incoming request.
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      
      return true;
    },
  },
  // An array of different login options / providers
  providers: [],
} satisfies NextAuthConfig;