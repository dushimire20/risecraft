import fs from "fs";
import path from "path";

// On Vercel, the filesystem is read-only/ephemeral, so JSON "files" live in
// Vercel Blob instead. Locally (no BLOB_READ_WRITE_TOKEN), we fall back to
// real files under data/ so `npm run dev` needs no external service.
const useBlob = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

const DATA_DIR = path.join(process.cwd(), "data");

function localPath(key) {
  return path.join(DATA_DIR, key);
}

export async function readJson(key, fallback) {
  if (useBlob) {
    const { list } = await import("@vercel/blob");
    const { blobs } = await list({ prefix: key, limit: 10 });
    const match = blobs.find((b) => b.pathname === key);
    if (!match) return fallback;
    // Bust Vercel's edge cache for this blob URL (default cacheControlMaxAge
    // is one month) so a read right after a write sees the latest content.
    const res = await fetch(`${match.url}?t=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) return fallback;
    return res.json();
  }

  try {
    const raw = fs.readFileSync(localPath(key), "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === "ENOENT") return fallback;
    throw err;
  }
}

export async function writeJson(key, value) {
  const body = JSON.stringify(value, null, 2);

  if (useBlob) {
    const { put } = await import("@vercel/blob");
    await put(key, body, {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 60, // minimum allowed; these files change on every save
    });
    return value;
  }

  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(localPath(key), body, "utf-8");
  return value;
}

export async function writeFile(key, fileBuffer, contentType) {
  if (useBlob) {
    const { put } = await import("@vercel/blob");
    const blob = await put(key, fileBuffer, {
      access: "public",
      contentType,
      addRandomSuffix: true,
    });
    return blob.url;
  }

  const dir = path.join(process.cwd(), "public", "uploads");
  fs.mkdirSync(dir, { recursive: true });
  const filename = `${Date.now()}-${Math.random().toString(16).slice(2)}-${key.split("/").pop()}`;
  fs.writeFileSync(path.join(dir, filename), fileBuffer);
  return `/uploads/${filename}`;
}
