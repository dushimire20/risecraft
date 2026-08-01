// Signed, stateless admin session cookie (HMAC-SHA256 via Web Crypto).
// Uses only Web APIs (no `node:crypto`, no Buffer) so it works in both the
// Node.js route handlers and the Edge middleware runtime.

export const SESSION_COOKIE_NAME = "fc_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 hours

const encoder = new TextEncoder();

function requireSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET env var is not set.");
  return secret;
}

function bytesToBase64Url(bytes) {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmacSign(payload, secret) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return bytesToBase64Url(new Uint8Array(sig));
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

export async function createSessionToken() {
  const secret = requireSecret();
  const exp = Date.now() + SESSION_TTL_SECONDS * 1000;
  const payload = `authed.${exp}`;
  const sig = await hmacSign(payload, secret);
  return `${payload}.${sig}`;
}

export async function verifySessionToken(token) {
  if (!token) return false;
  let secret;
  try {
    secret = requireSecret();
  } catch {
    return false;
  }

  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [tag, expStr, sig] = parts;
  if (tag !== "authed") return false;

  const exp = Number(expStr);
  if (!Number.isFinite(exp) || Date.now() > exp) return false;

  const expectedSig = await hmacSign(`${tag}.${expStr}`, secret);
  return timingSafeEqual(sig, expectedSig);
}

export function timingSafeStringEqual(a, b) {
  return timingSafeEqual(String(a), String(b));
}

export const sessionCookieMaxAge = SESSION_TTL_SECONDS;
