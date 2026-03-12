// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from '@/lib/session'
import { cookies } from 'next/headers'

// Rutas que requieren sesión activa
const protectedRoutes = ['/perfil', '/mis-cursos']
// Rutas solo para admins
const adminRoutes = ['/admin']
// Rutas solo para usuarios sin sesión (login/signup)
const authOnlyRoutes = ['/login', '/signup']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  const cookie = (await cookies()).get('session')?.value
  let session = null
  if (cookie) {
    try {
      session = await decrypt(cookie)
    } catch {
      // Cookie inválida o firmada con secreto antiguo — la eliminamos aquí
      const response = NextResponse.next()
      response.cookies.delete('session')
      return response
    }
  }

  const isProtectedRoute = protectedRoutes.some(r => path === r || path.startsWith(r + '/'))
  const isAdminRoute = adminRoutes.some(r => path === r || path.startsWith(r + '/'))
  const isAuthOnlyRoute = authOnlyRoutes.includes(path)

  // 1. Ruta de usuario autenticado sin sesión → Login
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  // 2. Ruta de admin — requiere sesión (el rol se verifica en cada server action/page)
  if (isAdminRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  // 3. Login/Signup con sesión activa → Inicio
  if (isAuthOnlyRoute && session?.userId) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
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
