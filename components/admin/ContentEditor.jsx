"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ALLOWED_ICONS } from "@/lib/icons";

let uidCounter = 0;
function uid() {
  uidCounter += 1;
  return `row-${uidCounter}-${Date.now()}`;
}

function withKeys(rows) {
  return (rows || []).map((r) => ({ ...r, _key: uid() }));
}

export default function ContentEditor({ initialContent }) {
  const router = useRouter();
  const [site, setSite] = useState(initialContent.site || {});
  const [services, setServices] = useState(() => withKeys(initialContent.services));
  const [products, setProducts] = useState(() => withKeys(initialContent.products));
  const [trainings, setTrainings] = useState(() => withKeys(initialContent.trainings));
  const [whyChooseUs, setWhyChooseUs] = useState(() => withKeys(initialContent.whyChooseUs));
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  function updateSite(field, value) {
    setSite((s) => ({ ...s, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("saving");
    setError("");
    try {
      const payload = {
        site,
        services: services.map(stripKey),
        products: products.map(stripKey),
        trainings: trainings.map(stripKey),
        whyChooseUs: whyChooseUs.map(stripKey),
      };
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not save.");
      setStatus("saved");
      router.refresh();
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
      {status === "saved" && (
        <p className="rounded-lg border border-gold/50 bg-gold/10 px-4 py-2 text-sm text-plum">
          Saved. The live site now reflects these changes.
        </p>
      )}
      {error && (
        <p className="rounded-lg border border-thread/40 bg-thread/10 px-4 py-2 text-sm text-thread">{error}</p>
      )}

      <Card title="Site info">
        <Field label="Name">
          <input className="fc-input" value={site.name || ""} onChange={(e) => updateSite("name", e.target.value)} required />
        </Field>
        <Field label="Short name">
          <input className="fc-input" value={site.shortName || ""} onChange={(e) => updateSite("shortName", e.target.value)} />
        </Field>
        <Field label="Tagline">
          <input className="fc-input" value={site.tagline || ""} onChange={(e) => updateSite("tagline", e.target.value)} />
        </Field>
        <Field label="Sub-tagline">
          <input className="fc-input" value={site.subTagline || ""} onChange={(e) => updateSite("subTagline", e.target.value)} />
        </Field>
        <Field label="Description">
          <textarea className="fc-input" rows={3} value={site.description || ""} onChange={(e) => updateSite("description", e.target.value)} />
        </Field>
        <Field label="Phone">
          <input className="fc-input" value={site.phone || ""} onChange={(e) => updateSite("phone", e.target.value)} />
        </Field>
        <Field label="Email">
          <input type="email" className="fc-input" value={site.email || ""} onChange={(e) => updateSite("email", e.target.value)} />
        </Field>
        <Field label="Location">
          <input className="fc-input" value={site.location || ""} onChange={(e) => updateSite("location", e.target.value)} />
        </Field>
        <Field label="Hero kicker">
          <input className="fc-input" value={site.heroKicker || ""} onChange={(e) => updateSite("heroKicker", e.target.value)} />
        </Field>
        <Field label="Hero headline">
          <input className="fc-input" value={site.heroHeadline || ""} onChange={(e) => updateSite("heroHeadline", e.target.value)} />
        </Field>
        <Field label="Hero sub-text">
          <textarea className="fc-input" rows={2} value={site.heroSub || ""} onChange={(e) => updateSite("heroSub", e.target.value)} />
        </Field>
      </Card>

      <Card title="Services">
        {services.map((row, i) => (
          <RowItem key={row._key} onRemove={() => setServices((rows) => rows.filter((_, idx) => idx !== i))}>
            <IconField value={row.icon} onChange={(v) => updateRow(setServices, i, "icon", v)} />
            <Field label="Title">
              <input className="fc-input" value={row.title || ""} onChange={(e) => updateRow(setServices, i, "title", e.target.value)} />
            </Field>
            <Field label="Description">
              <textarea className="fc-input" rows={2} value={row.description || ""} onChange={(e) => updateRow(setServices, i, "description", e.target.value)} />
            </Field>
          </RowItem>
        ))}
        <AddButton onClick={() => setServices((rows) => [...rows, { _key: uid(), icon: "check", title: "", description: "" }])}>
          Add service
        </AddButton>
      </Card>

      <Card title="Products">
        {products.map((row, i) => (
          <RowItem key={row._key} onRemove={() => setProducts((rows) => rows.filter((_, idx) => idx !== i))}>
            <IconField value={row.icon} onChange={(v) => updateRow(setProducts, i, "icon", v)} />
            <Field label="Title">
              <input className="fc-input" value={row.title || ""} onChange={(e) => updateRow(setProducts, i, "title", e.target.value)} />
            </Field>
            <Field label="Slug (used in the product's URL, leave blank to derive from title)">
              <input className="fc-input" value={row.slug || ""} onChange={(e) => updateRow(setProducts, i, "slug", e.target.value)} />
            </Field>
            <Field label="Description">
              <textarea className="fc-input" rows={2} value={row.description || ""} onChange={(e) => updateRow(setProducts, i, "description", e.target.value)} />
            </Field>
            <Field label="Photos (one path/URL per line)">
              <textarea
                className="fc-input"
                rows={3}
                value={(row.images || []).join("\n")}
                onChange={(e) => updateRow(setProducts, i, "images", e.target.value.split("\n"))}
              />
            </Field>
            <ImageUploadField
              onUploaded={(url) => updateRow(setProducts, i, "images", [...(row.images || []), url])}
            />
          </RowItem>
        ))}
        <AddButton onClick={() => setProducts((rows) => [...rows, { _key: uid(), icon: "check", title: "", slug: "", description: "", images: [] }])}>
          Add product
        </AddButton>
        <p className="mt-3 text-xs text-ink/60">
          Note: a brand-new product needs a site rebuild to get its own clean URL. Existing products&apos; text and photos update live.
        </p>
      </Card>

      <Card title="Trainings">
        {trainings.map((row, i) => (
          <RowItem key={row._key} onRemove={() => setTrainings((rows) => rows.filter((_, idx) => idx !== i))}>
            <IconField value={row.icon} onChange={(v) => updateRow(setTrainings, i, "icon", v)} />
            <Field label="Title">
              <input className="fc-input" value={row.title || ""} onChange={(e) => updateRow(setTrainings, i, "title", e.target.value)} />
            </Field>
            <Field label="Description">
              <textarea className="fc-input" rows={2} value={row.description || ""} onChange={(e) => updateRow(setTrainings, i, "description", e.target.value)} />
            </Field>
            <label className="mt-3 flex items-center gap-2 text-sm text-plum">
              <input
                type="checkbox"
                checked={row.standalone !== false}
                onChange={(e) => updateRow(setTrainings, i, "standalone", e.target.checked)}
              />
              Can be enrolled in on its own
            </label>
            <p className="mt-1 text-xs text-ink/60">
              Unchecked = it&apos;s an add-on included with any standalone course, not enrolled separately.
            </p>
          </RowItem>
        ))}
        <AddButton onClick={() => setTrainings((rows) => [...rows, { _key: uid(), icon: "check", title: "", description: "", standalone: true }])}>
          Add training
        </AddButton>
      </Card>

      <Card title="Why choose us">
        {whyChooseUs.map((row, i) => (
          <RowItem key={row._key} onRemove={() => setWhyChooseUs((rows) => rows.filter((_, idx) => idx !== i))}>
            <IconField value={row.icon} onChange={(v) => updateRow(setWhyChooseUs, i, "icon", v)} />
            <Field label="Title">
              <input className="fc-input" value={row.title || ""} onChange={(e) => updateRow(setWhyChooseUs, i, "title", e.target.value)} />
            </Field>
          </RowItem>
        ))}
        <AddButton onClick={() => setWhyChooseUs((rows) => [...rows, { _key: uid(), icon: "check", title: "" }])}>
          Add item
        </AddButton>
      </Card>

      <div className="rounded-2xl border border-plum/10 bg-white/80 p-6 md:p-8">
        <button
          type="submit"
          disabled={status === "saving"}
          className="rounded-full bg-plum px-7 py-3 text-sm font-semibold text-cream hover:bg-plum-light transition-colors disabled:opacity-60"
        >
          {status === "saving" ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}

function updateRow(setter, index, field, value) {
  setter((rows) => rows.map((r, i) => (i === index ? { ...r, [field]: value } : r)));
}

function stripKey({ _key, ...rest }) {
  return rest;
}

function Card({ title, children }) {
  return (
    <div className="rounded-2xl border border-plum/10 bg-white/80 p-6 md:p-8">
      <h2 className="font-display text-lg font-semibold text-plum">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}

function RowItem({ children, onRemove }) {
  return (
    <div className="relative space-y-3 rounded-xl border border-plum/15 p-4">
      <button
        type="button"
        onClick={onRemove}
        className="absolute right-3 top-3 rounded-full border border-plum/30 px-3 py-1 text-xs font-semibold text-plum hover:bg-plum/5"
      >
        Remove
      </button>
      {children}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-plum">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function IconField({ value, onChange }) {
  return (
    <Field label="Icon">
      <select className="fc-input" value={value || "check"} onChange={(e) => onChange(e.target.value)}>
        {ALLOWED_ICONS.map((icon) => (
          <option key={icon} value={icon}>
            {icon}
          </option>
        ))}
      </select>
    </Field>
  );
}

function AddButton({ onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-plum/30 px-5 py-2 text-sm font-semibold text-plum hover:bg-plum/5"
    >
      {children}
    </button>
  );
}

function ImageUploadField({ onUploaded }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed.");
      onUploaded(data.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <Field label="Upload a new photo (adds to the list above)">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleChange}
        disabled={uploading}
        className="text-sm"
      />
      {uploading && <p className="mt-1 text-xs text-ink/60">Uploading...</p>}
      {error && <p className="mt-1 text-xs text-thread">{error}</p>}
    </Field>
  );
}
