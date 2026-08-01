import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";

export default function AdminDashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-paper">
      <header className="flex items-center justify-between bg-plum px-6 py-4 text-cream">
        <Link href="/admin" className="font-display font-semibold">
          FC Risecraft Admin
        </Link>
        <LogoutButton />
      </header>
      <main className="mx-auto max-w-4xl px-5 py-10">{children}</main>
    </div>
  );
}
