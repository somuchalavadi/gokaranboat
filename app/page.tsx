import type { Metadata } from "next";
import { hero, seo } from "@/data/site";
import { pageSummaries } from "@/data/pages";
import { faqJsonLd, jsonLdScript, pageMetadata, touristTripsJsonLd, webPageJsonLd } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { About } from "@/components/sections/About";
import { Packages } from "@/components/sections/Packages";
import { Experiences } from "@/components/sections/Experiences";
import { Boat } from "@/components/sections/Boat";
import { Gallery } from "@/components/sections/Gallery";
import { Book } from "@/components/sections/Book";
import { Events } from "@/components/sections/Events";
import { FaqGoodToKnow } from "@/components/sections/FaqGoodToKnow";

export const metadata: Metadata = pageMetadata({ title: seo.title, description: seo.description, path: "/" });

// Sections render in document order with no <Suspense> boundaries, so the full page is in the initial HTML
// for crawlers that don't run JavaScript.
export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <About />
      <Packages />
      <Experiences />
      <Boat />
      <Gallery />
      <Book />
      <Events />
      <FaqGoodToKnow />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          webPageJsonLd({ path: "/", name: hero.title, description: seo.description, datePublished: pageSummaries.home.datePublished, dateModified: pageSummaries.home.updatedAt, image: `${hero.poster.base}-${hero.poster.width}.webp` }),
        )}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(touristTripsJsonLd())} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(faqJsonLd())} />
    </>
  );
}
