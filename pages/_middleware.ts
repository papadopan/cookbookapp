import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  // Only rewrite requests to `/`, as _middleware on the `/pages` root will be executed in every request of the app.
  if (url.pathname === '/') {
    // Parse the cookie
    const isCookie = req.cookies['ckbk']

    // Rewrite to the correct page
    if (!isCookie) {
      url.pathname = '/login'
      return isCookie && NextResponse.rewrite(url)
    }
  }
}
