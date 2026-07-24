"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, Phone } from "lucide-react";
import { company, nav } from "@/content/site";
import { media } from "@/content/media";
import MobileMenu from "@/components/MobileMenu";

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-diamond-white border-b border-diamond-border">
      <div className="container-diamond flex items-center justify-between gap-4 py-3">
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
          {/* h-14/h-15 renders ~27% larger than the old h-11/h-12; the negative
              vertical margins cancel the growth in layout (56−12=44, 60−12=48)
              so the header bar keeps its previous height and the logo simply
              overlaps the tagline gap. */}
          <Image
            src={media.logo.src}
            alt={media.logo.alt}
            width={media.logo.width}
            height={media.logo.height}
            className="h-14 w-auto sm:h-15 -my-1.5 self-start"
            preload
          />
          {/* Tagline hidden in the tight lg–xl window so the header never overflows */}
          <span className="hidden sm:block lg:hidden xl:block text-[11px] font-semibold text-diamond-charcoal mt-0.5">
            {company.tagline}
          </span>
        </Link>

        {/* Desktop nav — px-2 below xl keeps everything on one line at ~1024px */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {nav.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.dropdown && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {item.href.startsWith("/#") ? (
                <a
                  href={item.href}
                  className="inline-flex items-center gap-1 px-2 xl:px-3 py-2 text-sm font-semibold text-diamond-charcoal hover:text-diamond-red rounded-[4px] transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 px-2 xl:px-3 py-2 text-sm font-semibold text-diamond-charcoal hover:text-diamond-red rounded-[4px] transition-colors"
                  aria-haspopup={item.dropdown ? "true" : undefined}
                  aria-expanded={item.dropdown ? openDropdown === item.label : undefined}
                >
                  {item.label}
                  {item.dropdown && <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />}
                </Link>
              )}
              {item.dropdown && openDropdown === item.label && (
                <div className="absolute left-0 top-full pt-1 w-60">
                  <ul className="bg-diamond-white border border-diamond-border rounded-[6px] shadow-sm py-2">
                    {item.dropdown.map((sub) =>
                      sub.href.startsWith("/#") ? (
                        <li key={sub.label}>
                          <a
                            href={sub.href}
                            className="block px-4 py-2 text-sm text-diamond-charcoal hover:bg-diamond-warm hover:text-diamond-red border-l-2 border-transparent hover:border-diamond-red transition-colors"
                          >
                            {sub.label}
                          </a>
                        </li>
                      ) : (
                        <li key={sub.label}>
                          <Link
                            href={sub.href}
                            className="block px-4 py-2 text-sm text-diamond-charcoal hover:bg-diamond-warm hover:text-diamond-red border-l-2 border-transparent hover:border-diamond-red transition-colors"
                          >
                            {sub.label}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Phone — MUST stay on one line (fix #2): whitespace-nowrap + shrink-0,
              shown from xl so nav + phone + CTA never crowd at ~1024–1180px. */}
          <a
            href={company.phoneHref}
            className="hidden xl:inline-flex items-center gap-1.5 text-sm font-bold text-diamond-charcoal hover:text-diamond-red whitespace-nowrap shrink-0"
          >
            <Phone className="h-4 w-4 text-diamond-red" aria-hidden="true" />
            {company.phoneDisplay}
          </a>
          <a
            href="/#estimate"
            className="hidden sm:inline-flex items-center justify-center rounded-[6px] bg-diamond-red px-4 py-2.5 text-sm font-semibold uppercase tracking-wide font-display text-diamond-white hover:bg-diamond-red-dark transition-colors whitespace-nowrap shrink-0"
          >
            Get a Free Estimate
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
