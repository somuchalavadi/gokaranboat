import type { Metadata } from "next";
import { ExperienceGrid } from "@/components/sections/ExperienceGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
export const metadata: Metadata = { title: "Adventures", description: "Explore boat adventures, water activities, sightseeing and special experiences in Gokarna.", alternates: { canonical: "/adventures" } };
export default function AdventuresPage() { return <div className="inner-page"><section className="page-hero"><div className="container"><p className="eyebrow">Explore Gokarna</p><h1>Adventures on the water and along the coast</h1><p>Choose an experience and get in touch to ask about your trip.</p></div></section><section className="section"><div className="container"><SectionHeading title="All experiences" copy="Activities shown here are available as part of selected packages or by enquiry." /><ExperienceGrid /></div></section></div>; }
