import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, ShieldAlert } from "lucide-react";
import { company, footer } from "@/content/site";
import { certifications, media, paymentBadge } from "@/content/media";

// lucide-react no longer ships brand icons — inline SVG instead.
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  const className = "text-sm text-diamond-white/70 hover:text-diamond-white";
  return href.startsWith("/#") || href.startsWith("#") ? (
    <a href={href} className={className}>
      {label}
    </a>
  ) : (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-wide text-diamond-white">{title}</h3>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.label}>
            <FooterLink href={l.href} label={l.label} />
          </li>
        ))}
      </ul>
    </div>
  );
}

// Round 4: hours line + clock removed; ROOFING column removed; OTHER SERVICES
// renamed SERVICES; certification badges (BBB / ENERGY STAR / Lead-Safe)
// moved here from the deleted homepage certifications row.
export default function Footer() {
  return (
    <footer className="bg-diamond-black text-diamond-white pb-16 lg:pb-0">
      <div className="container-diamond py-14">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <span className="inline-block rounded-[6px] bg-diamond-white p-3">
              <Image
                src={media.logo.src}
                alt={media.logo.alt}
                width={media.logo.width}
                height={media.logo.height}
                className="h-12 w-auto"
              />
            </span>
            <p className="mt-4 max-w-sm text-sm text-diamond-white/70">{footer.trustStatement}</p>
            <div className="mt-5 space-y-2 text-sm text-diamond-white/80">
              <a
                href={company.phoneHref}
                className="flex items-center gap-2 hover:text-diamond-white"
              >
                <Phone className="h-4 w-4 text-diamond-red" aria-hidden="true" />
                {company.phoneDisplay}
              </a>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-diamond-red" aria-hidden="true" />
                {company.email}
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-diamond-red mt-0.5" aria-hidden="true" />
                {company.address}
              </p>
            </div>
            <div className="mt-5 flex gap-3">
              <a
                href={company.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Diamond Home Service on Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-[6px] border border-white/20 hover:border-diamond-red hover:text-diamond-red"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              {/* Instagram intentionally omitted — no profile found on the live
                  site; add one here when the client provides it. */}
            </div>
          </div>

          <LinkColumn title="Services" links={footer.serviceLinks} />
          <LinkColumn title="Company" links={footer.companyLinks} />
        </div>

        {/* Certifications — verified badges from the live business profile. */}
        <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-white/10 pt-6 sm:gap-6">
          <span className="text-xs font-semibold uppercase tracking-wide text-diamond-white/60">
            Certifications:
          </span>
          <a
            href={certifications.bbb.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-16 items-center rounded-[6px] bg-diamond-white p-1"
            aria-label="Better Business Bureau A+ rated — view profile"
          >
            <Image
              src={certifications.bbb.src}
              alt={certifications.bbb.alt}
              width={certifications.bbb.width}
              height={certifications.bbb.height}
              className="h-full w-auto object-contain"
            />
          </a>
          <span className="inline-flex h-16 items-center rounded-[6px] bg-diamond-white p-1">
            <Image
              src={certifications.energyStar.src}
              alt={certifications.energyStar.alt}
              width={certifications.energyStar.width}
              height={certifications.energyStar.height}
              className="h-full w-auto object-contain"
            />
          </span>
          <span className="inline-flex h-16 items-center gap-2.5 rounded-[6px] border border-white/20 px-4 text-sm font-semibold text-diamond-white">
            <ShieldAlert className="h-7 w-7 text-diamond-red" aria-hidden="true" />
            {certifications.leadSafeLabel}
          </span>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-diamond-white/60">
            © {new Date().getFullYear()} {company.name}. All rights reserved. Illinois Business
            License #: {company.licenseNumber}
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-diamond-white/50">We accept</span>
            <span className="flex h-11 items-center rounded-[6px] bg-diamond-white px-3">
              <Image
                src={paymentBadge.src}
                alt={paymentBadge.alt}
                width={paymentBadge.width}
                height={paymentBadge.height}
                className="h-6 w-auto"
              />
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-4">
            {footer.legalLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-xs text-diamond-white/60 hover:text-diamond-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
