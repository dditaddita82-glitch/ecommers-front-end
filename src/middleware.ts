import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(req: NextRequest) {
  // Ambil HttpOnly cookie yang diset oleh backend Express
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const { pathname } = req.nextUrl;

  // Jika tidak ada token (belum login)
  if (!refreshToken) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  try {
    // Decode token untuk mendapatkan role (tanpa memverifikasi signature, karena verifikasi dilakukan di backend)
    const decoded: any = jwtDecode(refreshToken);

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
