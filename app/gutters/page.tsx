import type { Metadata } from "next";
import { interiorPages } from "@/content/site";
import { interiorHeroes } from "@/content/media";
import ServicePage from "@/components/ServicePage";

const content = interiorPages.gutters;

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
  alternates: { canonical: "/gutters" },
  openGraph: {
    title: content.metaTitle,
    description: content.metaDescription,
    type: "website",
    url: "/gutters",
  },
  twitter: { card: "summary_large_image" },
};

export default function GuttersPage() {
  return (
    <ServicePage
      content={content}
      heroImage={interiorHeroes.gutters}
      crossSell={[
        { label: "Roofing", to: "/roofing", copy: "Bundle gutters with a new roof for a lower total price." },
        { label: "Siding", to: "/siding", copy: "Match your new gutters to fresh siding, soffit, and fascia." },
        { label: "Windows", to: "/windows", copy: "Round out your exterior with replacement windows." },
      ]}
    />
  );
}
