import { Phone } from "lucide-react";
import { company, utilityBar } from "@/content/site";

export default function UtilityBar() {
  return (
    <div className="bg-diamond-red text-diamond-white text-xs sm:text-sm">
      <div className="container-diamond flex items-center justify-between gap-3 py-2">
        <p className="hidden sm:block font-medium">{utilityBar.left}</p>
        <p className="sm:hidden font-medium">Serving All of Chicagoland</p>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline font-medium">{utilityBar.financing}</span>
          <span className="hidden md:inline h-3 w-px bg-white/40" aria-hidden="true" />
          <a
            href={company.phoneHref}
            className="inline-flex items-center gap-1.5 font-semibold whitespace-nowrap hover:underline"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Call {company.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
