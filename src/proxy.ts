import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const locales = ['en', 'vi'] as const;

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const segments = pathname.split('/').filter(Boolean);
  const maybeLang = segments[0];

  if (locales.includes(maybeLang as (typeof locales)[number])) {
    return NextResponse.next();
  }

  const locale = request.cookies.get('NEXT_LOCALE')?.value ?? 'en';
  const resolved = locales.includes(locale as (typeof locales)[number])
    ? locale
    : 'en';
  const url = request.nextUrl.clone();
  url.pathname = `/${resolved}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    '/((?!_next|hero|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg).*)',
    '/(en|vi)/:path*',
  ],
};
