"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Phone, X } from "lucide-react";
import { company, nav } from "@/content/site";
import CtaButton from "@/components/CtaButton";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  // Close on Escape + trap focus inside the panel while open.
  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const focusables = () =>
      panel
        ? Array.from(
            panel.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
          )
        : [];

    focusables()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop — click to close */}
      <button
        type="button"
        className="absolute inset-0 bg-diamond-black/60"
        aria-label="Close menu"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-lg flex flex-col overflow-y-auto"
      >
        <div className="flex items-center justify-between border-b border-diamond-border px-5 py-4">
          <p className="font-display text-lg font-extrabold text-diamond-charcoal">
            Menu
          </p>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-[6px] border border-diamond-border text-diamond-charcoal"
            aria-label="Close menu"
            onClick={onClose}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex-1 px-5 py-4" aria-label="Mobile navigation links">
          <ul className="space-y-1">
            {nav.map((item) => (
              <li key={item.label}>
                {item.dropdown ? (
                  <div>
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        className="flex-1 py-3 text-base font-semibold text-diamond-charcoal"
                        onClick={onClose}
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center text-diamond-charcoal"
                        aria-expanded={expanded === item.label}
                        aria-label={`Toggle ${item.label} submenu`}
                        onClick={() =>
                          setExpanded(expanded === item.label ? null : item.label)
                        }
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            expanded === item.label ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                    {expanded === item.label && (
                      <ul className="ml-3 border-l-2 border-diamond-red/30 pl-4 pb-2 space-y-1">
                        {item.dropdown.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              className="block py-2 text-sm font-semibold text-muted-foreground hover:text-diamond-red"
                              onClick={onClose}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : item.href.startsWith("/#") ? (
                  <a
                    href={item.href}
                    className="block py-3 text-base font-semibold text-diamond-charcoal"
                    onClick={onClose}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="block py-3 text-base font-semibold text-diamond-charcoal"
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-diamond-border px-5 py-4 space-y-3">
          <CtaButton
            variant="outline"
            href={company.phoneHref}
            className="w-full"
            onClick={onClose}
          >
            <Phone className="h-4 w-4 text-diamond-red" aria-hidden="true" />
            Call {company.phoneDisplay}
          </CtaButton>
          <CtaButton href="/#estimate" className="w-full" onClick={onClose}>
            Get a Free Estimate
          </CtaButton>
        </div>
      </div>
    </div>
  );
}
