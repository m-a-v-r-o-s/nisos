import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, ADMIN_COOKIE_VALUE } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isLogin = pathname.startsWith("/login");
  const authed = req.cookies.get(ADMIN_COOKIE)?.value === ADMIN_COOKIE_VALUE;

  if (!authed && !isLogin) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
  if (authed && isLogin) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  // Protect everything except Next internals and public static assets. `flags`
  // (and any /*.svg|png|jpg|ico) must stay reachable so the login page — which is
  // unauthenticated — can load the language flags instead of getting redirected.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|flags/|.*\\.(?:svg|png|jpg|jpeg|webp|ico)$).*)"],
};
