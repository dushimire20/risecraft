"use client";

import { useLiveContent } from "@/lib/useLiveContent";
import PageHero from "@/components/PageHero";
import Icon from "@/components/Icon";
import HeroIllustration from "@/components/HeroIllustration";

export default function AboutBody({ initialContent }) {
  const { site, whyChooseUs } = useLiveContent(initialContent);
  return (
    <>
      <PageHero
        kicker="About us"
        title="A workshop, a classroom, and a launchpad"
        description={site.description}
      />

      <section className="mx-auto max-w-6xl px-5 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-plum">Our story</h2>
          <p className="mt-4 text-ink/75 leading-relaxed">
            FC Risecraft Rwanda Limited was built on a simple belief: a practical skill,
            taught well, changes a life. Based in Kabuga-Kigali, we bring together a
            working tailoring and branding studio with a training floor, so learners
            practice on real work, not just theory.
          </p>
          <p className="mt-4 text-ink/75 leading-relaxed">
            From pattern-making and garment construction to logo design, business
            English and entrepreneurship, every course is built to end in one place:
            a certificate and a skill you can earn from.
          </p>
        </div>
        <HeroIllustration />
      </section>

      <section className="bg-paper border-y border-plum/10">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-plum text-center">
            Why learners choose us
          </h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {whyChooseUs.map((w) => (
              <div key={w.id} className="text-center rounded-2xl border border-plum/10 bg-white/70 p-6">
                <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-plum text-gold">
                  <Icon name={w.icon} className="w-5.5 h-5.5" />
                </div>
                <p className="mt-4 text-sm font-semibold text-plum leading-snug">{w.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-2xl bg-plum text-cream p-8 md:p-10 grid md:grid-cols-3 gap-6 text-center">
          <div>
            <Icon name="pin" className="w-6 h-6 text-gold mx-auto" />
            <p className="mt-3 font-semibold">{site.location}</p>
          </div>
          <div>
            <Icon name="phone" className="w-6 h-6 text-gold mx-auto" />
            <p className="mt-3 font-semibold">{site.phone}</p>
          </div>
          <div>
            <Icon name="mail" className="w-6 h-6 text-gold mx-auto" />
            <p className="mt-3 font-semibold">{site.email}</p>
          </div>
        </div>
      </section>
    </>
  );
}
