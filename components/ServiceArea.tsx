import { Phone } from "lucide-react";
import { company, serviceArea } from "@/content/site";
import ServiceAreaAccordion from "@/components/ServiceAreaAccordion";
import ServiceAreaMap from "@/components/ServiceAreaMap";

export default function ServiceArea() {
  return (
    <section id="service-area" className="bg-diamond-white scroll-mt-32">
      <div className="container-diamond py-16 lg:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="diamond-mark" aria-hidden="true" />
              <span className="text-sm font-bold uppercase tracking-widest text-diamond-red">
                Service Area
              </span>
            </div>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-diamond-charcoal">
              {serviceArea.headline}
            </h2>
            <p className="mt-3 max-w-md text-muted-foreground">{serviceArea.copy}</p>

            <div className="mt-6">
              <ServiceAreaAccordion />
            </div>

            <p className="mt-6 text-lg font-bold text-diamond-charcoal">
              And More! Call Today:{" "}
              <a
                href={company.phoneHref}
                className="inline-flex items-center gap-1.5 text-diamond-red hover:text-diamond-red-dark whitespace-nowrap"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                {company.phoneDisplay}
              </a>
            </p>
          </div>

          <div className="lg:sticky lg:top-36">
            <ServiceAreaMap />
          </div>
        </div>
      </div>
    </section>
  );
}
