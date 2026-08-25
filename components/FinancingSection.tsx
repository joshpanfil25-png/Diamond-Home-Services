import { Check, Phone } from "lucide-react";
import { company } from "@/content/site";
import CtaButton from "@/components/CtaButton";
import LiteYouTube from "@/components/LiteYouTube";

const points = [
  "Simple financing inquiry",
  "0% financing for qualified homeowners",
  "Clear next steps",
  "No obligation to request information",
];

// Round 3: everything (heading, copy, checkmarks, CTA, disclaimer) lives in
// the red panel; the right side is the client's YouTube video. On mobile the
// red panel stacks above the video.
// Round 4: the two buttons collapse into ONE tel: button, and the video gets
// a "What is the diamond difference? Watch now." header.
export default function FinancingSection() {
  return (
    <section id="financing" className="scroll-mt-32">
      <div className="grid lg:grid-cols-2">
        {/* Red panel */}
        <div className="bg-diamond-red text-diamond-white">
          <div className="max-w-[640px] px-6 sm:px-10 lg:pl-10 lg:pr-16 py-14 lg:py-16 lg:ml-auto">
            <span className="text-sm font-bold uppercase tracking-widest text-diamond-white/90">
              0% Financing Available
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold">
              0% Financing on Your Next Home Project
            </h2>
            <p className="mt-4 text-lg text-diamond-white/90">
              Qualified homeowners can move forward now and pay over time with 0% financing —
              making roofing, siding, windows, and gutters more manageable.
            </p>

            <ul className="mt-6 space-y-3">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-diamond-white/15">
                    <Check className="h-4 w-4 text-diamond-white" aria-hidden="true" />
                  </span>
                  <span className="font-semibold">{p}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <CtaButton href={company.phoneHref} variant="charcoal" className="text-center">
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                Call now to speak with a financing specialist.
              </CtaButton>
            </div>

            <p className="mt-8 rounded-[6px] bg-diamond-black/20 p-4 text-sm text-diamond-white/80">
              Financing is subject to credit approval. Available terms and conditions may vary.
            </p>
          </div>
        </div>

        {/* Video side */}
        <div className="flex items-center bg-diamond-charcoal">
          <div className="w-full px-6 py-10 sm:px-10 lg:pr-10 lg:pl-16 lg:py-16">
            <h3 className="mb-5 font-display text-2xl sm:text-3xl font-extrabold text-diamond-white">
              What is the diamond difference?{" "}
              <span className="text-diamond-red">Watch now.</span>
            </h3>
            <LiteYouTube
              videoId="mIQANBMkeMY"
              title="Chicago Windows by Diamond Home Service"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
