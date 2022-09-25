import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

async function middleware(req, ev) {
  const session = await getToken({ req, secret: process.env.SECRET });
  const { pathname } = req.nextUrl;

  if (session && pathname === "/auth/signin") return NextResponse.redirect("/");

  // if (!session && pathname !== "/auth/signin")
  //   return NextResponse.redirect("/auth/signin");
}

export default middleware;
