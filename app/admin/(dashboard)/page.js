import Link from "next/link";
import { getSubmissions } from "@/lib/submissions";

export default async function AdminDashboardPage() {
  const submissions = await getSubmissions();
  const unreadCount =
    submissions.contact.filter((r) => !r.read).length +
    submissions.enrollment.filter((r) => !r.read).length;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-plum/10 bg-white/80 p-6 md:p-8">
        <h2 className="font-display text-lg font-semibold text-plum">Site content</h2>
        <p className="mt-2 text-sm text-ink/70">
          Edit site info, services, products, trainings and "why choose us" items — no code required.
        </p>
        <Link
          href="/admin/content"
          className="mt-4 inline-flex items-center rounded-full bg-plum px-6 py-2.5 text-sm font-semibold text-cream hover:bg-plum-light transition-colors"
        >
          Edit content
        </Link>
      </div>
      <div className="rounded-2xl border border-plum/10 bg-white/80 p-6 md:p-8">
        <h2 className="font-display text-lg font-semibold text-plum">
          Submissions {unreadCount > 0 && <span className="text-sm font-normal text-ink/60">({unreadCount} unread)</span>}
        </h2>
        <p className="mt-2 text-sm text-ink/70">Messages from the contact and enroll forms.</p>
        <Link
          href="/admin/submissions"
          className="mt-4 inline-flex items-center rounded-full bg-plum px-6 py-2.5 text-sm font-semibold text-cream hover:bg-plum-light transition-colors"
        >
          View submissions
        </Link>
      </div>
    </div>
  );
}
