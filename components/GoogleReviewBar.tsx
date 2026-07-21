import Image from "next/image";
import { Quote, Star, StarHalf } from "lucide-react";
import {
  googleFeaturedQuote,
  googleRating,
  googleReviewCount,
} from "@/content/site";
import { media } from "@/content/media";

function GoogleG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}

export default function GoogleReviewBar() {
  return (
    <section
      aria-label="Google reviews"
      className="relative overflow-hidden bg-diamond-black text-diamond-white"
    >
      {/* House photo bleeding in from the right on desktop */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 lg:block">
        <Image
          src={media.heroRoof.src}
          alt=""
          width={media.heroRoof.width}
          height={media.heroRoof.height}
          className="h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-diamond-black via-diamond-black/70 to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="container-diamond relative py-8 lg:py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
          {/* Rating */}
          <div className="flex items-center gap-4 md:pr-8">
            <GoogleG className="h-9 w-9 shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-3xl font-extrabold">
                  {googleRating.toFixed(1)}
                </span>
                <span className="flex items-center" aria-hidden="true">
                  {[0, 1, 2, 3].map((i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-diamond-red text-diamond-red"
                    />
                  ))}
                  <StarHalf className="h-4 w-4 fill-diamond-red text-diamond-red" />
                </span>
              </div>
              <p className="mt-0.5 text-sm text-diamond-white/70">
                {googleReviewCount} Google Reviews
              </p>
            </div>
          </div>

          {/* Divider */}
          <span
            className="hidden h-16 w-px bg-white/20 md:block"
            aria-hidden="true"
          />

          {/* Featured quote */}
          <figure className="relative max-w-2xl">
            <Quote
              className="absolute -left-1 -top-2 h-8 w-8 text-diamond-red/40"
              aria-hidden="true"
            />
            <blockquote className="relative pl-8 text-base text-diamond-white/90 sm:text-lg">
              {googleFeaturedQuote.text}
            </blockquote>
            <figcaption className="mt-2 pl-8 text-sm font-bold">
              — {googleFeaturedQuote.name}, {googleFeaturedQuote.location}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
