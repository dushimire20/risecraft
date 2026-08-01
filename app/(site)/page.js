import { getContent } from "@/lib/content";
import HomeBody from "@/components/bodies/HomeBody";

export default async function HomePage() {
  const content = await getContent();
  return <HomeBody initialContent={content} />;
}
