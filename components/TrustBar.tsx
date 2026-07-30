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
      {/* Full-bleed band: the section background runs edge to edge while the
          content keeps a wide max-width inside. Sized as a major band, not a
          thin row (Round 3). */}
      <div className="mx-auto w-full max-w-[1440px] px-5 py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {trustBar.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <div key={item.title} className="flex items-start gap-4">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[8px] bg-diamond-warm">
                  <Icon className="h-8 w-8 text-diamond-red" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-base lg:text-lg font-bold text-diamond-charcoal leading-tight">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground leading-snug">
                    {item.note}
                  </span>
                </span>
              </div>
            );
          })}
        </div>

        {/* Certifications — verified badges from the live business profile.
            Rendered at 2x (h-16 logos) so they read as trust anchors. */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 border-t border-diamond-border pt-5">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Certifications:
          </span>
          {/* Images fill their boxes (object-contain, minimal padding) instead
              of sitting small inside oversized containers. */}
          <a
            href={certifications.bbb.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-20 items-center rounded-[6px] border border-diamond-border bg-diamond-white p-1"
            aria-label="Better Business Bureau A+ rated — view profile"
          >
            <Image
              src={certifications.bbb.src}
              alt={certifications.bbb.alt}
              width={certifications.bbb.width}
              height={certifications.bbb.height}
              className="h-full w-auto object-contain"
            />
          </a>
          <span className="inline-flex h-20 items-center rounded-[6px] border border-diamond-border bg-diamond-white p-1">
            <Image
              src={certifications.energyStar.src}
              alt={certifications.energyStar.alt}
              width={certifications.energyStar.width}
              height={certifications.energyStar.height}
              className="h-full w-auto object-contain"
            />
          </span>
          <span className="inline-flex h-20 items-center gap-3 rounded-[6px] border border-diamond-border px-4 text-base font-semibold text-diamond-charcoal">
            <ShieldAlert className="h-8 w-8 text-diamond-red" aria-hidden="true" />
            {certifications.leadSafeLabel}
          </span>
        </div>
      </div>
    </section>
  );
}
