import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { secondaryServices } from "@/content/media";

export default function SecondaryServices() {
  return (
    <section id="more-services" className="bg-diamond-warm scroll-mt-20">
      <div className="container-diamond py-16 lg:py-20">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="diamond-mark" aria-hidden="true" />
            <span className="text-sm font-bold uppercase tracking-widest text-diamond-red">
              Additional Services
            </span>
          </div>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-diamond-charcoal">
            {secondaryServices.headline}
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {secondaryServices.items.map((svc) => {
            const inner = (
              <>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={svc.image.src}
                    alt={svc.image.alt}
                    width={svc.image.width}
                    height={svc.image.height}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-bold text-diamond-charcoal">{svc.title}</h3>
                  <p className="mt-1.5 text-sm text-diamond-charcoal/75">{svc.copy}</p>
                  <span className="mt-auto pt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-diamond-red">
                    Learn more
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </>
            );
            const cardClass =
              "group flex flex-col overflow-hidden rounded-[8px] border border-diamond-border bg-diamond-white transition-colors hover:border-diamond-red focus-visible:outline-none";
            // Interior pages exist in this rebuild, so the Windows/Siding/Gutters
            // cards link there (reference linked all cards to #estimate).
            return svc.href.startsWith("/#") ? (
              <a key={svc.title} href={svc.href} className={cardClass}>
                {inner}
              </a>
            ) : (
              <Link key={svc.title} href={svc.href} className={cardClass}>
                {inner}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
