import type { Metadata } from "next";
import { Hero, Intro, ExperiencesSection, BoatFeature, ExploreSection, GalleryPreview, PackagesTeaser } from "@/components/sections/HomeSections";
import { ContactSection } from "@/components/sections/ContactSection";
import { pageMetadata } from "@/lib/metadata";
import { whatsappEnquiry } from "@/lib/site";
export const metadata: Metadata = pageMetadata("Home", "Discover Gokarna through boat adventures, water activities and coastal experiences.", "/");
export default function Home() { return <><Hero /><Intro /><ExperiencesSection /><BoatFeature /><PackagesTeaser /><ExploreSection /><GalleryPreview /><section className="occasion-cta"><div className="container occasion-inner"><div><p className="eyebrow">Your plans, your pace</p><h2>Make room for a special day.</h2><p>Ask about couple packages, family experiences, New Year celebrations and other special occasions.</p></div><a className="button button-light" href={whatsappEnquiry("Customised Events")} target="_blank" rel="noreferrer">Enquire on WhatsApp</a></div></section><ContactSection /></>; }
