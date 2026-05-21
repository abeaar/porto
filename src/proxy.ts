import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";

// In Next.js 16, middleware is renamed to "proxy".
// The exported function must be named `proxy`.
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Protect all /admin routes except the login page itself
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const isAuthenticated = await getSession();

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
