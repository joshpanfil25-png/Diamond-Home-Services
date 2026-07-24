"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/content/site";

export default function FAQ() {
  // First item open by default; only one open at a time.
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-diamond-white">
      <div className="container-diamond py-16 lg:py-20">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="diamond-mark" aria-hidden="true" />
            <span className="text-sm font-bold uppercase tracking-widest text-diamond-red">
              FAQ
            </span>
          </div>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-diamond-charcoal">
            {faqs.headline}
          </h2>
        </div>

        <div className="mt-8 max-w-3xl divide-y divide-diamond-border border-y border-diamond-border">
          {faqs.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <h3>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-btn-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="text-base font-bold text-diamond-charcoal">{item.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-diamond-red transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                {isOpen && (
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-btn-${i}`}
                    className="pb-5 text-diamond-charcoal/80"
                  >
                    {/* [FOR REVIEW] markers stay in content/site.ts for the
                        client's pass but must never reach visitors. */}
                    {item.a.replace(/^\[FOR REVIEW\]\s*/, "")}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
