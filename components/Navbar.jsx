"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";


const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/trainings", label: "Trainings" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar({ site }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur border-b border-plum/10">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex items-center justify-between md:grid md:grid-cols-[auto_1fr_auto] md:gap-6">
          <Link href="/" className="flex items-center gap-3 focus-ring rounded-sm" onClick={() => setOpen(false)}>
            <div className="leading-none">
             <Image
                src="/Logo2.png"
                alt="Logo"
                width={140}
                height={40}
                className="w-20 h-20"
              />

            </div>
          </Link>

          <nav className="hidden md:flex items-center justify-center gap-8">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body text-sm tracking-wide focus-ring rounded-sm transition-colors ${
                  pathname === link.href
                    ? "text-plum font-semibold"
                    : "text-plum/70 hover:text-plum"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center justify-end">
            <Link
              href="/enroll"
              className="inline-flex items-center rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-plum-dark hover:bg-gold-light transition-colors focus-ring"
            >
              Enroll Now
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-plum focus-ring rounded-sm"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-plum/10 bg-cream">
          <nav className="mx-auto max-w-6xl px-5 py-4 flex flex-col gap-1">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`py-2.5 text-base focus-ring rounded-sm ${
                  pathname === link.href ? "text-plum font-semibold" : "text-plum/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/enroll"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-gold px-5 py-3 text-sm font-semibold text-plum-dark"
            >
              Enroll Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
