import { NextResponse } from "next/server";
import { getContent } from "@/lib/content";

// Public, unauthenticated endpoint the live site polls at runtime so admin
// content edits show up without a redeploy.
export async function GET() {
  const content = await getContent();
  return NextResponse.json(content, { headers: { "Cache-Control": "no-store" } });
}
