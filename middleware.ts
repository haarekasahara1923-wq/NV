import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('nvstudio_token')?.value
  const { pathname } = request.nextUrl

  const protectedRoutes = ['/dashboard', '/me-dashboard', '/admin']
  const isProtected = protectedRoutes.some(r => pathname.startsWith(r))

  if (!isProtected) return NextResponse.next()
  if (!token) return NextResponse.redirect(new URL('/login', request.url))

  try {
    const payload = verifyToken(token)

    // Role-based access control
    if (pathname.startsWith('/admin') && payload.role !== 'ADMIN')
      return NextResponse.redirect(new URL('/dashboard', request.url))

    if (pathname.startsWith('/me-dashboard') && payload.role !== 'MARKETING_EXECUTIVE')
      return NextResponse.redirect(new URL('/dashboard', request.url))

    if (pathname.startsWith('/dashboard') && payload.role === 'ADMIN')
      return NextResponse.redirect(new URL('/admin', request.url))

    if (pathname.startsWith('/dashboard') && payload.role === 'MARKETING_EXECUTIVE')
      return NextResponse.redirect(new URL('/me-dashboard', request.url))

  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/me-dashboard/:path*', '/admin/:path*'],
}
