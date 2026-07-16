import { CalendarCheck, Phone } from "lucide-react";
import { company } from "@/content/site";

export default function MobileConversionBar() {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 grid grid-cols-2 border-t border-diamond-border bg-diamond-white pb-[env(safe-area-inset-bottom)] shadow-[0_-2px_10px_rgba(0,0,0,0.08)]">
      <a
        href={company.phoneHref}
        className="flex items-center justify-center gap-2 py-3.5 min-h-[52px] font-display font-bold text-diamond-charcoal border-r border-diamond-border"
      >
        <Phone className="h-5 w-5 text-diamond-red" aria-hidden="true" />
        Call Now
      </a>
      <a
        href="/#estimate"
        className="flex items-center justify-center gap-2 py-3.5 min-h-[52px] font-display font-bold text-diamond-white bg-diamond-red"
      >
        <CalendarCheck className="h-5 w-5" aria-hidden="true" />
        Free Estimate
      </a>
    </div>
  );
}
