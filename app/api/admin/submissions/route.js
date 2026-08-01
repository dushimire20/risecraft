import { NextResponse } from "next/server";
import { deleteSubmission, getSubmissions, markSubmissionRead } from "@/lib/submissions";

export async function GET() {
  const submissions = await getSubmissions();
  return NextResponse.json(submissions);
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { type, id, action } = body ?? {};
  if (!["contact", "enrollment"].includes(type) || !id) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (action === "markRead") {
    await markSubmissionRead(type, id);
  } else if (action === "delete") {
    await deleteSubmission(type, id);
  } else {
    return NextResponse.json({ error: "Unknown action." }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
