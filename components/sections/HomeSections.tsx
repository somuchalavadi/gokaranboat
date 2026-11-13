import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Media } from "@/components/ui/Media";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExperienceGrid } from "@/components/sections/ExperienceGrid";
import { whatsappUrl } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { GalleryWall } from "@/components/sections/GalleryWall";
import { coastalDestinations } from "@/lib/destinations";
export function Hero() {
  return <section className="hero">
    <div className="hero-photo"><Media slot="hero" priority /></div>
    <div className="hero-shade" />
    <div className="hero-frame" aria-hidden="true" />
    <div className="container hero-content">
      <Reveal className="hero-copy-block">
        <p className="eyebrow hero-eyebrow">Gokarna, Karnataka</p>
        <h1>Discover Gokarna<br />Beyond the Shore</h1>
        <p className="hero-copy">Explore the coastline, discover hidden experiences and experience the beauty of Gokarna through unforgettable boat adventures.</p>
        <div className="hero-actions hero-enquiry-rail">
          <span>Plan your coastal escape</span>
          <Link className="button button-light" href="/adventures">Explore Adventures <ArrowDown size={17} /></Link>
          <a className="button button-glass" href={whatsappUrl("Hello, I would like to book a boat experience in Gokarna.")} target="_blank" rel="noreferrer">Book Your Experience <ArrowUpRight size={17} /></a>
        </div>
      </Reveal>
      <div className="hero-location glass-dark"><span className="location-pin" /><div><small>Pick-up point</small><strong>Gokarna Beach, Gokarna, Karnataka</strong></div><Link href="/contact" aria-label="Contact for directions"><ArrowUpRight size={18} /></Link></div>
    </div>
  </section>;
}
export function Intro() { return <section className="section intro-section"><div className="container intro-layout"><p className="eyebrow">A different view of the coast</p><div><h2>Where Every Journey Becomes an Adventure</h2><p>Set out from Gokarna Beach to explore the coastline, take in local sights and enjoy water activities. Choose a listed package or ask us about a customised experience.</p><Link href="/about" className="text-link">Get to know us <ArrowUpRight size={16} /></Link></div></div></section>; }
export function ExperiencesSection() { return <section className="section experiences-section"><div className="container"><Reveal><SectionHeading eyebrow="Out on the water" title="Find your kind of adventure" copy="From a coastal boat tour to kayaking among mangroves, explore the experiences on offer in Gokarna." /><ExperienceGrid limit={6} /></Reveal><div className="section-more"><Link href="/adventures" className="text-link">See all adventures <ArrowUpRight size={16} /></Link></div></div></section>; }
export function BoatFeature() { return <section className="boat-feature"><div className="boat-photo"><Media slot="boatFeature" fallbackSlot="boatDesign" /></div><div className="boat-overlay" /><div className="container boat-content"><div className="boat-panel glass-dark"><p className="eyebrow">Your boat for the journey</p><h2>The Rudra Gokarna</h2><p>A boat for coastal exploration and water experiences around Gokarna.</p><ul><li>Navy and white livery with gold lines</li><li>Trident-and-waves emblem</li><li>Open upper deck and covered cabin with wide windows</li></ul><Link className="button button-light" href="/about">Meet the boat <ArrowUpRight size={16} /></Link></div></div></section>; }
export function ExploreSection() { const entries = [{ t: "Coastal landscape", s: "coast" }, { t: "Lighthouse", s: "lighthouse" }, { t: "Mystery cave", s: "cave" }, { t: "Mangroves", s: "mangroves" }, { t: "Fishing harbour", s: "harbour" }, { t: "Sea and river joining point", s: "joiningPoint" }] as const; return <section className="section explore-section"><div className="container"><SectionHeading eyebrow="Along the Gokarna coast" title="Places to discover" copy="Explore the coast, local landmarks and river scenery on selected experiences." /><div className="editorial-grid">{entries.map((x, i) => <article className={`editorial-tile editorial-${i + 1}`} key={x.t}><div className="editorial-media"><Media slot={x.s} /></div><h3>{x.t}</h3></article>)}</div></div></section>; }
export function CoastalGuide() { return <section className="coastal-guide" aria-labelledby="coastal-guide-title"><div className="container"><div className="guide-intro"><div><p className="eyebrow">Coastal Karnataka field notes</p><h2 id="coastal-guide-title">The coast is a story beyond one shoreline.</h2></div><p>These are destination notes for a wider Coastal Karnataka journey. Rudra Gokarna Adventures’ boat experiences operate from Gokarna Beach only.</p></div><div className="destination-rail">{coastalDestinations.map((destination, index) => <article className={`destination-card ${destination.operated ? "destination-featured" : ""}`} key={destination.name}><div className="destination-media"><Media slot={destination.image} /></div><div className="destination-copy"><p><span>{String(index + 1).padStart(2, "0")}</span>{destination.note}</p><h3>{destination.name}</h3><p>{destination.description}</p>{destination.operated && <Link href="/adventures" className="text-link">Explore Gokarna experiences <ArrowUpRight size={16} /></Link>}</div></article>)}</div></div></section>; }
export function GalleryPreview() { return <section className="section gallery-section"><div className="container"><div className="gallery-head"><SectionHeading eyebrow="Scenes from Gokarna" title="A closer look at the coast" copy="Browse a selection of genuine Rudra Gokarna boat photographs from the coast." /><Link href="/gallery" className="text-link">View gallery <ArrowUpRight size={16} /></Link></div><GalleryWall preview /></div></section>; }
