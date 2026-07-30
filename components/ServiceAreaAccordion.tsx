"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { serviceAreaTowns } from "@/content/site";

// Region accordion — multiple panels may be open at once. Every town list is
// always rendered in the DOM (collapsed panels use the hidden attribute, not
// conditional mounting) so the names stay server-rendered text for local SEO.
export default function ServiceAreaAccordion() {
  const [open, setOpen] = useState<Set<number>>(new Set([0]));

  function toggle(i: number) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  return (
    <div className="divide-y divide-diamond-border border-y border-diamond-border">
      {serviceAreaTowns.map(({ region, towns }, i) => {
        const isOpen = open.has(i);
        return (
          <div key={region}>
            <h3>
              <button
                type="button"
                id={`area-btn-${i}`}
                aria-expanded={isOpen}
                aria-controls={`area-panel-${i}`}
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between gap-4 py-3.5 text-left"
              >
                <span className="text-base font-bold text-diamond-charcoal">
                  {region}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-diamond-red transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={`area-panel-${i}`}
              role="region"
              aria-labelledby={`area-btn-${i}`}
              hidden={!isOpen}
              className="pb-4"
            >
              <ul className="flex flex-wrap gap-x-2 gap-y-1.5">
                {towns.map((town) => (
                  <li
                    key={town}
                    className="rounded-[4px] bg-diamond-warm px-2.5 py-1 text-sm font-medium text-diamond-charcoal"
                  >
                    {town}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
