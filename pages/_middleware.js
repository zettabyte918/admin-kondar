import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

async function middleware(req, ev) {
  const session = await getToken({ req, secret: process.env.SECRET });
  const { pathname } = req.nextUrl;

  if (session || pathname.includes("/api/auth")) return NextResponse.next();
  if (!session && pathname !== "/auth/signin")
    return NextResponse.redirect("/auth/signin");
  return NextResponse.next();
}

export default middleware;
