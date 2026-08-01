"use client";

import Link from "next/link";
import Icon from "./Icon";
import Image from "next/image";
import { useLiveContent } from "@/lib/useLiveContent";

export default function Footer({ site: initialSite }) {
  const { site } = useLiveContent({ site: initialSite });
  return (
    <footer className="bg-plum text-cream">
      <div className="tape-rule-lg opacity-60" />
      <div className="mx-auto max-w-6xl px-5 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <Image 
            src="/Logo2.png"
            alt="Logo"
            width={140}
            height={80}
            className="bg-cream"
          
          />
          <p className="mt-1 font-mono text-[0.65rem] tracking-widest text-gold uppercase">
            {site.location}
          </p>
          <p className="mt-4 text-cream/70 text-sm leading-relaxed max-w-xs">
            {site.description}
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg mb-4">Quick links</h3>
          <ul className="space-y-2 text-sm text-cream/75">
            <li><Link className="hover:text-gold" href="/services">Services</Link></li>
            <li><Link className="hover:text-gold" href="/products">Products</Link></li>
            <li><Link className="hover:text-gold" href="/trainings">Trainings & Certificates</Link></li>
            <li><Link className="hover:text-gold" href="/about">About Us</Link></li>
            <li><Link className="hover:text-gold" href="/enroll">Enroll Now</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg mb-4">Get in touch</h3>
          <ul className="space-y-3 text-sm text-cream/85">
            <li className="flex items-center gap-2">
              <Icon name="phone" className="w-4 h-4 text-gold shrink-0" />
              <a className="hover:text-gold" href={`tel:${site.phone}`}>{site.phone}</a>
            </li>
            <li className="flex items-center gap-2">
              <Icon name="mail" className="w-4 h-4 text-gold shrink-0" />
              <a className="hover:text-gold" href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li className="flex items-center gap-2">
              <Icon name="pin" className="w-4 h-4 text-gold shrink-0" />
              {site.location}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-6xl px-5 py-5 flex flex-col sm:flex-row justify-between gap-2 text-xs text-cream/50">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <span className="italic font-display text-gold/80">You can.</span>
        </div>
      </div>
    </footer>
  );
}
