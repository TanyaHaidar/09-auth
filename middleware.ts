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

  const isPrivateRoute = PRIVATE_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  if (!accessToken && refreshToken) {
    try {
      const response = await checkSession();

      const setCookieHeader = response?.headers?.get?.("set-cookie");
      if (setCookieHeader) {
        const res = NextResponse.next();
        res.headers.set("set-cookie", setCookieHeader);
        if (isAuthRoute) {
          return NextResponse.redirect(new URL("/", req.url));
        }
        return res;
      }
    } catch {
    }
  }

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
