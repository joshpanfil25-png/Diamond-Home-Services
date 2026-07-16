import Image from "next/image";
import { Check, MapPin, Phone } from "lucide-react";
import { company, hero } from "@/content/site";
import { heroImage } from "@/content/media";
import CtaButton from "@/components/CtaButton";
import RoofingLeadForm from "@/components/RoofingLeadForm";

export default function Hero() {
  return (
    <section
      id="estimate"
      className="relative isolate overflow-hidden bg-diamond-charcoal scroll-mt-20"
    >
      {/* Background image */}
      <Image
        src={heroImage.src}
        alt={heroImage.alt}
        width={heroImage.width}
        height={heroImage.height}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        preload
      />
      {/* Charcoal overlay for readability */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-diamond-black/90 via-diamond-black/75 to-diamond-black/45"
        aria-hidden="true"
      />
      {/* Subtle red roofline accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 bg-diamond-red"
        aria-hidden="true"
      />
      <div
        className="absolute -top-10 left-0 h-24 w-1/2 bg-diamond-red/20 -skew-y-3"
        aria-hidden="true"
      />

      <div className="container-diamond relative py-12 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Left content */}
          <div className="text-diamond-white">
            <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-diamond-white/90">
              <span className="diamond-mark" aria-hidden="true" />
              {hero.eyebrow}
            </p>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05]">
              {hero.h1}
            </h1>
            <p className="mt-5 max-w-xl text-base sm:text-lg text-diamond-white/85">
              {hero.supporting}
            </p>

            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {hero.trustPoints.map((point) => (
                <li key={point} className="flex items-center gap-2 text-sm font-semibold">
                  <Check
                    className="h-4 w-4 text-diamond-red bg-diamond-white rounded-full p-0.5"
                    aria-hidden="true"
                  />
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <CtaButton href="#estimate" variant="red">
                {hero.primaryCta}
              </CtaButton>
              <CtaButton href={company.phoneHref} variant="outlineLight">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call {company.phoneDisplay}
              </CtaButton>
            </div>

            <p className="mt-5 flex items-center gap-2 text-sm text-diamond-white/80">
              <MapPin className="h-4 w-4 text-diamond-red" aria-hidden="true" />
              {hero.serviceLine}
            </p>
          </div>

          {/* Right form */}
          <div className="lg:pl-4">
            <RoofingLeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
