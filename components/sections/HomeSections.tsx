import Link from "next/link";
import { ArrowRight, Compass, Droplets, Fish, MapPinned, Waves } from "lucide-react";
import { Media } from "@/components/ui/Media";
import { GalleryWall } from "@/components/sections/GalleryWall";
import { PackagePlanner } from "@/components/sections/PackagePlanner";
import { PackagesSection } from "@/components/sections/PackagesSection";
import { PlacesSection } from "@/components/sections/PlacesSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { whatsappEnquiry } from "@/lib/site";

export function Hero() {
  return <section className="hero"><div className="hero-photo"><Media slot="hero" priority sizes="100vw" /></div><div className="hero-shade" aria-hidden="true" /><div className="container hero-content"><Reveal className="hero-copy-block"><p className="eyebrow hero-eyebrow">Gokarna, Karnataka</p><h1>See Gokarna<br />from the water.</h1><p className="hero-copy">Boat adventures, water activities and unhurried coastal moments from Gokarna Beach.</p><div className="hero-actions"><a className="button button-gold" href="#packages">View packages <ArrowRight size={17} /></a><a className="button button-outline" href={whatsappEnquiry("a Gokarna boat experience")} target="_blank" rel="noreferrer">Enquire on WhatsApp</a></div></Reveal><div className="hero-location glass-dark"><MapPinned size={18} /><div><small>Pick-up point</small><strong>Gokarna Beach, Gokarna, Karnataka</strong></div><Link href="/contact" aria-label="Contact for directions"><ArrowRight size={18} /></Link></div></div></section>;
}

export function Intro() { return <section className="intro-section"><div className="container intro-layout"><div><p className="eyebrow">A different view of the coast</p><h2>Time on the water, made personal</h2></div><div><p>Set out from Gokarna Beach for a relaxed boat experience shaped around the coast, your group and the time you have.</p><Link href="/about" className="text-link">Meet the Rudra Gokarna <ArrowRight size={16} /></Link></div></div></section>; }

export function ActivityStrip() { const items = [{ name: "Kayaking", icon: Waves }, { name: "Snorkelling", icon: Droplets }, { name: "Swimming", icon: Waves }, { name: "Dolphin watching", icon: Fish }, { name: "Sightseeing", icon: Compass }]; return <section className="activity-strip"><div className="container"><div className="activity-strip-head"><p className="eyebrow">A little more to explore</p><Link href="/adventures" className="text-link">See all adventures <ArrowRight size={15} /></Link></div><div className="activity-row">{items.map(({ name, icon: Icon }) => <Link href="/adventures" key={name}><Icon size={20} /><span>{name}</span><ArrowRight size={14} /></Link>)}</div></div></section>; }

export function BoatFeature() { return <section className="boat-feature"><div className="boat-photo"><Media slot="boatFeature" /></div><div className="boat-overlay" aria-hidden="true" /><div className="container boat-content"><div className="boat-panel glass-dark"><p className="eyebrow eyebrow-light">Your boat for the journey</p><h2>The Rudra Gokarna</h2><p>A closer look at the vessel that carries your Gokarna experience.</p><Link className="button button-light" href="/about">Discover the boat <ArrowRight size={16} /></Link></div></div></section>; }

export function GalleryPreview() { return <section className="gallery-section"><div className="container"><div className="gallery-head"><SectionHeading eyebrow="Scenes from Gokarna" title="A closer look at the boat" copy="Browse photographs of the Rudra Gokarna boat and open any image for a closer view." /><Link href="/gallery" className="text-link">View gallery <ArrowRight size={16} /></Link></div><GalleryWall preview /></div></section>; }

export function HomeContent() { return <><Hero /><PackagesSection /><Intro /><PlacesSection /><PackagePlanner /><ActivityStrip /><BoatFeature /><GalleryPreview /><section className="final-cta"><div className="container"><p className="eyebrow">Ready when you are</p><h2>Make room for a special day on the coast</h2><p>Ask about Couples, Family experiences, New Year celebrations or another plan shaped around your group.</p><a className="button button-dark" href={whatsappEnquiry("Customised Events")} target="_blank" rel="noreferrer">Enquire on WhatsApp <ArrowRight size={16} /></a></div></section><ContactSection /></>; }
