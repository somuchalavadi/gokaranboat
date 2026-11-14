import Link from "next/link";
import { ArrowRight, Compass, Droplets, Fish, MapPin, Waves } from "lucide-react";
import { Media } from "@/components/ui/Media";
import { GalleryWall } from "@/components/sections/GalleryWall";
import { ExperienceGrid } from "@/components/sections/ExperienceGrid";
import { BoatScroll } from "@/components/sections/BoatScroll";
import { PackagePlanner } from "@/components/sections/PackagePlanner";
import { PackagesSection } from "@/components/sections/PackagesSection";
import { PlacesSection } from "@/components/sections/PlacesSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { confirmed } from "@/lib/confirm";
import { whatsappUrl } from "@/lib/site";

export function Hero() {
  return <section className="hero"><div className="hero-photo">{confirmed.heroVideoSrc ? <video className="hero-video" autoPlay muted loop playsInline poster="/images/rudra-hero.jpeg" src={confirmed.heroVideoSrc} /> : <Media slot="hero" priority sizes="100vw" />}</div><div className="hero-shade" aria-hidden="true" /><div className="container hero-content"><Reveal className="hero-copy-block"><p className="eyebrow hero-eyebrow">Gokarna, Karnataka</p><h1>Gokarna, from the deck.</h1><p className="hero-copy">Out on the water with The Rudra Gokarna: coastline, caves, mangroves and open sea, seen the way the shore never shows it.</p><div className="hero-actions"><a className="button button-light" href={whatsappUrl("I would like to book a Gokarna boat experience.")} target="_blank" rel="noreferrer">Book on WhatsApp <ArrowRight size={16} /></a><Link className="button button-outline" href="/adventures">Explore adventures <ArrowRight size={16} /></Link></div></Reveal><div className="hero-location glass-dark"><MapPin size={18} /><div><small>Pick-up point</small><strong>{confirmed.boardingPoint}</strong></div><Link href="/contact" aria-label="Pick-up point and contact details"><ArrowRight size={18} /></Link></div></div></section>;
}

export function Intro() { return <section className="intro-section"><div className="container intro-layout"><div><p className="eyebrow">Out on the Gokarna coast</p><h2>A boat day with room for the coastline to unfold</h2></div><div><p>Rudra Gokarna Adventures brings boat rides, water activities and coastal exploration together from Gokarna Beach. Choose a listed journey or tell us what you want to see.</p><Link href="/about" className="text-link">Meet the boat <ArrowRight size={16} /></Link></div></div></section>; }

export function ExperiencesSection() { return <section className="experiences-section"><div className="container"><SectionHeading eyebrow="Experiences" title="Choose your way to explore" copy="A few ways to spend time on the water, with each activity shown honestly by package." light /><ExperienceGrid limit={6} /><div className="section-more"><Link href="/adventures" className="text-link">See all adventures <ArrowRight size={16} /></Link></div></div></section>; }

export function ActivityStrip() { const items = [{ name: "Kayaking", icon: Waves }, { name: "Snorkelling", icon: Droplets }, { name: "Swimming", icon: Waves }, { name: "Dolphin watching", icon: Fish }, { name: "Sightseeing", icon: Compass }]; return <section className="activity-strip"><div className="container"><div className="activity-strip-head"><p className="eyebrow">More ways to explore</p><Link href="/adventures" className="text-link">See all adventures <ArrowRight size={15} /></Link></div><div className="activity-row">{items.map(({ name, icon: Icon }) => <Link href="/adventures" key={name}><Icon size={20} /><span>{name}</span><ArrowRight size={14} /></Link>)}</div></div></section>; }

export function GalleryPreview() { return <section className="gallery-section"><div className="container"><div className="gallery-head"><SectionHeading eyebrow="Gallery" title="Photographs of The Rudra Gokarna" copy="Photographs of the Rudra Gokarna on the Gokarna coast." /><Link href="/gallery" className="text-link">View gallery <ArrowRight size={16} /></Link></div><GalleryWall preview /></div></section>; }

export function HomeContent() { return <><Hero /><Intro /><ExperiencesSection /><BoatScroll /><PackagesSection /><PlacesSection /><PackagePlanner /><ActivityStrip /><GalleryPreview /><ContactSection /></>; }
