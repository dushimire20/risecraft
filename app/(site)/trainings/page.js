import { getContent } from "@/lib/content";
import TrainingsBody from "@/components/bodies/TrainingsBody";

export const metadata = { title: "Trainings & Certificates — FC Risecraft" };

export default async function TrainingsPage() {
  const content = await getContent();
  return <TrainingsBody initialContent={content} />;
}
