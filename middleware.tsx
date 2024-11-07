import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuthToken } from "./libs/actions/tokenHandler";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/auth") {
    return NextResponse.next();
  }

  const isAuth = await getAuthToken();

  if (!isAuth) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/:path", "/gallery", "/partner", "/account"],
};
