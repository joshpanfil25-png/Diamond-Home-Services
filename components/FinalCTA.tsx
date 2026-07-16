import { Phone } from "lucide-react";
import { company } from "@/content/site";
import CtaButton from "@/components/CtaButton";

export default function FinalCTA() {
  return (
    <section id="final-cta" className="bg-diamond-red text-diamond-white scroll-mt-20">
      <div className="container-diamond py-16 lg:py-20 text-center">
        {/* inline style: .diamond-mark is unlayered CSS and would beat the bg utility */}
        <span className="diamond-mark" style={{ background: "#ffffff" }} aria-hidden="true" />
        <h2 className="mt-4 font-display text-3xl sm:text-5xl font-extrabold">
          Ready to Protect Your Home?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-diamond-white/90">
          Get a clear roofing recommendation from a company that has served Chicagoland homeowners
          for more than 50 years.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <CtaButton href="#estimate" variant="charcoal">
            Get a Free Estimate
          </CtaButton>
          <CtaButton href={company.phoneHref} variant="outlineLight">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call {company.phoneDisplay}
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
