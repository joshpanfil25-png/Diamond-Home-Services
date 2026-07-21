import Image from "next/image";
import { BadgeCheck, MapPin, ShieldCheck, ShieldAlert, Timer } from "lucide-react";
import { trustBar } from "@/content/site";
import { certifications } from "@/content/media";

const iconMap = {
  pin: MapPin,
  shield: ShieldCheck,
  timer: Timer,
  badge: BadgeCheck,
} as const;

export default function TrustBar() {
  return (
    <section
      aria-label="Why homeowners trust us"
      className="bg-diamond-white border-b border-diamond-border"
    >
      <div className="container-diamond py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trustBar.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <div key={item.title} className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[6px] bg-diamond-warm">
                  <Icon className="h-5 w-5 text-diamond-red" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-diamond-charcoal leading-tight">
                    {item.title}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground leading-snug">
                    {item.note}
                  </span>
                </span>
              </div>
            );
          })}
        </div>

        {/* Certifications — verified badges from the live business profile. */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 border-t border-diamond-border pt-5">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Certifications:
          </span>
          <a
            href={certifications.bbb.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center rounded-[6px] border border-diamond-border bg-diamond-white px-3"
            aria-label="Better Business Bureau A+ rated — view profile"
          >
            <Image
              src={certifications.bbb.src}
              alt={certifications.bbb.alt}
              width={certifications.bbb.width}
              height={certifications.bbb.height}
              className="h-8 w-auto"
            />
          </a>
          <span className="inline-flex h-12 items-center rounded-[6px] border border-diamond-border bg-diamond-white px-3">
            <Image
              src={certifications.energyStar.src}
              alt={certifications.energyStar.alt}
              width={certifications.energyStar.width}
              height={certifications.energyStar.height}
              className="h-8 w-auto"
            />
          </span>
          <span className="inline-flex items-center gap-2 rounded-[6px] border border-diamond-border px-3 py-2 text-xs font-semibold text-diamond-charcoal">
            <ShieldAlert className="h-4 w-4 text-diamond-red" aria-hidden="true" />
            {certifications.leadSafeLabel}
          </span>
        </div>
      </div>
    </section>
  );
}
