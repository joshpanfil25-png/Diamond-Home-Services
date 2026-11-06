// ---------------------------------------------------------------------------
// content/media.ts — images + image-driven section content, mirroring the
// Lovable reference (_lovable-reference/src/content/media.ts).
//
// All jpgs are REAL photos from the original project. Twelve additional
// "site" photos (project gallery, interior heroes, window/siding close-ups)
// still live on the Lovable CDN — see diamond-assets/FOLLOWUP-PROMPT.md §3.
// Until fetched, the fallbacks below are used where a site photo belongs.
// ---------------------------------------------------------------------------

export type MediaAsset = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export const media = {
  // Real logo pulled from diamondhomeservice.com (Squarespace CDN), trimmed.
  // width/height are the file's TRUE intrinsic dimensions.
  logo: {
    src: "/images/diamond-logo.png",
    width: 1500,
    height: 571,
    alt: "Diamond Home Service logo",
  },
  heroRoof: {
    src: "/images/hero-roof.jpg",
    width: 1600,
    height: 1104,
    alt: "Classic Chicago brick bungalow with a new charcoal shingle roof",
  },
  roofReplacement: {
    src: "/images/roof-replacement.jpg",
    width: 1200,
    height: 912,
    alt: "Roof replacement in progress on a Chicago home with new architectural shingles",
  },
  roofRepair: {
    // Fallback for the Lovable CDN photo site-roof-gable.jpg (§3)
    src: "/images/roof-repair.jpg",
    width: 928,
    height: 720,
    alt: "Close-up of asphalt shingle roof repair with new shingles and flashing",
  },
  stormDamage: {
    src: "/images/storm-damage.jpg",
    width: 928,
    height: 720,
    alt: "Residential roof showing storm and hail damage to shingles",
  },
  shingleLowSlope: {
    // Fallback for the Lovable CDN photo site-brick-roof.jpg (§3)
    src: "/images/shingle-lowslope.jpg",
    width: 928,
    height: 720,
    alt: "Low-slope membrane roof section meeting a sloped shingle roof",
  },
  project1: {
    // Fallback for site-bungalow-row.jpg (§3)
    src: "/images/project-1.jpg",
    width: 960,
    height: 688,
    alt: "Chicago two-story home with a new dark gray shingle roof",
  },
  project2: {
    // Fallback for site-brick-roof.jpg (§3)
    src: "/images/project-2.jpg",
    width: 960,
    height: 688,
    alt: "Suburban ranch home with a new brown shingle roof and matching gutters",
  },
  project3: {
    // Fallback for site-shingle-dormers.jpg (§3)
    src: "/images/project-3.jpg",
    width: 960,
    height: 688,
    alt: "Chicago brick two-flat with a new charcoal shingle roof",
  },
  serviceWindows: {
    // Fallback for site-bay-window.jpg (§3)
    src: "/images/service-windows.jpg",
    width: 944,
    height: 704,
    alt: "New white double-hung vinyl windows on a brick home",
  },
  serviceSiding: {
    // Fallback for site-blue-siding.jpg (§3)
    src: "/images/service-siding.jpg",
    width: 944,
    height: 704,
    alt: "New light gray vinyl siding on a suburban home",
  },
  serviceGutters: {
    // Fallback for site-gutters-sky.jpg (§3)
    src: "/images/service-gutters.jpg",
    width: 944,
    height: 704,
    alt: "New white seamless gutters and downspout on a residential roof edge",
  },
  serviceOther: {
    // Fallback for site-soffit.jpg (§3)
    src: "/images/service-other.jpg",
    width: 944,
    height: 704,
    alt: "Home exterior improvement with new siding, soffit and entry",
  },
} as const satisfies Record<string, MediaAsset>;

export type MediaKey = keyof typeof media;

// Accreditation & payment badges (client-supplied, July 2026). Backgrounds
// flattened to white so they sit cleanly on light badge cards.
export const paymentBadge: MediaAsset = {
  src: "/images/badge-payments.png",
  width: 800,
  height: 144,
  alt: "We accept Visa, Mastercard, Discover, and American Express",
};

