"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SubmissionsTable({ type, rows, columns }) {
  const router = useRouter();
  const [pendingId, setPendingId] = useState(null);

  async function runAction(id, action) {
    if (action === "delete" && !confirm("Delete this submission?")) return;
    setPendingId(id);
    try {
      await fetch("/api/admin/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, id, action }),
      });
      router.refresh();
    } finally {
      setPendingId(null);
    }
  }

  if (rows.length === 0) {
    return <p className="mt-3 text-sm text-ink/60">No submissions yet.</p>;
  }

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="text-left">
            {columns.map((c) => (
              <th key={c.field} className="border-b border-plum/10 px-2 py-2 font-semibold text-plum">
                {c.label}
              </th>
            ))}
            <th className="border-b border-plum/10 px-2 py-2 font-semibold text-plum">Received</th>
            <th className="border-b border-plum/10 px-2 py-2 font-semibold text-plum">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className={!r.read ? "bg-gold/10 font-medium" : ""}>
              {columns.map((c) => (
                <td key={c.field} className="border-b border-plum/10 px-2 py-2 align-top whitespace-pre-wrap">
                  {r[c.field] || ""}
                </td>
              ))}
              <td className="border-b border-plum/10 px-2 py-2 align-top text-ink/60">{r.receivedAt}</td>
              <td className="border-b border-plum/10 px-2 py-2 align-top whitespace-nowrap">
                {!r.read && (
                  <button
                    onClick={() => runAction(r.id, "markRead")}
                    disabled={pendingId === r.id}
                    className="mr-2 rounded-full border border-plum/30 px-3 py-1 text-xs font-semibold text-plum hover:bg-plum/5 disabled:opacity-60"
                  >
                    Mark read
                  </button>
                )}
                <button
                  onClick={() => runAction(r.id, "delete")}
                  disabled={pendingId === r.id}
                  className="rounded-full bg-thread px-3 py-1 text-xs font-semibold text-cream hover:bg-thread/90 disabled:opacity-60"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
