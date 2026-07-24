"use client";

import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";
import { serviceArea } from "@/content/site";

// Leaflet touches `window` at import time, so the map is client-only:
// dynamic({ ssr: false }) from inside this Client Component keeps the page
// statically built while the map hydrates in the browser.
const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[#dcecf7] text-sm font-semibold text-diamond-charcoal/60">
      Loading map…
    </div>
  ),
});

export default function ServiceAreaMap() {
  return (
    <div>
      {/* isolate keeps Leaflet's internal z-indexes from escaping over the
          sticky site header. */}
      <div className="relative isolate aspect-[4/3] w-full overflow-hidden rounded-[10px] border border-diamond-border">
        <LeafletMap />

        {/* Floating card — overlaid on desktop only */}
        <div className="pointer-events-none absolute bottom-4 right-4 z-[500] hidden max-w-[220px] rounded-[8px] bg-diamond-white p-4 shadow-md lg:block">
          <MapPin className="h-5 w-5 text-diamond-red" aria-hidden="true" />
          <p className="mt-2 text-sm font-bold text-diamond-charcoal">
            {serviceArea.card.title}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{serviceArea.card.copy}</p>
        </div>
      </div>

      {/* Same card below the map on smaller screens */}
      <div className="mt-4 rounded-[8px] border border-diamond-border bg-diamond-white p-4 lg:hidden">
        <p className="flex items-center gap-2 text-sm font-bold text-diamond-charcoal">
          <MapPin className="h-5 w-5 shrink-0 text-diamond-red" aria-hidden="true" />
          {serviceArea.card.title}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{serviceArea.card.copy}</p>
      </div>
    </div>
  );
}
