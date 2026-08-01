"use client";

import Link from "next/link";
import { useLiveContent } from "@/lib/useLiveContent";
import PageHero from "@/components/PageHero";
import FeatureCard from "@/components/FeatureCard";

export default function ProductsBody({ initialContent }) {
  const { products } = useLiveContent(initialContent);
  return (
    <>
      <PageHero
        kicker="Products"
        title="Made in Rwanda, made to order"
        description="Ready-made fashion lines and made-to-order uniforms and t-shirts, produced in our Kabuga-Kigali workshop."
      />
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
        <div className="mt-12 text-center">
          <p className="text-ink/70">Looking for bulk uniforms or custom branded t-shirts?</p>
          <Link
            href="/contact"
            className="mt-4 inline-flex items-center rounded-full bg-plum px-7 py-3.5 text-sm font-semibold text-cream hover:bg-plum-light transition-colors focus-ring"
          >
            Request a quote
          </Link>
        </div>
      </section>
    </>
  );
}
