import { getContent } from "@/lib/content";
import ContactBody from "@/components/bodies/ContactBody";

export const metadata = { title: "Contact — FC Risecraft" };

export default async function ContactPage() {
  const content = await getContent();
  return <ContactBody initialContent={content} />;
}
