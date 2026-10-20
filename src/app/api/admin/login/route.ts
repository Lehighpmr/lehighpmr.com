import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  cookieOptions,
  createSessionToken,
  verifyPassword,
} from "@/lib/admin-auth";


export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    password?: string;
  } | null;
  const password = body?.password || "";
  if (!verifyPassword(password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, createSessionToken(), cookieOptions());
  return res;
}
