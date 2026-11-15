import type { Metadata } from "next";
import { HomeContent } from "@/components/sections/HomeSections";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Packages } from "@/components/sections/Packages";
import { Experiences } from "@/components/sections/Experiences";
import { Boat } from "@/components/sections/Boat";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Gokarna boat adventures", "Boat rides, water activities and coastal exploration from Gokarna Beach with Rudra Gokarna Adventures.", "/");

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Packages />
      <Experiences />
      <Boat />
      <HomeContent />
    </>
  );
}
