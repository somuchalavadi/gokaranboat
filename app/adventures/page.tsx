import type { Metadata } from "next";
import { ExperienceGrid } from "@/components/sections/ExperienceGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experiences } from "@/lib/experiences";
import { pageMetadata } from "@/lib/metadata";
export const metadata: Metadata = pageMetadata("Adventures", "Explore boat adventures, water activities, sightseeing and special experiences in Gokarna.", "/adventures");
const categories = [
  "Boat trips",
  "Water activities",
  "Sightseeing",
  "Fishing and special experiences",
  "River and mangrove trips",
  "Customised events",
] as const;

export default function AdventuresPage() { return <div className="inner-page"><section className="page-hero"><div className="container"><p className="eyebrow">Explore Gokarna</p><h1>Adventures on the water and along the coast</h1><p>Choose an experience and enquire directly about your trip.</p></div></section><section className="section adventure-categories"><div className="container"><SectionHeading title="Experiences, clearly mapped" copy="Activities shown here are available as part of selected packages or by enquiry." />{categories.map((category, index) => { const items = experiences.filter((experience) => experience.group === category || (category === "Boat trips" && experience.group === "Boat adventures")); return <section className="adventure-category" key={category}><SectionHeading title={category} /><ExperienceGrid items={items} featureFirst={index === 0} /></section>; })}</div></section></div>; }
