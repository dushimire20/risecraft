import { NextResponse } from "next/server";
import { addSubmission } from "@/lib/submissions";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = String(body?.name ?? "").trim().slice(0, 200);
  const email = String(body?.email ?? "").trim().slice(0, 200);
  const phone = String(body?.phone ?? "").trim().slice(0, 60);
  const message = String(body?.message ?? "").trim().slice(0, 4000);

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  await addSubmission("contact", { name, email, phone, message });

  return NextResponse.json({ ok: true });
}
