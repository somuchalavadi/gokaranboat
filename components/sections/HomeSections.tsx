import Link from "next/link";
import { ArrowUpRight, Compass, MapPinned, ImageOff } from "lucide-react";
import { Media } from "@/components/ui/Media";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExperienceGrid } from "@/components/sections/ExperienceGrid";
import { whatsappEnquiry } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { GalleryWall } from "@/components/sections/GalleryWall";

export function Hero() {
  return <section className="hero">
    <div className="hero-photo"><Media slot="hero" priority /></div>
    <div className="hero-shade" aria-hidden="true" />
    <div className="hero-frame" aria-hidden="true" />
    <div className="container hero-content">
      <Reveal className="hero-copy-block">
        <p className="eyebrow hero-eyebrow">Gokarna, Karnataka</p>
        <h1>See Gokarna<br />from the water.</h1>
        <p className="hero-copy">Boat adventures, water activities and unhurried coastal moments from Gokarna Beach.</p>
        <div className="hero-actions hero-enquiry-rail"><Link className="hero-secondary-link" href="/adventures">Explore adventures <ArrowUpRight size={16} /></Link><a className="button button-glass" href={whatsappEnquiry("a Gokarna boat experience")} target="_blank" rel="noreferrer">Enquire on WhatsApp <ArrowUpRight size={17} /></a></div>
      </Reveal>
      <div className="hero-location glass-dark"><MapPinned size={18} /><div><small>Pick-up point</small><strong>Gokarna Beach, Gokarna, Karnataka</strong></div><Link href="/contact" aria-label="Contact for directions"><ArrowUpRight size={18} /></Link></div>
    </div>
  </section>;
}

export function Intro() { return <section className="section intro-section"><div className="container intro-layout"><p className="eyebrow">A different view of the coast</p><div><h2>Time on the water, made personal.</h2><p>Set out from Gokarna Beach for a relaxed boat experience shaped around the coast, your group and the time you have.</p><Link href="/about" className="text-link">Meet the Rudra Gokarna <ArrowUpRight size={16} /></Link></div></div></section>; }

export function ExperiencesSection() { return <section className="section experiences-section"><div className="container"><SectionHeading eyebrow="On the water" title="Choose your way to explore" copy="From a boat tour to kayaking and time among the mangroves, enquire about the experience that fits your day." /><ExperienceGrid limit={6} /><div className="section-more"><Link href="/adventures" className="text-link">See all adventures <ArrowUpRight size={16} /></Link></div></div></section>; }

export function BoatFeature() { return <section className="boat-feature"><div className="boat-photo"><Media slot="boatFeature" /></div><div className="boat-overlay" aria-hidden="true" /><div className="container boat-content"><div className="boat-panel glass-dark"><p className="eyebrow">Your boat for the journey</p><h2>The Rudra Gokarna</h2><p>A closer look at the vessel that carries your Gokarna experience.</p><Link className="button button-light" href="/about">Discover the boat <ArrowUpRight size={16} /></Link></div></div></section>; }

export function PackagesTeaser() { return <section className="section packages-teaser"><div className="container packages-teaser-inner"><div><p className="eyebrow">Choose your journey</p><h2>Five ways to spend time on the water.</h2><p>Compare durations and inclusions, then enquire about the package that fits your day.</p></div><Link className="text-link" href="/packages">View packages <ArrowUpRight size={16} /></Link></div></section>; }

export function ExploreSection() {
  const entries = [
    ["01", "Gokarna sightseeing", "See the coastline from the water."],
    ["02", "Lighthouse", "A listed stop on the Premium experience."],
    ["03", "Mystery cave", "Explore a distinctive coastal stop."],
    ["04", "Fishing harbour", "Take in the working harbour on a selected trip."],
    ["05", "Sea & river joining point", "Follow the meeting point of two waters."],
    ["06", "Mangrove views", "Choose River Trips for a quieter landscape."],
  ] as const;
  return <section className="section explore-section"><div className="container"><SectionHeading eyebrow="Along the Gokarna coast" title="Places to discover" copy="These places are listed as part of selected Rudra Gokarna experiences. Ask us what is included in your package." /><div className="place-list">{entries.map(([number, title, copy]) => <article className="place-item" key={title}><div className="place-visual photo-placeholder" role="img" aria-label={`Photo not available for ${title}`}><ImageOff size={18} /><span>Photo not available</span></div><div className="place-item-copy"><span className="place-number">{number}</span><Compass size={18} aria-hidden="true" /><div><h3>{title}</h3><p>{copy}</p></div></div></article>)}</div></div></section>;
}

export function GalleryPreview() { return <section className="section gallery-section"><div className="container"><div className="gallery-head"><SectionHeading eyebrow="Scenes from Gokarna" title="A closer look at the boat" copy="Browse photographs of the Rudra Gokarna boat and open any image for a closer view." /><Link href="/gallery" className="text-link">View gallery <ArrowUpRight size={16} /></Link></div><GalleryWall preview /></div></section>; }
