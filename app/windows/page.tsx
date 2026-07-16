import type { Metadata } from "next";
import { interiorPages } from "@/content/site";
import { interiorHeroes } from "@/content/media";
import ServicePage from "@/components/ServicePage";

const content = interiorPages.windows;

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
  openGraph: {
    title: content.metaTitle,
    description: content.metaDescription,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function WindowsPage() {
  return (
    <ServicePage
      content={content}
      heroImage={interiorHeroes.windows}
      crossSell={[
        { label: "Siding", to: "/siding", copy: "Pair new windows with fresh vinyl siding." },
        { label: "Roofing", to: "/roofing", copy: "Ask about bundling with your roof project." },
        { label: "Gutters", to: "/gutters", copy: "Complete the exterior with seamless gutters." },
      ]}
    />
  );
}
