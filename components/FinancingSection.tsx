import { Check, Phone } from "lucide-react";
import { company } from "@/content/site";
import CtaButton from "@/components/CtaButton";

const points = [
  "Simple financing inquiry",
  "Options for qualified homeowners",
  "Clear next steps",
  "No obligation to request information",
];

export default function FinancingSection() {
  return (
    <section id="financing" className="scroll-mt-20">
      <div className="grid lg:grid-cols-2">
        {/* Red side */}
        <div className="bg-diamond-red text-diamond-white">
          <div className="max-w-[640px] px-6 sm:px-10 lg:pl-10 lg:pr-16 py-14 lg:py-20 lg:ml-auto">
            <span className="text-sm font-bold uppercase tracking-widest text-diamond-white/90">
              Flexible Financing
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold">
              A New Roof Doesn&apos;t Have to Wait
            </h2>
            <p className="mt-4 text-lg text-diamond-white/90">
              Explore flexible financing options that can help make an essential roofing project
              more manageable.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <CtaButton href="#estimate" variant="charcoal">
                Explore Financing Options
              </CtaButton>
              <CtaButton href={company.phoneHref} variant="outlineLight">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Talk to a Roofing Specialist
              </CtaButton>
            </div>
          </div>
        </div>

        {/* White side */}
        <div className="bg-diamond-white">
          <div className="max-w-[640px] px-6 sm:px-10 lg:pr-10 lg:pl-16 py-14 lg:py-20">
            <ul className="space-y-4">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-diamond-red/10">
                    <Check className="h-4 w-4 text-diamond-red" aria-hidden="true" />
                  </span>
                  <span className="text-lg font-semibold text-diamond-charcoal">{p}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 rounded-[6px] bg-diamond-warm border border-diamond-border p-4 text-sm text-muted-foreground">
              Financing is subject to credit approval. Available terms and conditions may vary.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
