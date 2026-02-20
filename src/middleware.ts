import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "vi"] as const;

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const segments = pathname.split("/").filter(Boolean);
  const maybeLang = segments[0];

  if (locales.includes(maybeLang as (typeof locales)[number])) {
    return NextResponse.next();
  }

  const locale = request.cookies.get("NEXT_LOCALE")?.value ?? "en";
  const resolved = locales.includes(locale as (typeof locales)[number]) ? locale : "en";
  const url = request.nextUrl.clone();
  url.pathname = `/${resolved}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
