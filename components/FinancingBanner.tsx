import { DollarSign } from "lucide-react";
import CtaButton from "@/components/CtaButton";

// Prominent 0% financing banner — a white card overlapping the hero's bottom
// edge, per the client's reference screenshot.
export default function FinancingBanner() {
  return (
    <div className="relative z-10 -mt-8 sm:-mt-10">
      <div className="container-diamond">
        <div className="flex flex-col items-start gap-3 rounded-[10px] border border-diamond-border bg-diamond-white px-4 py-3 shadow-md sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] bg-diamond-red">
              <DollarSign className="h-5 w-5 text-diamond-white" aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-lg font-extrabold uppercase tracking-wide text-diamond-charcoal leading-tight">
                0% Interest-Free Financing
              </p>
              <p className="text-sm text-muted-foreground leading-snug">
                Affordable monthly payment options with NO money down.
              </p>
            </div>
          </div>
          <CtaButton href="#financing" variant="outline" className="shrink-0">
            Explore Financing Options
          </CtaButton>
        </div>
      </div>
    </div>
  );
}
