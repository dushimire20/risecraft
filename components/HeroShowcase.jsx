"use client";
import Image from "next/image";

export default function HeroShowcase({ items }) {
  if (!items || items.length === 0) return null;

  const displayItems = items.length >= 3 ? items.slice(0, 3) : Array.from({ length: 3 }, (_, index) => items[index % items.length]);

  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-cream/85 p-4 sm:p-6 shadow-[0_40px_90px_-40px_rgba(36,21,57,0.45)] ring-1 ring-plum/10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-gold/20 to-transparent blur-3xl" />
      <div className="relative grid gap-4 sm:grid-cols-[1.5fr_1fr] items-stretch">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-plum/5 ring-1 ring-plum/10 shadow-[0_18px_60px_-28px_rgba(36,21,57,0.35)]">
          <Image
            src={displayItems[0].src}
            alt={displayItems[0].label || "Showcase image"}
            fill
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent" />
          {displayItems[0].label && (
            <div className="absolute left-5 bottom-5 rounded-full bg-cream/95 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-plum shadow-lg shadow-plum/10">
              {displayItems[0].label}
            </div>
          )}
        </div>

        <div className="grid gap-4">
          {displayItems.slice(1).map((item, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-[1.5rem] bg-plum/5 ring-1 ring-plum/10 shadow-[0_15px_40px_-28px_rgba(36,21,57,0.35)] h-[220px]"
            >
              <Image
                src={item.src}
                alt={item.label || "Showcase image"}
                fill
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent" />
              {item.label && (
                <div className="absolute left-4 bottom-4 rounded-full bg-cream/95 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-plum shadow-md shadow-plum/10">
                  {item.label}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {items.map((item, index) => (
          <span
            key={index}
            className="rounded-full bg-plum/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-plum"
          >
            {item.label || `Item ${index + 1}`}
          </span>
        ))}
      </div>
    </section>
  );
}