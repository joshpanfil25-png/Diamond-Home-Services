import Image from "next/image";
import Link from "next/link";
import {
  AppWindow,
  ArrowRight,
  Droplets,
  Home,
  Images,
  Layers,
} from "lucide-react";
import { homeServices } from "@/content/media";

const iconMap = {
  home: Home,
  droplet: Droplets,
  layers: Layers,
  window: AppWindow,
  images: Images,
} as const;

export default function ServicesGrid() {
  const { headline, lead, featured, items } = homeServices;
  const FeaturedIcon = iconMap[featured.icon as keyof typeof iconMap];

  return (
    <section id="services" className="bg-diamond-white scroll-mt-32">
      <div className="container-diamond py-16 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-diamond-charcoal">
            {headline}
          </h2>
          <span
            className="mx-auto mt-3 block h-1 w-12 rounded-full bg-diamond-red"
            aria-hidden="true"
          />
          <p className="mt-4 text-muted-foreground">{lead}</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-4">
          {/* Featured: Roofing */}
          <Link
            href={featured.href}
            className="group relative flex min-h-[380px] flex-col overflow-hidden rounded-[8px] border-2 border-diamond-red bg-diamond-charcoal lg:col-span-2 lg:row-span-2 lg:min-h-full focus-visible:outline-none"
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
            <span className="absolute left-4 top-4 inline-block rounded-[4px] bg-diamond-red px-3 py-1 text-xs font-bold uppercase tracking-wide text-diamond-white">
              {featured.badge}
            </span>
            <div className="relative mt-auto p-6 sm:p-8 text-diamond-white">
              <FeaturedIcon className="h-7 w-7 text-diamond-white" aria-hidden="true" />
              <h3 className="mt-3 font-display text-2xl sm:text-3xl font-extrabold">
                {featured.title}
              </h3>
              <p className="mt-2 max-w-md text-diamond-white/85">{featured.copy}</p>
              <span className="mt-4 inline-flex items-center gap-2 font-semibold text-diamond-white group-hover:text-diamond-red transition-colors">
                Learn More
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>
          </Link>

          {/* Other services */}
          {items.map((svc) => {
            const Icon = iconMap[svc.icon as keyof typeof iconMap];
            const cardClass =
              "group flex flex-col overflow-hidden rounded-[8px] border border-diamond-border bg-diamond-white transition-colors hover:border-diamond-red focus-visible:outline-none";
            // Same-page hash links use a plain <a> so the browser scrolls to the anchor.
            const Card = svc.href.startsWith("/#") ? "a" : Link;
            return (
              <Card key={svc.title} href={svc.href} className={cardClass}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={svc.image.src}
                    alt={svc.image.alt}
                    width={svc.image.width}
                    height={svc.image.height}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-diamond-red" aria-hidden="true" />
                    <h3 className="text-lg font-bold text-diamond-charcoal">
                      {svc.title}
                    </h3>
                  </div>
                  <p className="mt-1.5 text-sm text-diamond-charcoal/75">{svc.copy}</p>
                  <span className="mt-auto pt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-diamond-red">
                    Learn More
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
