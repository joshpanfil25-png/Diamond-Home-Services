import type { Metadata } from "next";
import { interiorPages } from "@/content/site";
import { interiorHeroes, sectionPhotos } from "@/content/media";
import ServicePage from "@/components/ServicePage";
import TrustPillars from "@/components/TrustPillars";

const content = interiorPages.roofing;

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
  alternates: { canonical: "/roofing" },
  openGraph: {
    title: content.metaTitle,
    description: content.metaDescription,
    type: "website",
    url: "/roofing",
  },
  twitter: { card: "summary_large_image" },
};

export default function RoofingPage() {
  return (
    <ServicePage
      content={content}
      heroImage={interiorHeroes.roofing}
      sectionPhotos={sectionPhotos.roofing}
      afterHero={<TrustPillars />}
      crossSell={[
        { label: "Gutters & Downspouts", to: "/gutters", copy: "Bundle new seamless gutters with your roof." },
        { label: "Windows", to: "/windows", copy: "Custom vinyl replacement windows built for Chicago." },
        { label: "Siding", to: "/siding", copy: "Refresh siding, soffit, and fascia at the same time." },
      ]}
    />
  );
}
