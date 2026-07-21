import { DollarSign } from "lucide-react";
import CtaButton from "@/components/CtaButton";

// Prominent 0% financing banner — a white card overlapping the hero's bottom
// edge, per the client's reference screenshot.
export default function FinancingBanner() {
  return (
    <div className="relative z-10 -mt-8 sm:-mt-10">
      <div className="container-diamond">
        <div className="flex flex-col items-start gap-4 rounded-[10px] border border-diamond-border bg-diamond-white p-5 shadow-md sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] bg-diamond-red">
              <DollarSign className="h-6 w-6 text-diamond-white" aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-xl font-extrabold text-diamond-charcoal">
                0% Financing Available
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Affordable monthly payment options for roofing and exterior
                projects.
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
