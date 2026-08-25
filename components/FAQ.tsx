"use client";

import { useState } from "react";
import { ChevronDown, Phone } from "lucide-react";
import { company, faqCta, faqs } from "@/content/site";
import CtaButton from "@/components/CtaButton";

// Round 4: the former standalone FinalCTA ("Ready to Protect Your Home?")
// now lives as a red card in a right-hand column beside the FAQ list. The
// card carries id="contact" so the nav/footer Contact links land on it.
export default function FAQ() {
  // First item open by default; only one open at a time.
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-diamond-white scroll-mt-32">
      <div className="container-diamond py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.85fr] lg:gap-14 lg:items-start">
          {/* FAQ list */}
          <div>
            <div className="flex items-center gap-2">
              <span className="diamond-mark" aria-hidden="true" />
              <span className="text-sm font-bold uppercase tracking-widest text-diamond-red">
                FAQ
              </span>
            </div>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-diamond-charcoal">
              {faqs.headline}
            </h2>

            <div className="mt-8 divide-y divide-diamond-border border-y border-diamond-border">
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

          {/* CTA card (formerly FinalCTA) */}
          <aside
            id="contact"
            aria-labelledby="contact-heading"
            className="rounded-[10px] bg-diamond-red p-8 text-center text-diamond-white shadow-lg scroll-mt-32 lg:sticky lg:top-32 lg:p-10"
          >
            {/* inline style: .diamond-mark is unlayered CSS and would beat the bg utility */}
            <span className="diamond-mark" style={{ background: "#ffffff" }} aria-hidden="true" />
            <h2
              id="contact-heading"
              className="mt-4 font-display text-3xl sm:text-4xl font-extrabold"
            >
              {faqCta.headline}
            </h2>
            <p className="mt-4 text-lg text-diamond-white/90">{faqCta.copy}</p>
            <div className="mt-8">
              <CtaButton
                href={company.phoneHref}
                variant="charcoal"
                className="w-full text-center"
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  {faqCta.buttonLabel}{" "}
                  <span className="font-extrabold">{company.phoneDisplay}</span>
                </span>
              </CtaButton>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
