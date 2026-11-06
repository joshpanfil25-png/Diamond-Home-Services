import type { Metadata } from "next";
import { interiorPages } from "@/content/site";
import { interiorHeroes } from "@/content/media";
import ServicePage from "@/components/ServicePage";

const content = interiorPages.siding;

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
  alternates: { canonical: "/siding" },
  openGraph: {
    title: content.metaTitle,
    description: content.metaDescription,
    type: "website",
    url: "/siding",
  },
  twitter: { card: "summary_large_image" },
};

export default function SidingPage() {
  return (
    <ServicePage
      content={content}
      heroImage={interiorHeroes.siding}
      crossSell={[
        { label: "Windows", to: "/windows", copy: "Refresh windows and siding as one project." },
        { label: "Gutters", to: "/gutters", copy: "New gutters and downspouts to match your trim." },
        { label: "Roofing", to: "/roofing", copy: "Tie the whole exterior together with a new roof." },
      ]}
    />
  );
}
