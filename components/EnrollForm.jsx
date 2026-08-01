"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLiveContent } from "@/lib/useLiveContent";

const initial = {
  name: "",
  email: "",
  phone: "",
  course: "",
  message: "",
};

export default function EnrollForm({ trainings: initialTrainings }) {
  const { trainings } = useLiveContent({ trainings: initialTrainings });
  const enrollableTrainings = trainings.filter((t) => t.standalone !== false);
  const searchParams = useSearchParams();
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const preselected = searchParams.get("course");
    if (preselected && enrollableTrainings.some((t) => t.title === preselected)) {
      setForm((f) => ({ ...f, course: preselected }));
    }
  }, [searchParams, enrollableTrainings]);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/enroll", {
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
        <h3 className="font-display text-xl font-semibold text-plum">Enrollment received</h3>
        <p className="mt-2 text-ink/70">
          Thank you for signing up — our team will contact you with the schedule and next steps.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-semibold text-plum underline decoration-gold decoration-2 underline-offset-4"
        >
          Enroll in another course
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
            placeholder="Mugisha Eric"
          />
        </Field>
        <Field label="Phone number" required>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="fc-input"
            placeholder="07XX XXX XXX"
          />
        </Field>
      </div>
      <Field label="Email address">
        <input
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className="fc-input"
          placeholder="you@example.com"
        />
      </Field>
      <Field label="Course" required>
        <select
          required
          value={form.course}
          onChange={(e) => update("course", e.target.value)}
          className="fc-input"
        >
          <option value="" disabled>
            Select a training
          </option>
          {enrollableTrainings.map((t) => (
            <option key={t.id} value={t.title}>
              {t.title}
            </option>
          ))}
        </select>
      </Field>
      <p className="text-xs text-ink/60 -mt-2">
        Corporate Training and Entrepreneurial Skills are included as add-ons with any course above — no separate enrollment needed.
      </p>
      <Field label="Anything we should know?">
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className="fc-input resize-none"
          placeholder="Preferred schedule, prior experience, questions..."
        />
      </Field>

      {status === "error" && (
        <p className="text-sm text-thread font-medium">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center rounded-full bg-thread px-7 py-3.5 text-sm font-semibold text-cream hover:bg-thread/90 transition-colors disabled:opacity-60 focus-ring"
      >
        {status === "sending" ? "Submitting..." : "Submit enrollment"}
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
