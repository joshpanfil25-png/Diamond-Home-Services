import { DollarSign } from "lucide-react";
import CtaButton from "@/components/CtaButton";

// Prominent 0% financing banner — a narrow white card floating over the page
// background with its own shadow (no full-width band), generous air above and
// below (Round 3).
export default function FinancingBanner() {
  return (
    <div className="relative z-10 py-10 sm:py-14">
      <div className="container-diamond">
        <div className="mx-auto flex max-w-[760px] flex-col items-start gap-3 rounded-[10px] border border-diamond-border bg-diamond-white px-5 py-4 shadow-lg sm:flex-row sm:items-center sm:justify-between sm:gap-4">
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
