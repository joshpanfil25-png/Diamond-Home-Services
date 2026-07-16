import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { company, footer } from "@/content/site";
import { media } from "@/content/media";

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

export default function Footer() {
  return (
    <footer className="bg-diamond-black text-diamond-white pb-16 lg:pb-0">
      <div className="container-diamond py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
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
              <p className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-diamond-red" aria-hidden="true" />
                {company.hours}
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

          <LinkColumn title="Roofing" links={footer.roofingLinks} />
          <LinkColumn title="Other Services" links={footer.serviceLinks} />
          <LinkColumn title="Company" links={footer.companyLinks} />
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-diamond-white/60">
            © {new Date().getFullYear()} {company.name}. All rights reserved. Illinois Business
            License #: {company.licenseNumber}
          </p>
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
