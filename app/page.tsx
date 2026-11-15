import type { Metadata } from "next";
import { seo } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
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
  return (
    <>
      <Hero />
      <TrustStrip />
      <Packages />
      <Experiences />
      <Boat />
      <Gallery />
      <Book />
      <Events />
      <FaqGoodToKnow />
    </>
  );
}
