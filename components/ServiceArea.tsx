import { Check } from "lucide-react";
import { serviceArea, serviceAreaTowns } from "@/content/site";
import ServiceAreaMap from "@/components/ServiceAreaMap";

export default function ServiceArea() {
  return (
    <section id="service-area" className="bg-diamond-white scroll-mt-20">
      <div className="container-diamond py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
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

            {/* Regions and towns as real server-rendered text for local SEO —
                the map is never the only mention of a town. */}
            <ul className="mt-6 space-y-3">
              {serviceAreaTowns.map(({ region, towns }) => {
                // Skip towns that just repeat the region name ("Chicago — Chicago").
                const shown = towns.filter((t) => t !== region);
                return (
                  <li key={region} className="flex items-start gap-2">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-diamond-red"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-diamond-charcoal">
                      <span className="font-semibold">{region}</span>
                      {shown.length > 0 && (
                        <span className="text-diamond-charcoal/70">
                          {" "}
                          — {shown.join(", ")}
                        </span>
                      )}
                    </span>
                  </li>
                );
              })}
              <li className="flex items-start gap-2">
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-diamond-red"
                  aria-hidden="true"
                />
                <span className="text-sm font-semibold text-diamond-charcoal">
                  And More
                </span>
              </li>
            </ul>
          </div>

          <ServiceAreaMap />
        </div>
      </div>
    </section>
  );
}
