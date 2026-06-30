import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE } from "@/lib/auth";

export async function POST(req: Request) {
  cookies().delete(ADMIN_COOKIE);
  return NextResponse.redirect(new URL("/login", req.url));
}
