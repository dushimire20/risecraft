"use client";

import { useLiveContent } from "@/lib/useLiveContent";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";

export default function ContactBody({ initialContent }) {
  const { site } = useLiveContent(initialContent);
  return (
    <>
      <PageHero
        kicker="Contact"
        title="Let's talk"
        description="Have a question about a service, a product order, or a training? Send us a message and we'll respond promptly."
      />
      <section className="mx-auto max-w-6xl px-5 py-16 grid md:grid-cols-5 gap-12">
        <div className="md:col-span-3 rounded-2xl border border-plum/10 bg-white/60 p-6 md:p-8">
          <ContactForm />
        </div>
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-2xl bg-plum text-cream p-6 md:p-8">
            <h3 className="font-display text-xl font-semibold">Reach us directly</h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Icon name="phone" className="w-5 h-5 text-gold shrink-0" />
                <a className="hover:text-gold" href={`tel:${site.phone}`}>{site.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="mail" className="w-5 h-5 text-gold shrink-0" />
                <a className="hover:text-gold" href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="pin" className="w-5 h-5 text-gold shrink-0" />
                {site.location}
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-plum/10 bg-paper/70 p-6 md:p-8">
            <h3 className="font-display text-lg font-semibold text-plum">Visiting us</h3>
            <p className="mt-2 text-sm text-ink/70 leading-relaxed">
              Our workshop and training floor are open on weekdays in Kabuga-Kigali.
              Call ahead to arrange a visit or a fitting.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
