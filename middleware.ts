// middleware.ts
// Proteção de rotas: Pública (deslogado) vs. Privada (logado)

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── ROTAS PÚBLICAS (Deslogado) ─────────────────────────────────────
  const publicRoutes = ['/', '/checkout', '/api/auth', '/api/payment'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // ── ROTAS PRIVADAS (Logado) ───────────────────────────────────────
  const privateRoutes = ['/iniciar', '/buscar', '/evoluir', '/conectar'];
  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));

  // ── CRIAR CLIENT SUPABASE (verificar auth) ─────────────────────────
  let supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          const response = NextResponse.next();
          response.cookies.set({
            name,
            value,
            ...options,
          });
          return response;
        },
        remove(name: string, options: CookieOptions) {
          const response = NextResponse.next();
          response.cookies.delete(name);
          return response;
        },
      },
    }
  );

  // ── VERIFICAR SESSÃO ───────────────────────────────────────────────
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // ── LÓGICA DE REDIRECIONAMENTO ─────────────────────────────────────

  // Se está em rota PRIVADA e NÃO tem sessão → redireciona para /
  if (isPrivateRoute && !session) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Se está em rota PÚBLICA (/ ou /checkout) e TEM sessão → redireciona para /iniciar
  if ((pathname === '/' || pathname === '/checkout') && session) {
    return NextResponse.redirect(new URL('/iniciar', request.url));
  }

  // Se tenta acessar /api/auth sem estar em /api/auth/* → permite (NextAuth)
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

// ── MATCHER: Aplica middleware apenas em certas rotas ─────────────────
export const config = {
  matcher: [
    // Protege rotas públicas/privadas
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
