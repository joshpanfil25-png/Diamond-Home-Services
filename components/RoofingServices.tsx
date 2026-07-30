import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { roofingServices } from "@/content/media";

export default function RoofingServices() {
  const { headline, featured, supporting } = roofingServices;
  return (
    <section id="roofing" className="bg-diamond-white scroll-mt-32">
      <div className="container-diamond py-16 lg:py-20">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="diamond-mark" aria-hidden="true" />
            <span className="text-sm font-bold uppercase tracking-widest text-diamond-red">
              Roofing Services
            </span>
          </div>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-diamond-charcoal">
            {headline}
          </h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Featured card */}
          <a
            href="#estimate"
            className="group relative flex flex-col overflow-hidden rounded-[8px] border border-diamond-border bg-diamond-charcoal min-h-[420px] lg:row-span-2 lg:min-h-full focus-visible:outline-none"
          >
            <Image
              src={featured.image.src}
              alt={featured.image.alt}
              width={featured.image.width}
              height={featured.image.height}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-diamond-black/90 via-diamond-black/40 to-transparent"
              aria-hidden="true"
            />
            <div className="relative mt-auto p-6 sm:p-8 text-diamond-white">
              <span className="inline-block rounded-[4px] bg-diamond-red px-3 py-1 text-xs font-bold uppercase tracking-wide">
                Most Popular
              </span>
              <h3 className="mt-3 font-display text-2xl sm:text-3xl font-extrabold">
                {featured.title}
              </h3>
              <p className="mt-2 max-w-md text-diamond-white/85">{featured.copy}</p>
              <span className="mt-4 inline-flex items-center gap-2 font-semibold text-diamond-white group-hover:text-diamond-red transition-colors">
                {featured.linkLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>
          </a>

          {/* Supporting cards */}
          {supporting.map((svc) => (
            <a
              key={svc.title}
              href={svc.title.includes("Storm") ? "#storm" : "#estimate"}
              className="group flex overflow-hidden rounded-[8px] border border-diamond-border bg-diamond-white transition-colors hover:border-diamond-red focus-visible:outline-none"
            >
              <div className="relative w-32 sm:w-40 shrink-0 overflow-hidden">
                <Image
                  src={svc.image.src}
                  alt={svc.image.alt}
                  width={svc.image.width}
                  height={svc.image.height}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
                />
              </div>
              <div className="flex flex-col p-4 sm:p-5">
                <h3 className="text-lg font-bold text-diamond-charcoal">{svc.title}</h3>
                <p className="mt-1.5 text-sm text-diamond-charcoal/75">{svc.copy}</p>
                <span className="mt-auto pt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-diamond-red">
                  {svc.linkLabel}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
