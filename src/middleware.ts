
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = req.nextUrl.pathname

  if (!user) {
    if (pathname.startsWith('/admin') || pathname === '/sugestoes/novasugestao') {
      const loginUrl = req.nextUrl.clone()
      loginUrl.pathname = '/login'
      return NextResponse.redirect(loginUrl)
    }
    return res
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('email', user.email)
    .single()

  if (error || !profile) {
    return res
  }

  if (pathname.startsWith('/admin') && profile.role !== 'admin') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return res
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/sugestoes/novasugestao',
  ],
}
