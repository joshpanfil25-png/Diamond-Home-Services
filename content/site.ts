// ---------------------------------------------------------------------------
// Diamond Home Service — centralized editable content.
// Ported verbatim from the Lovable reference (_lovable-reference/src/content/site.ts),
// with verified business info from diamondhomeservice.com (July 2026).
// Items marked [CONFIRM ...] are placeholders awaiting company verification.
// ---------------------------------------------------------------------------

export const company = {
  name: "Diamond Home Service",
  tagline: "Family Owned and Operated for Over 50 Years",
  phoneDisplay: "773-286-5446",
  phoneHref: "tel:+17732865446",
  email: "info@diamondhomeservice.com",
  address: "5015 West Lawrence Avenue, Chicago, IL 60630",
  licenseNumber: "104011376",
  hours: "[CONFIRM HOURS]", // not published on the live site — must come from the client
  yearsInBusiness: "50+",
  facebookUrl:
    "https://www.facebook.com/pages/Diamond-Home-Service/335190816501932",
};

export const utilityBar = {
  left: "Serving Homeowners Throughout Chicagoland",
  financing: "0% Financing Available",
};

export const nav: {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
}[] = [
  {
    label: "Roofing",
    href: "/roofing",
    dropdown: [
      { label: "Roof Replacement", href: "/roofing#roof-replacement" },
      { label: "Shingle Roofing", href: "/roofing#shingles" },
      { label: "Rubber / Flat Roofing", href: "/roofing#rubber" },
      { label: "Storm Damage", href: "/#storm" },
    ],
  },
  { label: "Windows", href: "/windows" },
  { label: "Siding", href: "/siding" },
  { label: "Gutters", href: "/gutters" },
  { label: "Financing", href: "/#financing" },
  { label: "Projects", href: "/#projects" },
  { label: "About", href: "/#difference" },
  { label: "Contact", href: "/#final-cta" },
];

export const hero = {
  eyebrow: "ROOFING • WINDOWS • SIDING • GUTTERS",
  h1: "Chicagoland's Most Trusted Roofing Company",
  supporting:
    "Protect your home with dependable roofing, honest recommendations, written warranties, and 0% financing from a company that has served Chicagoland homeowners for more than 50 years.",
  supportingExtra: "Plus windows, siding, gutters, and complete home improvements.",
  primaryCta: "Get a Free Roofing Estimate",
  serviceLine: "Serving Chicago and the entire metropolitan area",
  trustPoints: [
    "50+ years serving Chicagoland",
    "Written warranties",
    "0% financing available",
  ],
};

export const trustBar = [
  {
    title: "Local Chicagoland Experts",
    note: "Proudly serving Chicago and the surrounding suburbs.",
    icon: "pin",
  },
  {
    title: "Insurance Claim Help",
    note: "We work with your insurance to make it stress-free.",
    icon: "shield",
  },
  {
    title: "Fast Turnaround",
    note: "Efficient scheduling and on-time project completion.",
    icon: "timer",
  },
  {
    title: "Warranty Backed",
    note: "Industry-leading warranties for lasting peace of mind.",
    icon: "badge",
  },
];

// Google review summary — client-confirmed values (update as reviews grow).
export const googleRating = 4.4;
export const googleReviewCount = 129;
export const googleFeaturedQuote = {
  text: "Diamond Home Service did an excellent job on our new roof. The team was professional, on time, and cleaned everything up. Highly recommend!",
  name: "Michael R.",
  location: "Orland Park, IL",
};

export const trustPillars = {
  headline: "Roofing Built on Trust",
  copy: "A roof is more than shingles. It protects your family, your belongings, and the value of your home. Diamond Home Service combines decades of local experience with straightforward recommendations, dependable installation, and financing options designed to make necessary home improvements more manageable.",
  pillars: [
    {
      icon: "handshake",
      title: "Honest Recommendations",
      copy: "Clear explanations and written estimates without unnecessary pressure.",
    },
    {
      icon: "hammer",
      title: "Quality Craftsmanship",
      copy: "Experienced installation using dependable materials and proven methods.",
    },
    {
      icon: "phone-call",
      title: "Service After Installation",
      copy: "A local team homeowners can contact before, during, and after the project.",
    },
  ],
};

