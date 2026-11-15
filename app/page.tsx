import type { Metadata } from "next";
import { Suspense } from "react";
import { seo } from "@/data/site";
import { faqJsonLd, jsonLdScript, pageMetadata, touristTripsJsonLd } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Packages } from "@/components/sections/Packages";
import { Experiences } from "@/components/sections/Experiences";
import { Boat } from "@/components/sections/Boat";
import { Gallery } from "@/components/sections/Gallery";
import { Book } from "@/components/sections/Book";
import { Events } from "@/components/sections/Events";
import { FaqGoodToKnow } from "@/components/sections/FaqGoodToKnow";

export const metadata: Metadata = pageMetadata({ title: seo.title, description: seo.description, path: "/" });

export default function Home() {
  // Everything is prerendered, so these boundaries never show a fallback. They let React hydrate each
  // below-the-fold section as its own interruptible task after the hero, instead of one long task.
  return (
    <>
      <Hero />
      <TrustStrip />
      <Suspense>
        <Packages />
      </Suspense>
      <Suspense>
        <Experiences />
      </Suspense>
      <Suspense>
        <Boat />
      </Suspense>
      <Suspense>
        <Gallery />
      </Suspense>
      <Suspense>
        <Book />
      </Suspense>
      <Suspense>
        <Events />
        <FaqGoodToKnow />
      </Suspense>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(touristTripsJsonLd())} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(faqJsonLd())} />
    </>
  );
}
