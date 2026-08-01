"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed.");
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-paper px-5">
      <div className="w-full max-w-sm rounded-2xl border border-plum/10 bg-white/80 p-8">
        <h1 className="font-display text-xl font-semibold text-plum">FC Risecraft Admin</h1>
        {error && (
          <p className="mt-4 rounded-lg border border-thread/40 bg-thread/10 px-4 py-2 text-sm text-thread">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-plum">Password</span>
            <input
              type="password"
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="fc-input mt-1.5"
            />
          </label>
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-full bg-plum px-6 py-3 text-sm font-semibold text-cream hover:bg-plum-light transition-colors disabled:opacity-60 focus-ring"
          >
            {status === "sending" ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </main>
  );
}
