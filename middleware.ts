import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkSession } from "@/lib/api/serverApi";
import { cookies } from "next/headers";

const AUTH_ROUTES = ["/sign-in", "/sign-up"];
const PRIVATE_ROUTES = ["/profile", "/notes"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!accessToken && refreshToken) {
    try {
      const res = await checkSession();

      if (res instanceof Response) {
        const setCookieHeader = res.headers.get("set-cookie");

        if (setCookieHeader) {
          const response = NextResponse.next();
          response.headers.set("set-cookie", setCookieHeader);

          const isAuthRoute = AUTH_ROUTES.some((route) =>
            pathname.startsWith(route)
          );

          if (isAuthRoute) {
            return NextResponse.redirect(new URL("/", req.url));
          }

          return response;
        }
      }
    } catch {
    }
  }

  const isPrivateRoute = PRIVATE_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  if (isPrivateRoute && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
