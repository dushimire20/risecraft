import { NextResponse } from "next/server";
import { writeFile } from "@/lib/blobStore";

const ALLOWED_TYPES = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
const MAX_SIZE = 5 * 1024 * 1024;

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof Blob) || file.size === 0) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File is too large (max 5MB)." }, { status: 400 });
  }
  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    return NextResponse.json({ error: "Only JPEG, PNG or WebP images are allowed." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  let url;
  try {
    url = await writeFile(`products/upload.${ext}`, buffer, file.type);
  } catch (err) {
    console.error("image upload failed:", err);
    return NextResponse.json(
      { error: "Could not upload image. Check that a Blob store is attached to this Vercel project." },
      { status: 500 }
    );
  }

  return NextResponse.json({ url });
}
