"use client";

import Link from "next/link";
import { useLiveContent } from "@/lib/useLiveContent";
import PageHero from "@/components/PageHero";
import FeatureCard from "@/components/FeatureCard";

export default function ServicesBody({ initialContent }) {
  const { services, site } = useLiveContent(initialContent);
  return (
    <>
      <PageHero
        kicker="Services"
        title="Craft and creative services, done properly"
        description="From alterations to full brand identities, our workshop handles the practical work behind looking and feeling professional."
      />
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid sm:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <FeatureCard key={s.id} icon={s.icon} title={s.title} description={s.description} index={i + 1} />
          ))}
        </div>
        <div className="mt-12 rounded-2xl bg-plum text-cream p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl font-semibold">Need a service, not a course?</h2>
            <p className="mt-2 text-cream/70">Reach out with what you need and we'll quote you directly.</p>
          </div>
          <Link href="/contact" className="inline-flex items-center rounded-full bg-gold px-6 py-3 text-sm font-semibold text-plum-dark hover:bg-gold-light transition-colors focus-ring shrink-0">
            Contact us — {site.phone}
          </Link>
        </div>
      </section>
    </>
  );
}