export const diamondDifference = {
  headline: "The Diamond Difference",
  points: [
    "More than 50 years serving Chicagoland",
    "Licensed and bonded contractors",
    "Written estimates",
    "Written warranties",
    "Quality products",
    "Clear communication",
    "0% financing options",
    "Free, no-obligation estimates",
  ],
};

export const processSteps = {
  headline: "A Clear Roofing Process from Start to Finish",
  steps: [
    {
      title: "Schedule Your Free Estimate",
      copy: "Reach out by phone or the estimate form and pick a time that works for you.",
    },
    {
      title: "Receive a Clear Recommendation",
      copy: "We inspect your roof and explain your options in plain language.",
    },
    {
      title: "Review Materials and Financing",
      copy: "Choose materials and, if helpful, explore 0% financing options.",
    },
    {
      title: "Professional Installation and Cleanup",
      copy: "Our crew completes the work and leaves your property clean.",
    },
  ],
};

export const serviceArea = {
  headline: "Proudly Serving Chicagoland",
  copy: "From Chicago to the south and west suburbs, we're your local roofing and exterior experts.",
  // Named towns render as real server-side text for local SEO.
  towns: [
    "Chicago",
    "Naperville",
    "Orland Park",
    "Oak Lawn",
    "Tinley Park",
    "Downers Grove",
    "Plainfield",
    "Bolingbrook",
    "And More",
  ],
  card: {
    title: "Local. Reliable. Right Around the Corner.",
    copy: "Wherever you are in the Chicagoland area, we're ready to help.",
  },
};

// Reviews — VERIFIED from uploaded Google review screenshots only.
// Do not add reviews here that are not verified from a real source.
export const reviews = {
  headline: "Trusted by Chicagoland Homeowners",
  source: "Google Reviews",
  items: [
    {
      text: "Well, to begin with Diamond Home Service was very prompt. They were on time each time that they came. They did an excellent job and told us everything step-by-step. They cleaned up the areas they worked in and were very considerate of our property. Overall a great experience — all our questions were addressed.",
      name: "Michele T.",
      city: null,
      projectType: "Roof Replacement",
      source: "Google Review",
      rating: 5,
    },
    {
      text: "They were out within a week with a crew big enough to complete the roof in one day.",
      name: "Naight P.",
      city: null,
      projectType: "Roof Replacement",
      source: "Google Review",
      rating: 5,
    },
    {
      text: "My family has used this company for many years. Interacted with the owner directly for replacing windows today. We have referred many family and friends exclusively to this company. The owner was very professional and compassionate, and the company has been in business for over 50 years. Excellent services as always!",
      name: "Marissa G.",
      city: null,
      projectType: "Windows",
      source: "Google Review",
      rating: 5,
    },
  ],
};

export const faqs = {
  headline: "Frequently Asked Questions",
  note: "Placeholder answers below are for company review before publication.",
  items: [
    {
      q: "How do I know whether I need roof repair or replacement?",
      a: "[FOR REVIEW] A professional inspection is the best way to tell. Localized damage or a relatively new roof often calls for repair, while widespread wear, aging shingles, or repeated leaks may point to replacement. We provide a written recommendation.",
    },
    {
      q: "How long does a typical roof replacement take?",
      a: "[FOR REVIEW] Many residential roof replacements are completed in a single day, though timing depends on the size and complexity of the roof and the weather.",
    },
    {
      q: "Does Diamond Home Service offer financing?",
      a: "[FOR REVIEW] Yes. We offer 0% financing for qualified homeowners. Financing is subject to credit approval and available terms may vary.",
    },
    {
      q: "Do you provide free roofing estimates?",
      a: "[FOR REVIEW] Yes. Estimates are free and come with no obligation.",
    },
    {
      q: "What parts of Chicagoland do you serve?",
      a: "[FOR REVIEW] We serve homeowners throughout Chicago and the surrounding metropolitan area, with extensive experience in the South and West suburbs.",
    },
    {
      q: "Can you inspect a roof after hail or wind damage?",
      a: "[FOR REVIEW] Yes. We provide professional roof inspections to help identify damage that may not be visible from the ground.",
    },
    {
      q: "What roofing materials do you install?",
      a: "[FOR REVIEW] We install a range of dependable roofing materials, including asphalt shingles and low-slope roofing systems. We'll recommend the right option for your home.",
    },
    {
      q: "Are your roofing projects covered by written warranties?",
      a: "[FOR REVIEW] Yes. Our roofing work is backed by written warranties. Specific terms are provided with your estimate.",
    },
  ],
};

