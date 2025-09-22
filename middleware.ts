import { NextResponse } from "next/server";
import { auth } from "./auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = !!req.auth;

  const protectedPaths = [/\/user/];

  if (!session && protectedPaths.some((p) => p.test(pathname))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const response = NextResponse.next();
  response.headers.set("x-pathname", pathname);

  return response;
});
