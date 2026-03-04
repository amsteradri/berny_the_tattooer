// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from '@/lib/session'
import { cookies } from 'next/headers'

// Rutas 100% protegidas (ejemplo)
const protectedRoutes = ['/perfil', '/mis-cursos']
const publicRoutes = ['/login', '/signup', '/']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  const cookie = (await cookies()).get('session')?.value
  const session = cookie ? await decrypt(cookie) : null

  // 1. Si intenta ir a ruta protegida y no tiene sesión -> Login
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  // 2. Si intenta ir a login/signup y YA tiene sesión -> Dashboard
  if (isPublicRoute && session?.userId && !path.startsWith('/') && path !== '/') {
    // Si estuviéramos en /login o /signup lo mandaríamos a /perfil o /
     return NextResponse.redirect(new URL('/perfil', req.nextUrl))
  }

  return NextResponse.next()
}


export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