export const footer = {
  trustStatement:
    "Family owned and operated for over 50 years, providing dependable roofing and home improvement across Chicagoland.",
  roofingLinks: [
    { label: "Roof Replacement", href: "/roofing#roof-replacement" },
    { label: "Shingle Roofing", href: "/roofing#shingles" },
    { label: "Rubber / Flat Roofing", href: "/roofing#rubber" },
    { label: "Storm Damage", href: "/#storm" },
    { label: "All Roofing Services", href: "/roofing" },
  ],
  serviceLinks: [
    { label: "Windows", href: "/windows" },
    { label: "Siding, Soffit & Fascia", href: "/siding" },
    { label: "Gutters & Downspouts", href: "/gutters" },
    { label: "Home Improvements", href: "/#services" },
  ],
  companyLinks: [
    { label: "Financing", href: "/#financing" },
    { label: "Projects", href: "/#projects" },
    { label: "About", href: "/#difference" },
    { label: "Contact", href: "/#final-cta" },
    { label: "Service Areas", href: "/#service-area" },
  ],
  legalLinks: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Accessibility", href: "#" },
  ],
};

// ---------------------------------------------------------------------------
// Interior service pages. Content adapted from the current diamondhomeservice.com
// site (Roofing, Windows, Siding, Gutters) and re-toned for the modernized brand.
// Marketing claims (warranties, savings percentages) are drawn from the source
// site — verify with the company before publication.
// ---------------------------------------------------------------------------

export interface ServicePageFeature {
  title: string;
  copy: string;
  bullets?: string[];
}

export interface ServicePageContent {
  slug: "roofing" | "windows" | "siding" | "gutters";
  eyebrow: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  heroBullets: string[];
  sections: {
    id?: string;
    title: string;
    copy: string;
    bullets?: string[];
    note?: string;
  }[];
  features: ServicePageFeature[];
  featuresHeadline: string;
  featuresLead?: string;
  benefits?: { title: string; copy: string }[];
  benefitsHeadline?: string;
  ctaHeadline: string;
  ctaCopy: string;
}

export const interiorPages: Record<
  "roofing" | "windows" | "siding" | "gutters",
  ServicePageContent
