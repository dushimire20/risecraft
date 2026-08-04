import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getContent, saveContent } from "@/lib/content";
import { ALLOWED_ICONS } from "@/lib/icons";

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const site = body?.site ?? {};
  const newContent = {
    site: {
      name: String(site.name ?? "").trim(),
      shortName: String(site.shortName ?? "").trim(),
      tagline: String(site.tagline ?? "").trim(),
      subTagline: String(site.subTagline ?? "").trim(),
      description: String(site.description ?? "").trim(),
      phone: String(site.phone ?? "").trim(),
      email: String(site.email ?? "").trim(),
      location: String(site.location ?? "").trim(),
      heroKicker: String(site.heroKicker ?? "").trim(),
      heroHeadline: String(site.heroHeadline ?? "").trim(),
      heroSub: String(site.heroSub ?? "").trim(),
    },
    services: normalizeRows(body?.services, "svc", { description: true }),
    products: normalizeProducts(body?.products),
    trainings: normalizeRows(body?.trainings, "trn", { description: true, standalone: true }),
    whyChooseUs: normalizeRows(body?.whyChooseUs, "why", {}),
  };

  if (!newContent.site.name) {
    return NextResponse.json({ error: "Site name is required." }, { status: 400 });
  }

  try {
    await saveContent(newContent);
  } catch (err) {
    console.error("content save failed:", err);
    return NextResponse.json(
      { error: "Could not save content. Check that a Blob store is attached to this Vercel project." },
      { status: 500 }
    );
  }

  // Pages are statically cached; without this, saved edits wouldn't show up
  // on the live site until the next deploy.
  revalidatePath("/", "layout");

  return NextResponse.json({ ok: true, content: newContent });
}

function randomId(prefix) {
  return `${prefix}-${Math.random().toString(16).slice(2, 10)}`;
}

function normalizeIcon(icon) {
  return ALLOWED_ICONS.includes(icon) ? icon : "check";
}

function normalizeRows(rows, prefix, opts) {
  if (!Array.isArray(rows)) return [];
  const out = [];
  for (const row of rows) {
    const title = String(row?.title ?? "").trim();
    if (!title) continue;
    const entry = {
      id: String(row?.id ?? "").trim() || randomId(prefix),
      icon: normalizeIcon(row?.icon),
      title,
    };
    if (opts.description) entry.description = String(row?.description ?? "").trim();
    if (opts.standalone) entry.standalone = Boolean(row?.standalone);
    out.push(entry);
  }
  return out;
}

function normalizeProducts(rows) {
  if (!Array.isArray(rows)) return [];
  const out = [];
  for (const row of rows) {
    const title = String(row?.title ?? "").trim();
    if (!title) continue;
    const slugSource = String(row?.slug ?? "").trim() || title;
    out.push({
      id: String(row?.id ?? "").trim() || randomId("prd"),
      slug: slugify(slugSource),
      icon: normalizeIcon(row?.icon),
      title,
      description: String(row?.description ?? "").trim(),
      images: Array.isArray(row?.images) ? row.images.map((i) => String(i).trim()).filter(Boolean) : [],
    });
  }
  return out;
}

function slugify(text) {
  const slug = String(text).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return slug || `item-${Math.random().toString(16).slice(2, 8)}`;
}
