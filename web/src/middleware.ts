import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const ADMIN_COOKIE_NAME = "kiut_admin_session";

function getJwtSecret(): Uint8Array | null {
  const secret = process.env.ADMIN_JWT_SECRET?.trim().replace(/^['"]|['"]$/g, "");
  if (!secret || secret.length < 16) {
    return null;
  }
  return new TextEncoder().encode(secret);
}

async function isTokenValid(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const secret = getJwtSecret();
  if (!secret) return false;

  try {
    const { payload } = await jwtVerify(token, secret);
    return Boolean(payload && payload.email);
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;

  // 1. API Admin routes protection
  if (pathname.startsWith("/api/admin")) {
    if (pathname === "/api/admin/login" || pathname === "/api/admin/logout") {
      return NextResponse.next();
    }

    const valid = await isTokenValid(token);
    if (!valid) {
      return NextResponse.json(
        { success: false, error: "Ruxsat berilmagan (401 Unauthorized)." },
        { status: 401 }
      );
    }
    return NextResponse.next();
  }

  // 2. Admin Page routes protection
  if (pathname.startsWith("/admin")) {
    const valid = await isTokenValid(token);

    // If visiting login page while already authenticated, redirect to dashboard
    if (pathname === "/admin/login") {
      if (valid) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
      return NextResponse.next();
    }

    // For all other admin pages, require authentication
    if (!valid) {
      const loginUrl = new URL("/admin/login", request.url);
      if (pathname !== "/admin") {
        loginUrl.searchParams.set("callbackUrl", pathname);
      }
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
