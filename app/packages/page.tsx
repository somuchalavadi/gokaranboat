import type { Metadata } from "next";
import { PackagesSection } from "@/components/sections/PackagesSection";
export const metadata: Metadata = { title: "Packages", description: "Explore Gokarna boat tour packages with clear durations and listed inclusions. Prices are available on enquiry.", alternates: { canonical: "/packages" } };
export default function PackagesPage() { return <div className="inner-page"><section className="page-hero"><div className="container"><p className="eyebrow">Choose your journey</p><h1>Gokarna boat packages</h1><p>Explore each trip’s duration and inclusions, then enquire directly with us.</p></div></section><PackagesSection /></div>; }
