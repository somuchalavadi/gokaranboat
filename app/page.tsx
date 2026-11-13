import type { Metadata } from "next";
import { Hero, Intro, ExperiencesSection, BoatFeature, ExploreSection, GalleryPreview } from "@/components/sections/HomeSections";
import { PackagesSection } from "@/components/sections/PackagesSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { whatsappUrl } from "@/lib/site";
export const metadata: Metadata = { title: "Boat Adventures in Gokarna", description: "Discover Gokarna beyond the shore with boat tours, kayaking, dolphin watching and coastal experiences.", alternates: { canonical: "/" } };
export default function Home() { return <><Hero /><Intro /><ExperiencesSection /><BoatFeature /><PackagesSection /><ExploreSection /><GalleryPreview /><section className="occasion-cta"><div className="container occasion-inner"><div><p className="eyebrow">Your plans, your pace</p><h2>Make room for a special day.</h2><p>Ask about couple packages, family experiences, New Year celebrations and other special occasions.</p></div><a className="button button-light" href={whatsappUrl("Hello, I would like to plan a customised Gokarna experience.")} target="_blank" rel="noreferrer">Plan Your Experience</a></div></section><ContactSection /></>; }
