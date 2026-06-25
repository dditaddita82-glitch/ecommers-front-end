import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Helper untuk decode JWT di Edge Runtime (aman & zero-dependency)
function decodeJwt(token: string): any {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
}

export function middleware(req: NextRequest) {
  // Ambil HttpOnly cookie yang diset oleh backend Express
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const { pathname } = req.nextUrl;

  // Jika tidak ada token (belum login)
  if (!refreshToken) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  try {
    // Decode token untuk mendapatkan role
    const decoded = decodeJwt(refreshToken);

    if (!decoded) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    // Proteksi route /admin hanya untuk role ADMIN
    if (pathname.startsWith("/admin") && decoded.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/customer/dashboard", req.url));
    }

  } catch (err) {
    // Jika token tidak valid / corrupt
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/customer/:path*",
  ],
};
