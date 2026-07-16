import { Award, Clock, FileText, ShieldCheck, Wallet } from "lucide-react";
import { trustBar } from "@/content/site";

const iconMap = {
  clock: Clock,
  shield: ShieldCheck,
  file: FileText,
  wallet: Wallet,
} as const;

export default function TrustBar() {
  return (
    <section
      aria-label="Why homeowners trust us"
      className="bg-diamond-white border-b border-diamond-border"
    >
      <div className="container-diamond py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {trustBar.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <div key={item.label} className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[6px] bg-diamond-warm">
                  <Icon className="h-5 w-5 text-diamond-red" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold text-diamond-charcoal leading-tight">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Certification placeholder — do not fabricate badges/ratings */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 border-t border-diamond-border pt-5">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Certifications:
          </span>
          <div className="flex flex-wrap items-center gap-3">
            {["BBB Accreditation", "Manufacturer Certification", "Lead-Safe Certified"].map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-2 rounded-[6px] border border-dashed border-diamond-border px-3 py-2 text-xs text-muted-foreground"
                title="Placeholder — add verified badge image"
              >
                <Award className="h-4 w-4 text-diamond-charcoal" aria-hidden="true" />
                {c} [verify]
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
