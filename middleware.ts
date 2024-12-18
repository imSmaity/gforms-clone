import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  if (
    !url.pathname.startsWith("/forms") &&
    !url.pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(new URL("/forms", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
