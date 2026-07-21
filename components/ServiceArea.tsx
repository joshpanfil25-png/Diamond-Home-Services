import { ArrowRight, MapPin } from "lucide-react";
import { serviceArea } from "@/content/site";
import SectionHeading from "@/components/SectionHeading";

export default function ServiceArea() {
  return (
    <section id="service-area" className="bg-diamond-white scroll-mt-20">
      <div className="container-diamond py-16 lg:py-20">
        <SectionHeading
          eyebrow="Service Area"
          heading={serviceArea.headline}
          lead={serviceArea.copy}
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {serviceArea.groups.map((group) => (
            <div
              key={group.title}
              className="rounded-[8px] border border-diamond-border bg-diamond-warm p-6"
            >
              <MapPin className="h-6 w-6 text-diamond-red" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-bold text-diamond-charcoal">{group.title}</h3>
              <p className="mt-1 text-sm text-diamond-charcoal/70">{group.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <h3 className="text-sm font-bold uppercase tracking-widest text-diamond-red">
            {serviceArea.townsHeading}
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {serviceArea.towns.map((town) => (
              <li
                key={town}
                className="inline-flex items-center gap-1.5 rounded-[6px] border border-diamond-border bg-diamond-warm px-3 py-1.5 text-sm font-semibold text-diamond-charcoal"
              >
                <MapPin className="h-3.5 w-3.5 text-diamond-red" aria-hidden="true" />
                {town}
              </li>
            ))}
            <li className="inline-flex items-center px-3 py-1.5 text-sm font-semibold text-diamond-charcoal/70">
              &amp; more
            </li>
          </ul>
        </div>

        <a
          href="#estimate"
          className="mt-8 inline-flex items-center gap-1.5 font-semibold text-diamond-red hover:text-diamond-red-dark"
        >
          Explore Our Service Area
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
