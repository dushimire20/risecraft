import { getSubmissions } from "@/lib/submissions";
import SubmissionsTable from "@/components/admin/SubmissionsTable";

export default async function AdminSubmissionsPage() {
  const submissions = await getSubmissions();

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-plum/10 bg-white/80 p-6 md:p-8">
        <h2 className="font-display text-lg font-semibold text-plum">Contact messages</h2>
        <SubmissionsTable
          type="contact"
          rows={submissions.contact}
          columns={[
            { field: "name", label: "Name" },
            { field: "email", label: "Email" },
            { field: "phone", label: "Phone" },
            { field: "message", label: "Message" },
          ]}
        />
      </div>
      <div className="rounded-2xl border border-plum/10 bg-white/80 p-6 md:p-8">
        <h2 className="font-display text-lg font-semibold text-plum">Enrollments</h2>
        <SubmissionsTable
          type="enrollment"
          rows={submissions.enrollment}
          columns={[
            { field: "name", label: "Name" },
            { field: "phone", label: "Phone" },
            { field: "email", label: "Email" },
            { field: "course", label: "Course" },
            { field: "message", label: "Message" },
          ]}
        />
      </div>
    </div>
  );
}
