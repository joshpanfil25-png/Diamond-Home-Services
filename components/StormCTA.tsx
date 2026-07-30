import { CloudLightning, Phone } from "lucide-react";
import { company } from "@/content/site";
import CtaButton from "@/components/CtaButton";

export default function StormCTA() {
  return (
    <section id="storm" className="relative bg-diamond-charcoal text-diamond-white scroll-mt-32">
      {/* Red roofline edge */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-diamond-red" aria-hidden="true" />
      <div className="container-diamond py-14 lg:py-16">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:justify-between">
          <div className="max-w-2xl">
            <span className="flex h-12 w-12 items-center justify-center rounded-[6px] bg-diamond-red">
              <CloudLightning className="h-6 w-6 text-diamond-white" aria-hidden="true" />
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold">
              Concerned About Storm Damage?
            </h2>
            <p className="mt-3 text-lg text-diamond-white/85">
              Hail, wind, and falling debris can cause damage that may not be visible from the
              ground. Schedule a professional roof inspection.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <CtaButton href="#estimate" variant="red">
              Schedule a Roof Inspection
            </CtaButton>
            <CtaButton href={company.phoneHref} variant="outlineLight">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call {company.phoneDisplay}
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
