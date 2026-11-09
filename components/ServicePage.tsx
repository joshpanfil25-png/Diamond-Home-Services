import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Phone, ShieldCheck } from "lucide-react";
import { company, type ServicePageContent } from "@/content/site";
import type { MediaAsset, SectionPhoto } from "@/content/media";
import UtilityBar from "@/components/UtilityBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileConversionBar from "@/components/MobileConversionBar";
import CtaButton from "@/components/CtaButton";

export type CrossSellItem = { label: string; to: string; copy: string };

type ServicePageProps = {
  content: ServicePageContent;
  heroImage: MediaAsset;
  crossSell: CrossSellItem[];
  /** Optional section rendered directly after the hero (Round 4: TrustPillars on /roofing). */
  afterHero?: ReactNode;
  /** Round 5: optional photo per section, keyed by section title. Rendered as a compact card grid (Round 6). */
  sectionPhotos?: Record<string, SectionPhoto>;
  /** Round 6: optional block rendered after the section grid (financing + video on /windows). */
  afterSections?: ReactNode;
};

export default function ServicePage({ content, heroImage, crossSell, afterHero, sectionPhotos, afterSections }: ServicePageProps) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-[6px] focus:bg-diamond-red focus:px-4 focus:py-2 focus:text-diamond-white"
      >
        Skip to content
      </a>
      <UtilityBar />
      <Header />

      <main id="main-content">
        {/* Hero */}
        <section className="relative isolate overflow-hidden bg-diamond-charcoal">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            width={heroImage.width}
            height={heroImage.height}
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            preload
          />
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-r from-diamond-black/90 via-diamond-black/70 to-diamond-black/40"
            aria-hidden="true"
          />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-diamond-red" aria-hidden="true" />

          <div className="container-diamond relative py-16 lg:py-24">
            <nav aria-label="Breadcrumb" className="text-xs text-diamond-white/70">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Link href="/" className="hover:text-diamond-white">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-diamond-white">{content.eyebrow}</li>
              </ol>
            </nav>
            <p className="mt-6 inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-diamond-white/90">
              <span className="diamond-mark" aria-hidden="true" />
              {content.eyebrow}
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] text-diamond-white">
              {content.h1}
            </h1>
            <p className="mt-5 max-w-2xl text-base sm:text-lg text-diamond-white/85">
              {content.intro}
            </p>

            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {content.heroBullets.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm font-semibold text-diamond-white">
                  <Check
                    className="h-4 w-4 text-diamond-red bg-diamond-white rounded-full p-0.5"
                    aria-hidden="true"
                  />
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <CtaButton href="/#estimate" variant="red">
                Get a Free {content.eyebrow.split("•")[0].trim()} Estimate
              </CtaButton>
              <CtaButton href={company.phoneHref} variant="outlineLight">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call {company.phoneDisplay}
              </CtaButton>
            </div>
          </div>
        </section>

        {afterHero}

        {/* Section blocks */}
        <section className="bg-diamond-white">
          <div className="container-diamond py-16 lg:py-20">
            <div
              className={
                sectionPhotos
                  ? `grid gap-8 sm:grid-cols-2 ${content.sections.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`
                  : "grid gap-12 lg:gap-16"
              }
            >
              {content.sections.map((s) => {
                const photo = sectionPhotos?.[s.title];
                // Round 4: larger diamond sits LEFT of the heading on the
                // same line (was stacked above it).
                const heading = (
                  <div className="flex items-center gap-3">
                    <span className="diamond-mark diamond-mark-lg shrink-0" aria-hidden="true" />
                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-diamond-charcoal">
                      {s.title}
                    </h2>
                  </div>
                );
                const body = (
                  <div>
                    <p className="text-lg text-diamond-charcoal/85">{s.copy}</p>
                    {s.bullets && (
                      <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                        {s.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2 text-sm text-diamond-charcoal">
                            <Check
                              className="mt-0.5 h-4 w-4 text-diamond-red shrink-0"
                              aria-hidden="true"
                            />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {s.note && (
                      <p className="mt-5 rounded-[6px] border border-diamond-border bg-diamond-warm p-4 text-sm text-muted-foreground">
                        {s.note}
                      </p>
                    )}
                  </div>
                );

                // No photo (/siding, /gutters): original heading-left layout.
                if (!photo) {
                  return (
                    <article
                      key={s.title}
                      id={s.id}
                      className="grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:gap-12 scroll-mt-32"
                    >
                      {heading}
                      {body}
                    </article>
                  );
                }

                // Round 6: compact card (photo on top, then diamond + heading,
                // copy, single-column bullets). Replaces the Round 5 tall rows.
                return (
                  <article
                    key={s.title}
                    id={s.id}
                    className="flex flex-col scroll-mt-32"
                  >
                    <div
                      className="overflow-hidden rounded-[8px] bg-diamond-warm"
                      style={{ aspectRatio: "4 / 3" }}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        width={photo.width}
                        height={photo.height}
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                        className="h-full w-full object-cover"
                        style={
                          photo.zoom
                            ? {
                                transform: `scale(${photo.zoom})`,
                                transformOrigin: photo.origin ?? "center",
                              }
                            : undefined
                        }
                      />
                    </div>
                    <div className="mt-4 flex items-center gap-2.5">
                      <span className="diamond-mark shrink-0" aria-hidden="true" />
                      <h2 className="font-display text-xl font-extrabold text-diamond-charcoal">
                        {s.title}
                      </h2>
                    </div>
                    <p className="mt-2 text-base text-diamond-charcoal/85">{s.copy}</p>
                    {s.bullets && (
                      <ul className="mt-4 grid gap-2">
                        {s.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2 text-sm text-diamond-charcoal">
                            <Check
                              className="mt-0.5 h-4 w-4 text-diamond-red shrink-0"
                              aria-hidden="true"
                            />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {s.note && (
                      <p className="mt-4 rounded-[6px] border border-diamond-border bg-diamond-warm p-3 text-sm text-muted-foreground">
                        {s.note}
                      </p>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {afterSections}

        {/* Benefits / features */}
        <section className="bg-diamond-warm border-y border-diamond-border">
          <div className="container-diamond py-16 lg:py-20">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="diamond-mark" aria-hidden="true" />
                <span className="text-sm font-bold uppercase tracking-widest text-diamond-red">
                  The Diamond Standard
                </span>
              </div>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-diamond-charcoal">
                {content.featuresHeadline}
              </h2>
              {content.featuresLead && (
                <p className="mt-4 text-lg text-diamond-charcoal/80">{content.featuresLead}</p>
              )}
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {content.features.map((f) => (
                <div
                  key={f.title}
                  className="rounded-[8px] border border-diamond-border bg-diamond-white p-6"
                >
                  <ShieldCheck className="h-6 w-6 text-diamond-red" aria-hidden="true" />
                  <h3 className="mt-3 text-lg font-bold text-diamond-charcoal">{f.title}</h3>
                  <p className="mt-1.5 text-sm text-diamond-charcoal/75">{f.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cross-sell */}
        {crossSell.length > 0 && (
          <section className="bg-diamond-white">
            <div className="container-diamond py-16 lg:py-20">
              <div className="flex items-end justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="diamond-mark" aria-hidden="true" />
                    <span className="text-sm font-bold uppercase tracking-widest text-diamond-red">
                      Also from Diamond
                    </span>
                  </div>
                  <h2 className="mt-3 font-display text-2xl sm:text-3xl font-extrabold text-diamond-charcoal">
                    Explore more services
                  </h2>
                </div>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {crossSell.map((c) => (
                  <Link
                    key={c.to}
                    href={c.to}
                    className="group flex items-start justify-between gap-3 rounded-[8px] border border-diamond-border bg-diamond-white p-5 transition-colors hover:border-diamond-red"
                  >
                    <div>
                      <h3 className="text-base font-bold text-diamond-charcoal">{c.label}</h3>
                      <p className="mt-1 text-sm text-diamond-charcoal/70">{c.copy}</p>
                    </div>
                    <ArrowRight
                      className="mt-1 h-4 w-4 shrink-0 text-diamond-red transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="bg-diamond-red text-diamond-white">
          <div className="container-diamond py-16 lg:py-20 text-center">
            <div className="flex items-center justify-center gap-3">
              <span
                className="diamond-mark diamond-mark-lg shrink-0"
                style={{ background: "#ffffff" }}
                aria-hidden="true"
              />
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold">
                {content.ctaHeadline}
              </h2>
            </div>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-diamond-white/90">
              {content.ctaCopy}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <CtaButton href="/#estimate" variant="charcoal">
                Get a Free Estimate
              </CtaButton>
              <CtaButton href={company.phoneHref} variant="outlineLight">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call {company.phoneDisplay}
              </CtaButton>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileConversionBar />
    </>
  );
}
