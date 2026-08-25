"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Phone } from "lucide-react";
import { callCta, company, nav } from "@/content/site";
import { media } from "@/content/media";
import MobileMenu from "@/components/MobileMenu";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-diamond-white border-b border-diamond-border">
      <div className="container-diamond flex items-center justify-between gap-4 py-2">
        {/* Logo — width/height are the file's TRUE intrinsic dimensions
            (1500×571); height is constrained via CSS and width stays auto.
            items-start + self-start are REQUIRED: this Link is a flex column,
            whose default align-items:stretch would otherwise stretch the img
            to the width of the tagline below it and distort the aspect ratio. */}
        <Link
          href="/"
          className="flex flex-col items-start shrink-0"
          aria-label={`${company.name} home`}
        >
          {/* Round 3: +40% from the previous h-14/h-15 (56→78px, 60→84px).
              At this size the logo can't hide inside the old bar height, so
              the header grows the minimum necessary; the outer flex row keeps
              it vertically centered against the nav. */}
          <Image
            src={media.logo.src}
            alt={media.logo.alt}
            width={media.logo.width}
            height={media.logo.height}
            className="h-[78px] w-auto sm:h-[84px] self-start"
            preload
          />
          {/* Tagline hidden in the tight lg–xl window so the header never overflows */}
          <span className="hidden sm:block lg:hidden xl:block text-[11px] font-semibold text-diamond-charcoal mt-0.5">
            {company.tagline}
          </span>
        </Link>

        {/* Desktop nav — Round 4: plain links only, no dropdowns.
            px-2 below xl keeps everything on one line at ~1024px. */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {nav.map((item) =>
            item.href.startsWith("/#") ? (
              <a
                key={item.label}
                href={item.href}
                className="inline-flex items-center px-2 xl:px-3 py-2 text-sm font-semibold text-diamond-charcoal hover:text-diamond-red rounded-[4px] transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="inline-flex items-center px-2 xl:px-3 py-2 text-sm font-semibold text-diamond-charcoal hover:text-diamond-red rounded-[4px] transition-colors"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Right actions — Round 4: ONE red tel: button with the number inside. */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={callCta.href}
            className="hidden sm:inline-flex items-center justify-center gap-2 rounded-[6px] bg-diamond-red px-4 py-2.5 text-sm font-semibold uppercase tracking-wide font-display text-diamond-white hover:bg-diamond-red-dark transition-colors whitespace-nowrap shrink-0"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span>
              {callCta.label} <span className="font-extrabold">{callCta.phone}</span>
            </span>
          </a>
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center h-11 w-11 rounded-[6px] border border-diamond-border text-diamond-charcoal"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
