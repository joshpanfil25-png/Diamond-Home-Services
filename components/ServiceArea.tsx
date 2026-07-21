import { Check, MapPin } from "lucide-react";
import { serviceArea } from "@/content/site";

// Stylized, license-free service-area map (NOT Google Maps): a soft panel with
// a translucent red coverage radius and a few town labels for context.
function StylizedMap() {
  const labels = [
    { name: "Schaumburg", x: 22, y: 24 },
    { name: "Evanston", x: 74, y: 20 },
    { name: "Chicago", x: 66, y: 46 },
    { name: "Naperville", x: 30, y: 60 },
    { name: "Oak Lawn", x: 58, y: 66 },
    { name: "Tinley Park", x: 46, y: 80 },
    { name: "Joliet", x: 24, y: 86 },
  ];
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[10px] border border-diamond-border bg-[#dcecf7]">
      <svg viewBox="0 0 100 75" className="h-full w-full" aria-hidden="true">
        {/* Abstract roads */}
        <g stroke="#ffffff" strokeWidth="0.8" opacity="0.8" fill="none">
          <path d="M0 30 H100" />
          <path d="M0 52 H100" />
          <path d="M35 0 V75" />
          <path d="M68 0 V75" />
          <path d="M0 15 L100 68" />
        </g>
        {/* Coverage radius */}
        <circle cx="60" cy="42" r="30" fill="#c72127" opacity="0.18" />
        <circle cx="60" cy="42" r="30" fill="none" stroke="#c72127" strokeWidth="0.6" opacity="0.5" />
        <circle cx="60" cy="42" r="2" fill="#c72127" />
      </svg>
      {labels.map((l) => (
        <span
          key={l.name}
          className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] font-semibold text-diamond-charcoal/80 sm:text-xs"
          style={{ left: `${l.x}%`, top: `${l.y}%` }}
        >
          {l.name}
        </span>
      ))}
      {/* Floating card */}
      <div className="absolute bottom-3 right-3 max-w-[200px] rounded-[8px] bg-diamond-white p-4 shadow-md sm:bottom-4 sm:right-4">
        <MapPin className="h-5 w-5 text-diamond-red" aria-hidden="true" />
        <p className="mt-2 text-sm font-bold text-diamond-charcoal">
          {serviceArea.card.title}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{serviceArea.card.copy}</p>
      </div>
    </div>
  );
}

export default function ServiceArea() {
  return (
    <section id="service-area" className="bg-diamond-white scroll-mt-20">
      <div className="container-diamond py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="diamond-mark" aria-hidden="true" />
              <span className="text-sm font-bold uppercase tracking-widest text-diamond-red">
                Service Area
              </span>
            </div>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-diamond-charcoal">
              {serviceArea.headline}
            </h2>
            <p className="mt-3 max-w-md text-muted-foreground">{serviceArea.copy}</p>

            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
              {serviceArea.towns.map((town) => (
                <li key={town} className="flex items-center gap-2">
                  <Check
                    className="h-4 w-4 shrink-0 text-diamond-red"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-semibold text-diamond-charcoal">
                    {town}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <StylizedMap />
        </div>
      </div>
    </section>
  );
}
