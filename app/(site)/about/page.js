import { getContent } from "@/lib/content";
import AboutBody from "@/components/bodies/AboutBody";

export const metadata = { title: "About Us — FC Risecraft" };

export default async function AboutPage() {
  const content = await getContent();
  return <AboutBody initialContent={content} />;
}
