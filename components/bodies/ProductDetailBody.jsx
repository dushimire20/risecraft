"use client";

import Link from "next/link";
import Image from "next/image";
import { useLiveContent } from "@/lib/useLiveContent";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import PageHero from "@/components/PageHero";
import Icon from "@/components/Icon";

function findProduct(products, slug) {
  return products.find((p) => (p.slug || p.id) === slug);
}

export default function ProductDetailBody({ initialContent, slug }) {
  const { site, products } = useLiveContent(initialContent);
  const product = findProduct(products, slug);

  if (!product) {
    return (
      <section className="mx-auto max-w-6xl px-5 py-16 text-center">
        <p className="text-ink/70">This product is no longer available.</p>
        <Link
          href="/products"
          className="mt-4 inline-flex text-sm font-semibold text-plum underline decoration-gold decoration-2 underline-offset-4"
        >
          ← Back to all products
        </Link>
      </section>
    );
  }

  const images = product.images || [];
  const whatsappLink = buildWhatsAppLink(
    site.phone,
    `Hi! I'm interested in your "${product.title}". Could you share more details and pricing?`
  );

  return (
    <>
      <PageHero kicker="Products" title={product.title} description={product.description} />
      <section className="mx-auto max-w-6xl px-5 py-16">
        <Link
          href="/products"
          className="text-sm font-semibold text-plum underline decoration-gold decoration-2 underline-offset-4 hover:text-plum-light"
        >
          ← Back to all products
        </Link>

        {images.length > 0 ? (
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((src, i) => (
              <div
                key={src + i}
                className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-plum/10 bg-white/60"
              >
                <Image
                  src={src}
                  alt={`${product.title} — photo ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-plum/10 bg-paper/60 p-10 text-center">
            <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-plum text-gold">
              <Icon name={product.icon} className="w-5.5 h-5.5" />
            </div>
            <p className="mt-4 text-ink/70">
              Photos for this category are coming soon. Message us on WhatsApp and we&apos;ll send samples directly.
            </p>
          </div>
        )}

        <div className="mt-12 rounded-2xl border border-plum/10 bg-white/60 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-xl font-semibold text-plum">
              Interested in {product.title}?
            </h2>
            <p className="mt-1 text-sm text-ink/70">
              Chat with us on WhatsApp for pricing, sizes, and bulk orders.
            </p>
          </div>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold text-white hover:brightness-95 transition-all focus-ring"
          >
            <WhatsAppGlyph className="w-5 h-5" />
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}

function WhatsAppGlyph({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.4-1.42a9.87 9.87 0 0 0 4.64 1.18h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.02c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.12.11-1.8-.11-.42-.13-.95-.3-1.63-.6-2.87-1.24-4.74-4.14-4.88-4.33-.14-.19-1.17-1.55-1.17-2.96s.73-2.1.99-2.39c.26-.28.56-.35.75-.35.19 0 .38 0 .54.01.17.01.4-.07.63.48.24.57.81 1.98.88 2.12.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.35 1.46.29.15.46.13.63-.08.17-.21.72-.84.92-1.13.19-.29.39-.24.65-.14.27.1 1.68.79 1.97.93.29.15.48.22.55.34.07.13.07.72-.17 1.4Z" />
    </svg>
  );
}
