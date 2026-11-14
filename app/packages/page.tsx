import type { Metadata } from "next";
import { CustomEventsSection, GoodToKnowSection, PackageComparisonSection, PackagesFaqSection, PackagesSection } from "@/components/sections/PackagesSection";
import { pageMetadata } from "@/lib/metadata";
export const metadata: Metadata = pageMetadata("Packages", "Explore Gokarna boat packages with clear durations and listed inclusions. Prices are available on enquiry.", "/packages");
export default function PackagesPage() { return <div className="inner-page"><section className="page-hero"><div className="container"><p className="eyebrow">Choose your journey</p><h1>Gokarna boat packages</h1><p>Explore each trip’s duration and inclusions, then enquire directly with us.</p></div></section><PackagesSection /><PackageComparisonSection /><CustomEventsSection /><GoodToKnowSection /><PackagesFaqSection /></div>; }
