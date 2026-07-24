import { Quote, Star } from "lucide-react";
import { googleBusinessProfileUrl, reviews } from "@/content/site";
import CtaButton from "@/components/CtaButton";

export default function Reviews() {
  return (
    <section id="reviews" className="bg-diamond-warm">
      <div className="container-diamond py-16 lg:py-20">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="diamond-mark" aria-hidden="true" />
            <span className="text-sm font-bold uppercase tracking-widest text-diamond-red">
              Customer Reviews
            </span>
          </div>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-diamond-charcoal">
            {reviews.headline}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Verified reviews from {reviews.source}.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {reviews.items.map((review, i) => (
            <figure
              key={i}
              className="flex flex-col rounded-[8px] border border-diamond-border bg-diamond-white p-6"
            >
              <Quote className="h-7 w-7 text-diamond-red/30" aria-hidden="true" />
              {review.rating && (
                <div
                  className="mt-3 flex gap-0.5"
                  role="img"
                  aria-label={`${review.rating} out of 5 stars`}
                >
                  {Array.from({ length: review.rating }).map((_, s) => (
                    <Star
                      key={s}
                      className="h-4 w-4 fill-diamond-red text-diamond-red"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              )}
              <blockquote className="mt-3 flex-1 text-diamond-charcoal/85">
                {review.text}
              </blockquote>
              <figcaption className="mt-5 border-t border-diamond-border pt-4">
                <p className="font-bold text-diamond-charcoal">
                  {review.name}
                  {review.city ? `, ${review.city}` : ""}
                </p>
                <p className="text-sm text-muted-foreground">
                  {review.projectType} · {review.source}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-8">
          <CtaButton
            href={googleBusinessProfileUrl}
            variant="outline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read More Customer Reviews
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
