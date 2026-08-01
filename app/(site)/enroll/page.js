import { Suspense } from "react";
import { getContent } from "@/lib/content";
import PageHero from "@/components/PageHero";
import EnrollForm from "@/components/EnrollForm";

export const metadata = { title: "Enroll Now — FC Risecraft" };

export default async function EnrollPage() {
  const { trainings } = await getContent();
  return (
    <>
      <PageHero
        kicker="Enroll now"
        title="Sign up for a training"
        description="Fill in your details and choose the course you're interested in — our team will confirm your schedule and next steps."
      />
      <section className="mx-auto max-w-3xl px-5 py-16">
        <div className="rounded-2xl border border-plum/10 bg-white/60 p-6 md:p-8">
          <Suspense fallback={<div className="text-ink/60 text-sm">Loading form...</div>}>
            <EnrollForm trainings={trainings} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
