"use client";

import Link from "next/link";
import { useLiveContent } from "@/lib/useLiveContent";
import FeatureCard from "@/components/FeatureCard";
import SectionLabel from "@/components/SectionLabel";
import HeroShowcase from "@/components/HeroShowcase";
import Icon from "@/components/Icon";

export default function HomeBody({ initialContent }) {
  const { site, services, products, trainings, whyChooseUs } = useLiveContent(initialContent);

  return (
    <>
      {/* HERO */}
      <section className="pattern-paper border-b border-plum/10">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionLabel>{site.heroKicker}</SectionLabel>
            <h1 className="mt-5 font-display font-black leading-[0.95] text-plum">
              <span className="block text-6xl md:text-7xl">{site.tagline}</span>
              <span className="block text-3xl md:text-4xl text-gold-dark italic mt-2">
                {site.subTagline}
              </span>
            </h1>
            <p className="mt-6 text-lg text-ink/75 max-w-lg leading-relaxed">
              {site.heroSub}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/enroll"
                className="inline-flex items-center rounded-full bg-plum px-7 py-3.5 text-sm font-semibold text-cream hover:bg-plum-light transition-colors focus-ring"
              >
                Enroll in a training
              </Link>
              <Link
                href="/trainings"
                className="inline-flex items-center rounded-full border border-plum/30 px-7 py-3.5 text-sm font-semibold text-plum hover:border-plum transition-colors focus-ring"
              >
                See our trainings
              </Link>
            </div>
            <div className="mt-10 tape-rule-lg max-w-sm" />
          </div>
          <div className="">
            <HeroShowcase
              items={[
                { src: "/products/1.jpeg", label: "Made in Rwanda" },
                { src: "/products/2.jpeg", label: "Tailoring" },
                { src: "/products/3.jpeg", label: "School Uniforms" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* SERVICES & PRODUCTS PREVIEW */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <SectionLabel>Our services & products</SectionLabel>
        <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold text-plum">
          What we make and offer
        </h2>
        <div className="mt-10 grid sm:grid-cols-2 gap-5">
          {services.map((s, i) => (
            <FeatureCard
              key={s.id}
              icon={s.icon}
              title={s.title}
              description={s.description}
              index={i + 1}
            />
          ))}
        </div>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p) => (
            <FeatureCard
              key={p.id}
              icon={p.icon}
              title={p.title}
              description={p.description}
              href={`/products/${p.slug || p.id}`}
            />
          ))}
        </div>
        <div className="mt-8 flex gap-4 flex-wrap">
          <Link
            href="/services"
            className="text-sm font-semibold text-plum underline decoration-gold decoration-2 underline-offset-4 hover:text-plum-light"
          >
            Explore services →
          </Link>
          <Link
            href="/products"
            className="text-sm font-semibold text-plum underline decoration-gold decoration-2 underline-offset-4 hover:text-plum-light"
          >
            Browse products →
          </Link>
        </div>
      </section>

      {/* TRAININGS PREVIEW */}
      <section className="bg-plum text-cream">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <SectionLabel dark>Our trainings & certificates</SectionLabel>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold">
            Practical courses that lead to income
          </h2>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {trainings.map((t, i) => (
              <div
                key={t.id}
                className="rounded-2xl border border-cream/15 bg-cream/5 p-6 hover:bg-cream/10 transition-colors"
              >
                <span className="font-mono text-xs tracking-widest text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="mt-3 flex items-center justify-center w-11 h-11 rounded-full bg-gold text-plum">
                  <Icon name={t.icon} className="w-5 h-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">
                  {t.title}
                </h3>
                <p className="mt-2 text-sm text-cream/70 leading-relaxed">
                  {t.description}
                </p>
              </div>
            ))}
          </div>
          <Link
            href="/trainings"
            className="mt-10 inline-flex items-center rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-plum-dark hover:bg-gold-light transition-colors focus-ring"
          >
            View all trainings
          </Link>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <SectionLabel>Why choose us</SectionLabel>
        <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold text-plum">
          Built for real skills and real opportunity
        </h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {whyChooseUs.map((w) => (
            <div
              key={w.id}
              className="text-center rounded-2xl border border-plum/10 bg-paper/60 p-6"
            >
              <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-plum text-gold">
                <Icon name={w.icon} className="w-5.5 h-5.5" />
              </div>
              <p className="mt-4 text-sm font-semibold text-plum leading-snug">
                {w.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="border-t border-plum/10 bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-plum">
              Ready to learn a skill you can earn from?
            </h2>
            <p className="mt-2 text-ink/70">
              Talk to us or enroll in a training today.
            </p>
          </div>
          <div className="flex gap-4 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full border border-plum/30 px-6 py-3 text-sm font-semibold text-plum hover:border-plum transition-colors focus-ring"
            >
              Contact us
            </Link>
            <Link
              href="/enroll"
              className="inline-flex items-center rounded-full bg-gold px-6 py-3 text-sm font-semibold text-cream hover:bg-thread/90 transition-colors focus-ring"
            >
              Enroll now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
