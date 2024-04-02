// export {default} from "next-auth/middleware";

// export const config={matcher:['/cataract','/cholec']}   


import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export {default} from "next-auth/middleware";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - `/api` (API routes)
     * - `/_next` (Next.js internals)
     * - `/examples` (Next.js examples)
     * - `/` (Next.js root)
     * - Static files like _next/static
     * - and any other route you want to exclude
     */
    '/((?!api|_next|examples|.*\\..*|static|favicon.ico).*)',
    '/cataract/:path*',
    '/cholec/:path*'
  ]
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (pathname.startsWith('/cataract') || pathname.startsWith('/cholec')) {
    // Protect the routes starting with /cataract and /cholec
    const session = req.cookies.get('next-auth.session-token')?.value
    const isAuthenticated = !!session
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/api/auth/signin', req.url))
    }
  }
  return NextResponse.next()
}