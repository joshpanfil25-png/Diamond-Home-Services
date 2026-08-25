import { Award, BadgeCheck, Percent, ShieldCheck, Star } from "lucide-react";
import { trustBand } from "@/content/site";

const iconMap = {
  bbb: BadgeCheck,
  years: Award,
  licensed: ShieldCheck,
  stars: Star,
  financing: Percent,
} as const;

// Round 4: replaces the 0% financing banner. A large white card that pulls
// UP over the hero's bottom edge (negative top margin; the hero carries
// matching extra bottom padding). 5 columns on desktop, 3/2 on tablet,
// 2 on phones — icon above a short label, per the client's screenshot.
export default function TrustBand() {
  return (
    <div className="relative z-10 -mt-14 lg:-mt-20 pb-6 sm:pb-10">
      <div className="container-diamond">
        <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 gap-x-4 rounded-[12px] border border-diamond-border bg-diamond-white px-6 py-8 shadow-xl sm:grid-cols-3 sm:px-8 sm:py-10 lg:grid-cols-5 lg:gap-x-6 lg:py-12">
        {trustBand.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          return (
            <li
              key={item.label}
              className="flex flex-col items-center gap-3 text-center"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-diamond-red/10 lg:h-[72px] lg:w-[72px]">
                <Icon
                  className="h-8 w-8 text-diamond-red lg:h-9 lg:w-9"
                  aria-hidden="true"
                />
              </span>
              <span className="font-display text-sm font-extrabold uppercase tracking-wide text-diamond-charcoal sm:text-base">
                {item.label}
              </span>
            </li>
          );
        })}
        </ul>
      </div>
    </div>
  );
}
