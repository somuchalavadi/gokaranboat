import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GalleryWall } from "@/components/sections/GalleryWall";
import { PackagePlanner } from "@/components/sections/PackagePlanner";
import { CustomEventsSection, GoodToKnowSection, PackagesFaqSection } from "@/components/sections/PackagesSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { VideoGallery } from "@/components/sections/VideoGallery";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Remaining pre-redesign sections. Replaced and deleted in phase 4.
export function GalleryPreview() { return <section className="gallery-section"><div className="container"><div className="gallery-head"><SectionHeading eyebrow="Gallery" title="Photographs of The Rudra Gokarna" copy="Photographs of the Rudra Gokarna on the Gokarna coast." /><Link href="/gallery" className="text-link">View gallery <ArrowRight size={16} /></Link></div><GalleryWall preview /></div></section>; }

export function HomeContent() { return <><PackagePlanner /><GalleryPreview /><VideoGallery /><CustomEventsSection /><GoodToKnowSection /><PackagesFaqSection /><ContactSection /></>; }
