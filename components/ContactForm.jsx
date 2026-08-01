"use client";

import { useState } from "react";

const initial = { name: "", email: "", phone: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
      setForm(initial);
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-gold/50 bg-gold/10 p-8 text-center">
        <h3 className="font-display text-xl font-semibold text-plum">Message sent</h3>
        <p className="mt-2 text-ink/70">
          Thanks for reaching out — our team will get back to you shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-semibold text-plum underline decoration-gold decoration-2 underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Full name" required>
          <input
            required
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="fc-input"
            placeholder="Uwase Aline"
          />
        </Field>
        <Field label="Phone number">
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="fc-input"
            placeholder="07XX XXX XXX"
          />
        </Field>
      </div>
      <Field label="Email address" required>
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className="fc-input"
          placeholder="you@example.com"
        />
      </Field>
      <Field label="Message" required>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className="fc-input resize-none"
          placeholder="Tell us what you need..."
        />
      </Field>

      {status === "error" && (
        <p className="text-sm text-thread font-medium">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center rounded-full bg-plum px-7 py-3.5 text-sm font-semibold text-cream hover:bg-plum-light transition-colors disabled:opacity-60 focus-ring"
      >
        {status === "sending" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-plum">
        {label} {required && <span className="text-thread">*</span>}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
