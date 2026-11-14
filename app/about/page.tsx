import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Media } from "@/components/ui/Media";
import { whatsappEnquiry } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("About the boat", "Meet The Rudra Gokarna boat and discover coastal boat experiences from Gokarna Beach.", "/about");

export default function AboutPage() { return <div className="inner-page"><section className="page-hero"><div className="container"><p className="eyebrow">About the boat</p><h1>Meet The Rudra Gokarna</h1><p>A boat experience built around the water, the people you bring and the places you want to see from Gokarna.</p></div></section><section className="section about-story"><div className="container about-grid"><div className="about-media about-media-tall"><Media slot="boat" /></div><div className="about-copy"><p className="eyebrow">The boat</p><h2>Navy and white, made for the coast</h2><p>The Rudra Gokarna has a navy and white hull with gold lines, an open upper deck and a covered cabin with windows. Trips depart from Gokarna Beach.</p><p>Choose a listed package or enquire about a Customised Event for your group.</p><div className="hero-actions"><a className="button button-dark" href={whatsappEnquiry("The Rudra Gokarna boat")} target="_blank" rel="noreferrer">Enquire <ArrowUpRight size={16} /></a><Link className="text-link" href="/packages">View packages</Link></div></div></div></section><section className="about-gallery"><div className="container about-gallery-grid"><div><p className="eyebrow">From Gokarna Beach</p><h2>See the coast from the deck</h2><p>Explore the boat photographs, then get in touch to plan your time aboard.</p><Link className="text-link" href="/gallery">View gallery <ArrowUpRight size={16} /></Link></div><div className="about-media"><Media slot="boatFeature" /></div></div></section></div>; }
