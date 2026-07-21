import type { Metadata } from "next";
import { company } from "@/content/site";
import UtilityBar from "@/components/UtilityBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FinancingBanner from "@/components/FinancingBanner";
import TrustBar from "@/components/TrustBar";
import TrustPillars from "@/components/TrustPillars";
import ServicesGrid from "@/components/ServicesGrid";
import FinancingSection from "@/components/FinancingSection";
import ProjectGallery from "@/components/ProjectGallery";
import DiamondDifference from "@/components/DiamondDifference";
import ProcessSteps from "@/components/ProcessSteps";
import Reviews from "@/components/Reviews";
import GoogleReviewBar from "@/components/GoogleReviewBar";
import ServiceArea from "@/components/ServiceArea";
import StormCTA from "@/components/StormCTA";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import MobileConversionBar from "@/components/MobileConversionBar";

const title = "Roofing Contractor in Chicago | Diamond Home Service";
const description =
  "Diamond Home Service provides roof replacement, roof repair, storm inspections, written warranties, and flexible financing throughout Chicagoland. Request a free estimate.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description:
      "Roof replacement, repair, storm inspections, written warranties, and flexible financing throughout Chicagoland. Request a free estimate.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

// Structured data — LocalBusiness / RoofingContractor.
// Address verified from diamondhomeservice.com (July 2026). geo and
// openingHours intentionally omitted until verified with the client.
// aggregateRating and review counts intentionally omitted until verified.
const structuredData = {
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  name: company.name,
  description:
    "Roofing contractor serving Chicago and the surrounding metropolitan area. Roof replacement, repair, storm inspections, and financing.",
  telephone: "+1-773-286-5446",
  email: company.email,
  slogan: company.tagline,
  areaServed: "Chicago metropolitan area",
  address: {
    "@type": "PostalAddress",
    streetAddress: "5015 West Lawrence Avenue",
    addressLocality: "Chicago",
    addressRegion: "IL",
    postalCode: "60630",
    addressCountry: "US",
  },
  sameAs: [company.facebookUrl],
};

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-[6px] focus:bg-diamond-red focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <UtilityBar />
      <Header />
      <main id="main-content">
        <Hero />
        <FinancingBanner />
        <TrustBar />
        <TrustPillars />
        <ServicesGrid />
        <FinancingSection />
        <ProjectGallery />
        <DiamondDifference />
        <ProcessSteps />
        <GoogleReviewBar />
        <ServiceArea />
        <Reviews />
        <StormCTA />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <MobileConversionBar />
    </>
  );
}
