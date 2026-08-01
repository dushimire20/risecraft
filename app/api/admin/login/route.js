import { NextResponse } from "next/server";
import { createSessionToken, sessionCookieMaxAge, SESSION_COOKIE_NAME, timingSafeStringEqual } from "@/lib/auth";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const password = String(body?.password ?? "");
  const expected = process.env.ADMIN_PASSWORD ?? "";

  if (!expected || !timingSafeStringEqual(password, expected)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const token = await createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionCookieMaxAge,
  });
  return res;
}
