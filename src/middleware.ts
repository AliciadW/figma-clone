import { auth } from "./server/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  // Only the authentication check
  const isAuthenticated = !!req.auth;
  if (!isAuthenticated) {
    const newUrl = new URL("/signin", req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