// Certification badges shown in the TrustBar certifications row. BBB links to
// the verified live profile; Lead-Safe stays a text chip until a clean image
// is supplied.
export const certifications = {
  bbb: {
    src: "/images/badge-bbb.png",
    width: 400,
    height: 320,
    alt: "Better Business Bureau Accredited Business — A+ rating",
    href: "https://www.bbb.org/chicago/business-reviews/construction-and-remodeling-services/diamond-home-service-co-in-chicago-il-4163",
  },
  energyStar: {
    src: "/images/badge-energy-star.png",
    width: 1280,
    height: 1310,
    alt: "ENERGY STAR certified",
  },
  leadSafeLabel: "Lead-Safe Certified",
};

// Five-card "Our Services" grid (client-approved copy, verbatim).
export const homeServices = {
  headline: "Our Services",
  lead: "Complete exterior solutions to protect and enhance your home.",
  featured: {
    title: "Roofing",
    copy: "Roof replacement, repairs, storm damage and inspections.",
    image: media.roofReplacement,
    href: "/roofing",
    icon: "home",
    badge: "Most Popular",
  },
  items: [
    {
      title: "Windows",
      copy: "Energy-efficient windows that improve comfort and lower energy bills.",
      image: media.serviceWindows,
      href: "/windows",
      icon: "window",
    },
    {
      title: "Siding",
      copy: "Beautify and protect with durable, low-maintenance siding options.",
      image: media.serviceSiding,
      href: "/siding",
      icon: "layers",
    },
    {
      title: "Gutters",
      copy: "Seamless gutters and downspouts that protect your home.",
      image: media.serviceGutters,
      href: "/gutters",
      icon: "droplet",
    },
    {
      // Round 4: replaced "Bathrooms & More" — anchors to the projects section.
      title: "Recent Projects",
      copy: "See our latest roofing, window, siding, and gutter projects across Chicagoland.",
      image: media.serviceOther,
      href: "/#projects",
      icon: "images",
    },
  ],
};

export const heroImage = media.heroRoof;

// Interior page heroes — §3 fallbacks until the Lovable CDN site photos are
// fetched (reference used: shingleDormers / kitchenWindow / blueSiding /
// guttersSky).
export const interiorHeroes: Record<
  "roofing" | "windows" | "siding" | "gutters",
  MediaAsset
> = {
  roofing: {
    ...media.roofReplacement,
    alt: "Newly installed architectural asphalt shingle roof with multiple dormers",
  },
  windows: {
    ...media.serviceWindows,
    alt: "New white vinyl replacement windows over a kitchen sink with sunny view",
  },
  siding: {
    ...media.serviceSiding,
    alt: "Two-story home with fresh blue vinyl siding, shutters, and trim",
  },
  gutters: {
    ...media.serviceGutters,
    alt: "White seamless gutters and downspout against a clear blue sky",
  },
};

export const roofingServices = {
  headline: "Complete Roofing Services for Chicagoland Homes",
  featured: {
    title: "Roof Replacement",
    copy: "A full roof replacement using dependable materials and proven installation methods. We remove the old roof, protect your home, and finish with a thorough cleanup.",
    image: media.roofReplacement,
    linkLabel: "Learn about roof replacement",
  },
  supporting: [
    {
      title: "Roof Repair",
      copy: "Targeted repairs for leaks, missing shingles, and flashing issues to extend the life of your roof.",
      image: media.roofRepair,
      linkLabel: "Explore roof repair",
    },
    {
      title: "Storm Damage & Inspections",
      copy: "Professional inspections after hail and wind, with clear documentation of what we find.",
      image: media.stormDamage,
      linkLabel: "Request an inspection",
    },
    {
      title: "Shingle & Low-Slope Roofing",
      copy: "Asphalt shingle and low-slope roofing systems matched to your home and budget.",
      image: media.shingleLowSlope,
      linkLabel: "See roofing options",
    },
  ],
};