> = {
  roofing: {
    slug: "roofing",
    eyebrow: "Roofing",
    h1: "Roofing Built to Protect Your Chicago Home",
    metaTitle: "Roofing Contractor in Chicago | Diamond Home Service",
    metaDescription:
      "Affordable shingle and rubber roofing installed by a licensed Chicago contractor. Roof replacement, repair, and storm inspections with written warranties.",
    intro:
      "Diamond Home Service protects your home with affordable shingle and rubber roofing. Shingles are easy to apply and offer long-lasting protection against wind and rain, and they age well — keeping their color and beauty even after years in the Chicago sun.",
    heroBullets: [
      "Licensed and bonded roofers",
      "Written warranties",
      "Free, no-obligation estimates",
    ],
    sections: [
      {
        id: "shingles",
        title: "Shingle Roofing",
        copy: "Traditional three-tab, square-butt asphalt shingles built on an organic base fully saturated with asphalt, coated with a high-quality waterproof asphalt layer, then finished with ceramic granules for a durable, beautiful surface.",
        bullets: [
          "Self-sealing thermoplastic adhesive activated by the sun",
          "Four-nail installation over a solid wood substrate",
          "Galvanized large-head 10–12 gauge barbed shank nails",
          "Available in a wide range of ceramic-coated colors",
        ],
      },
      {
        id: "rubber",
        title: "Rubber & Low-Slope Roofing",
        copy: "For flat and low-slope roofs we install a modified-asphalt rubber roofing membrane. It's lightweight, cost-effective, and holds up to Chicago's freeze-thaw cycles.",
        bullets: [
          "Guarantees available up to 15 years",
          "Smooth surface or granular finish (black or white)",
          "Installed weight under 2 lbs per square foot",
          "Polyester mat core resists splits and tears",
        ],
      },
      {
        id: "roof-replacement",
        title: "Roof Replacement & Repair",
        copy: "From targeted repairs to a full tear-off and replacement, we start with an honest inspection, explain your options in plain language, and provide a written estimate before any work begins.",
        bullets: [
          "Full tear-off and new-roof installation",
          "Targeted repairs for leaks, missing shingles, and flashing",
          "Post-storm hail and wind inspections",
          "Thorough magnet sweep and property cleanup",
        ],
      },
    ],
    featuresHeadline: "Why homeowners choose Diamond for their roof",
    features: [
      {
        title: "Precision",
        copy: "Professional, quality installation by licensed and bonded contractors.",
      },
      {
        title: "Quality",
        copy: "Products approved through rigorous laboratory testing.",
      },
      {
        title: "Craftsmanship",
        copy: "A talented team that treats your home like their own.",
      },
    ],
    ctaHeadline: "Ready for a new roof?",
    ctaCopy:
      "Get a free, no-obligation roofing estimate from a Chicago contractor with more than 50 years of local experience.",
  },
  windows: {
    slug: "windows",
    eyebrow: "Windows",
    h1: "Expert Window Installation for Chicago Homes",
    metaTitle: "Replacement Windows in Chicago | Diamond Home Service",
    metaDescription:
      "Custom-crafted vinyl replacement windows for Chicagoland — slider, double-hung, bay, and glass block. Low-E glass, lifetime warranty, and flexible financing.",
    intro:
      "Replace leaky old windows with custom-crafted vinyl replacements built for Chicago weather. Our customers have reported utility savings of up to 30% after upgrading, and modern tilt-in sashes make cleaning both sides of the window from inside your home simple.",
    heroBullets: [
      "Low-E double-strength glass",
      "Fusion-welded PVC frames",
      "Lifetime warranty on double-hung units",
    ],
    sections: [
      {
        title: "Slider Window",
        copy: "A clean, low-profile slider that opens smoothly on an all-welded PVC frame.",
        bullets: [
          "Low-E glass",
          "Custom sizes",
          "All-welded PVC frame",
          "Resists warping and bowing",
        ],
      },
      {
        title: "Double-Hung Window",
        copy: "Our most popular replacement window, engineered to last and easy to clean from inside.",
        bullets: [
          "Solid vinyl extrusions",
          "Fusion-welded frame",
          "Double-glazed thermal glass system",
          "Tilt-in sashes for easy cleaning",
          "Low-E double-strength glass",
          "Lifetime warranty",
        ],
      },
      {
        title: "Bay Window",
        copy: "A custom-designed bay window brings light and character to any room in the house.",
        bullets: [
          "Custom design and sizing",
          "Deluxe locks",
          "Can be installed almost anywhere",
        ],
      },
      {
        title: "Glass Block Windows",
        copy: "Durable, private glass block windows finished to match your home.",
        bullets: [
          "Custom design and sizing",
          "Resists warping and bowing",
          "Great for basements and bathrooms",
        ],
      },
    ],
    featuresHeadline: "Save energy. Add convenience. Boost curb appeal.",
    featuresLead:
      "Modern replacement windows do more than look good — they make your home more comfortable and more efficient.",
    features: [
      {
        title: "Save Energy",
        copy: "Replacing leaky old windows is one of the fastest ways to cut utility bills. Our customers have reported savings of up to 30% on heating and cooling costs.",
      },
      {
        title: "Convenience",
        copy: "Easy-Tilt construction lets you clean both sides of the window from inside your home. The non-stick vinyl sashes open and close smoothly.",
      },
      {
        title: "Beauty",
        copy: "Slender, clean lines and a custom-crafted look brighten your home, enhance curb appeal, and increase resale value.",
      },
      {
        title: "Comfort",
        copy: "Dual-pane insulated glass, Low-E coatings, interlocking rails, and fin-seal weather-stripping stop drafts and cold in their tracks.",
      },
    ],
    ctaHeadline: "Upgrade your windows this season",
    ctaCopy:
      "Get a free, no-obligation window estimate and see how much you could save on your utility bills.",
  },
  siding: {
    slug: "siding",
    eyebrow: "Siding • Fascia • Soffit",
    h1: "Durable Vinyl Siding, Soffit & Fascia",
    metaTitle: "Vinyl Siding, Soffit & Fascia in Chicago | Diamond Home Service",
    metaDescription:
      "Vinyl siding, soffit, and fascia installed by Diamond Home Service in Chicagoland. Lifetime Limited Warranty, dent- and fade-resistant materials.",
    intro:
      "Superior vinyl construction built from advanced materials that stand firm during severe weather. Durable siding, soffit, and fascia protect your home and end the cycle of peeling, warping, and repainting.",
    heroBullets: [
      "Lifetime Limited Warranty",
      ".040-thick vinyl resists dents and scratches",
      "Never needs painting",
    ],
    sections: [
      {
        title: "Standard Double 4 Siding",
        copy: "Our workhorse vinyl siding profile — clean lines and a broad color palette that complements a wide range of homes.",
      },
      {
        title: "Dutch Lap Siding",
        copy: "A traditional Dutch lap profile that adds depth and shadow lines for a classic, character-rich exterior.",
      },
      {
        title: "Soffit & Fascia",
        copy: "Finish your exterior with matching vinyl soffit and aluminum fascia that protect the eaves and eliminate rot-prone wood.",
      },
    ],
    featuresHeadline: "Built for Chicago weather",
    featuresLead:
      "Diamond Home Service's siding meets or exceeds the requirements of tests supported by the Vinyl Siding Institute, the leading authority in vinyl siding performance.",
    features: [
      {
        title: "Durable Vinyl Construction",
        copy: "Won't warp, peel, or flake like wood, and never needs painting.",
      },
      {
        title: "Dent & Scratch Resistant",
        copy: ".040-thick vinyl stands up to hail, ladders, and daily life.",
      },
      {
        title: "Built-In Color",
        copy: "Color is baked in, so it resists chipping and fading for long-lasting curb appeal.",
      },
      {
        title: "Lifetime Limited Warranty",
        copy: "Backed by a Lifetime Limited Warranty — details provided with your written estimate.",
      },
    ],
    ctaHeadline: "Refresh your home's exterior",
    ctaCopy:
      "Get a free, no-obligation siding estimate and see how much a new exterior can transform your home.",
  },
  gutters: {
    slug: "gutters",
    eyebrow: "Gutters & Downspouts",
    h1: "Seamless Gutters & Downspouts",
    metaTitle: "Seamless Gutters & Downspouts in Chicago | Diamond Home Service",
    metaDescription:
      "Seamless aluminum gutters and downspouts installed by Diamond Home Service in Chicagoland. Protect your roof, siding, and foundation.",
    intro:
      "Gutters are the quiet workhorse of your home's exterior — moving thousands of gallons of water away from your roof, siding, and foundation every year. We install seamless aluminum gutters and downspouts sized and pitched for real Chicago storms.",
    heroBullets: [
      "Seamless aluminum construction",
      "Multiple colors to match your trim",
      "Installed with your roof or as a standalone project",
    ],
    sections: [
      {
        title: "Seamless Aluminum Gutters",
        copy: "Formed on-site to the exact length of each roofline, seamless gutters minimize leaks, drips, and clogs compared to sectional systems.",
        bullets: [
          "Custom-formed on-site to your rooflines",
          '5" and 6" K-style profiles available',
          "Wide range of baked-on colors",
          "Hidden hangers for a clean, uninterrupted look",
        ],
      },
      {
        title: "Downspouts & Extensions",
        copy: "Correctly sized downspouts and splash extensions send water well away from your foundation and landscaping.",
        bullets: [
          "2×3 and 3×4 downspouts sized to your roof area",
          "Elbows, offsets, and splash extensions included",
          "Options for underground drain tie-ins",
        ],
      },
      {
        title: "Repairs & Cleaning",
        copy: "We repair sagging sections, resecure loose hangers, reseal end caps, and clear clogged downspouts to keep your existing gutters working.",
      },
    ],
    featuresHeadline: "Protecting the parts of your home you don't see",
    features: [
      {
        title: "Roof Protection",
        copy: "Properly pitched gutters keep water off fascia boards and out from under shingles, extending the life of your roof.",
      },
      {
        title: "Siding & Foundation",
        copy: "Downspouts routed away from the house prevent staining on siding and reduce the risk of basement seepage.",
      },
      {
        title: "Curb Appeal",
        copy: "Clean, straight lines in a color that matches your trim finish the look of any new roof or siding project.",
      },
    ],
    ctaHeadline: "Ready for gutters that actually keep up?",
    ctaCopy:
      "Get a free, no-obligation gutter estimate — often bundled with a roof replacement for a lower total price.",
  },
};
