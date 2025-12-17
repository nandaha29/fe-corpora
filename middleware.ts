import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const pathname = request.nextUrl.pathname

  // Enable back/forward cache (bfcache) by setting appropriate headers
  // Only in production to avoid conflicts with dev server WebSocket
  if (process.env.NODE_ENV === 'production') {
    // Don't override cache-control if it's already set appropriately
    // Just ensure we're not blocking bfcache
    const existingCacheControl = response.headers.get('cache-control')
    
    // Only modify if it's blocking bfcache
    if (existingCacheControl?.includes('no-store')) {
      // Replace no-store with revalidate strategy
      response.headers.set(
        'Cache-Control',
        'public, max-age=0, must-revalidate'
      )
    }
  }

  // Build Link headers array for resource hints
  const linkHeaders: string[] = []

  // Add preload link for LCP image on /tentang page
  // This ensures LCP image is discoverable from initial HTML via Link header
  if (pathname === '/tentang' || pathname === '/tentang/') {
    linkHeaders.push(
      '</DSC08518.JPG>; rel=preload; as=image; fetchpriority=high; crossorigin=anonymous'
    )
  }

  // Set all Link headers
  if (linkHeaders.length > 0) {
    response.headers.set('Link', linkHeaders.join(', '))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