export const projects = {
  headline: "Recent Projects Across Chicagoland",
  items: [
    {
      image: media.project1,
      area: "Chicago",
      type: "Roof Replacement",
      result: "Full tear-off and new architectural shingle installation.",
    },
    {
      image: media.serviceSiding,
      area: "West Suburbs",
      type: "Siding Replacement",
      result: "Fresh vinyl siding that won't warp, peel, or need painting.",
    },
    {
      image: media.serviceWindows,
      area: "Chicago",
      type: "Window Installation",
      result: "Energy-efficient replacement windows for lower utility bills.",
    },
    {
      image: media.project2,
      area: "South Suburbs",
      type: "Roof Replacement & Gutters",
      result: "New shingle roof paired with seamless gutters.",
    },
    {
      image: media.serviceGutters,
      area: "North & NW Suburbs",
      type: "Seamless Gutters",
      result: "Custom-formed gutters and downspouts to protect the foundation.",
    },
    {
      image: media.project3,
      area: "West Suburbs",
      type: "Roof Replacement",
      result: "Durable charcoal shingles on a classic brick two-flat.",
    },
  ],
};

export const secondaryServices = {
  headline: "More Ways We Help Improve Your Home",
  items: [
    {
      title: "Windows",
      copy: "Clean, custom-crafted replacement windows built for Chicago weather.",
      image: media.serviceWindows,
      href: "/windows",
    },
    {
      title: "Siding",
      copy: "Durable vinyl siding that won't warp, peel, or need painting.",
      image: media.serviceSiding,
      href: "/siding",
    },
    {
      title: "Gutters & Downspouts",
      copy: "Seamless gutters and downspouts that protect your roof and foundation.",
      image: media.serviceGutters,
      href: "/gutters",
    },
    {
      title: "Other Home Improvements",
      copy: "Soffit, fascia, and exterior improvements to round out your project.",
      image: media.serviceOther,
      href: "/#estimate",
    },
  ],
};

// ---------------------------------------------------------------------------
// Round 5 (11/5): section photos for /roofing and /windows. Keyed by section
// title (see content/site.ts). Only real project photos already in the repo.
// `zoom` / `origin` crop into a photo with CSS (scale + transform-origin) so a
// single real photo can serve two sections until the Lovable CDN site photos
// listed in the header of this file are fetched.
// ---------------------------------------------------------------------------
export type SectionPhoto = MediaAsset & {
  zoom?: number;
  /** CSS transform-origin, e.g. "40% 30%". */
  origin?: string;
};

export const sectionPhotos: Record<"roofing" | "windows", Record<string, SectionPhoto>> = {
  roofing: {
    "Shingle Roofing": {
      // [CLIENT: swap photo] closest real shingle photo (site-shingle-dormers.jpg not fetched yet)
      ...media.project1,
      alt: "Chicago brick home with a newly installed dark architectural asphalt shingle roof and dormers",
    },
    "Rubber & Low-Slope Roofing": {
      ...media.shingleLowSlope,
      alt: "Black rubber membrane low-slope roof meeting a sloped asphalt shingle roof",
    },
    "Roof Replacement & Repair": {
      // [CLIENT: swap photo] repair close-up; roof-replacement.jpg is already the page hero
      ...media.roofRepair,
      alt: "Close-up of asphalt shingles and metal flashing at a chimney after a roof repair",
    },
  },
  windows: {
    "Slider Window": {
      // [CLIENT: swap photo] no dedicated slider photo in repo; crop of the horizontal window in service-other.jpg
      ...media.serviceOther,
      zoom: 2.1,
      origin: "75% 72%",
      alt: "New white horizontal slider window on a split-level home with blue vinyl siding",
    },
    "Double-Hung Window": {
      ...media.serviceWindows,
      alt: "New white double-hung vinyl windows set in a red brick wall with a stone sill",
    },
    "Bay Window": {
      // [CLIENT: swap photo] crop of project-3.jpg until site-bay-window.jpg is fetched
      ...media.project3,
      zoom: 1.7,
      origin: "40% 30%",
      alt: "White vinyl bay window on the front of a Chicago brick two-flat",
    },
    "Glass Block Windows": {
      // [CLIENT: swap photo] crop of project-3.jpg until site-glass-block.jpg is fetched
      ...media.project3,
      zoom: 2.3,
      origin: "46% 96%",
      alt: "Glass block basement windows set into a brick foundation",
    },
  },
};
