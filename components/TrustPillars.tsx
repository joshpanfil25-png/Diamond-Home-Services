import { Handshake, Hammer, PhoneCall } from "lucide-react";
import { trustPillars } from "@/content/site";

const iconMap = {
  handshake: Handshake,
  hammer: Hammer,
  "phone-call": PhoneCall,
} as const;

export default function TrustPillars() {
  return (
    <section id="about-roofing" className="bg-diamond-warm">
      <div className="container-diamond py-16 lg:py-20">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="diamond-mark" aria-hidden="true" />
            <span className="text-sm font-bold uppercase tracking-widest text-diamond-red">
              Built on Trust
            </span>
          </div>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-diamond-charcoal">
            {trustPillars.headline}
          </h2>
          <p className="mt-4 text-lg text-diamond-charcoal/80">
            <strong className="font-bold text-diamond-charcoal">
              {trustPillars.copyLead}
            </strong>{" "}
            {trustPillars.copy}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {trustPillars.pillars.map((pillar) => {
            const Icon = iconMap[pillar.icon as keyof typeof iconMap];
            return (
              <div
                key={pillar.title}
                className="bg-diamond-white rounded-[8px] border border-diamond-border p-6"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-[6px] bg-diamond-red/10">
                  <Icon className="h-6 w-6 text-diamond-red" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-xl font-bold text-diamond-charcoal">{pillar.title}</h3>
                <p className="mt-2 text-diamond-charcoal/75">{pillar.copy}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
