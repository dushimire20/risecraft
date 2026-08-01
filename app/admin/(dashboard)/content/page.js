import { getContent } from "@/lib/content";
import ContentEditor from "@/components/admin/ContentEditor";

export default async function AdminContentPage() {
  const content = await getContent();
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-plum">Edit site content</h1>
      <ContentEditor initialContent={content} />
    </div>
  );
}
