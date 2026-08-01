"use client";

import Link from "next/link";
import { useLiveContent } from "@/lib/useLiveContent";
import PageHero from "@/components/PageHero";
import Icon from "@/components/Icon";

export default function TrainingsBody({ initialContent }) {
  const { trainings } = useLiveContent(initialContent);
  return (
    <>
      <PageHero
        kicker="Trainings & certificates"
        title="Learn a skill you can actually use"
        description="Enroll in Fashion & Design, Branding Skills, or Business English — Corporate Training and Entrepreneurial Skills come included as add-ons with any of those courses."
      />
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="space-y-5">
          {trainings.map((t, i) => {
            const isStandalone = t.standalone !== false;
            return (
              <div
                key={t.id}
                className="rounded-2xl border border-plum/10 bg-white/60 p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 hover:border-gold/60 transition-colors"
              >
                <div className="flex items-center gap-4 md:w-72 shrink-0">
                  <span className="font-mono text-xs tracking-widest text-gold-dark">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-plum text-gold shrink-0">
                    <Icon name={t.icon} className="w-5.5 h-5.5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-plum">{t.title}</h3>
                </div>
                <p className="text-sm text-ink/70 leading-relaxed flex-1">{t.description}</p>
                {isStandalone ? (
                  <Link
                    href={`/enroll?course=${encodeURIComponent(t.title)}`}
                    className="shrink-0 inline-flex items-center justify-center rounded-full border border-plum/30 px-5 py-2.5 text-sm font-semibold text-plum hover:bg-plum hover:text-cream transition-colors focus-ring"
                  >
                    Enroll in this course
                  </Link>
                ) : (
                  <span className="shrink-0 inline-flex items-center justify-center rounded-full bg-paper px-5 py-2.5 text-sm font-semibold text-ink/60">
                    Included add-on
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
