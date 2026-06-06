import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware only handles API token forwarding, not authentication redirects
// Client-side authentication is handled by AuthContext

export function middleware(request: NextRequest) {
  // Just pass through - authentication is handled client-side
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes (handled separately)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
