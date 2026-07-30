import { Check } from "lucide-react";
import { diamondDifference } from "@/content/site";
import CtaButton from "@/components/CtaButton";

export default function DiamondDifference() {
  return (
    <section id="difference" className="bg-diamond-charcoal text-diamond-white scroll-mt-32">
      <div className="container-diamond py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="diamond-mark" aria-hidden="true" />
              <span className="text-sm font-bold uppercase tracking-widest text-diamond-red">
                Why Choose Diamond
              </span>
            </div>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold">
              {diamondDifference.headline}
            </h2>
            <p className="mt-4 text-diamond-white/80">
              <strong className="font-bold text-diamond-white">
                For more than 50 years,
              </strong>{" "}
              Chicagoland homeowners have trusted Diamond Home Service for
              honest recommendations and dependable workmanship.
            </p>
            <CtaButton href="#estimate" variant="red" className="mt-6">
              Get a Free Estimate
            </CtaButton>
          </div>

          <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {diamondDifference.points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-diamond-red" aria-hidden="true" />
                <span className="text-diamond-white/90">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
