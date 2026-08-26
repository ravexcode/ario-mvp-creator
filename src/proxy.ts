import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth";

const publicPaths = ["/api/auth/login", "/api/auth/register"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const token = request.cookies.get("ar0_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const response = NextResponse.next();
  response.headers.set("x-user-id", payload.userId);
  response.headers.set("x-user-email", payload.email);

  return response;
}

export const config = {
  matcher: ["/api/:path*"],
};
