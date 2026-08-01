import { getContent } from "@/lib/content";
import ServicesBody from "@/components/bodies/ServicesBody";

export const metadata = { title: "Services — FC Risecraft" };

export default async function ServicesPage() {
  const content = await getContent();
  return <ServicesBody initialContent={content} />;
}
