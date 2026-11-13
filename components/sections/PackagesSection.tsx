"use client";

import { Anchor, ArrowRight, Clock3, Fish, Leaf, Minus, Plus, Sparkles, Waves } from "lucide-react";
import { useState } from "react";
import { packages, customExperiences } from "@/lib/packages";
import { packageWhatsapp, whatsappEnquiry } from "@/lib/site";
import { Media } from "@/components/ui/Media";

const icons = [Anchor, Sparkles, Fish, Leaf] as const;

function PackageVisual({ index, featured }: { index: number; featured?: boolean }) {
  if (featured) return <div className="package-visual"><Media slot="boatFeature" /></div>;
  const Icon = icons[index] ?? Waves;
  return <div className="package-visual package-visual-fallback" aria-hidden="true"><Icon size={44} strokeWidth={1.4} /><span>Rudra Gokarna</span></div>;
}

function PackageCard({ item, index }: { item: (typeof packages)[number]; index: number }) {
  const [guests, setGuests] = useState(4);
  const duration = item.duration.replace(" hours", " hrs");
  return <article id={`package-${item.name.toLowerCase().replace(/\s+/g, "-")}`} className={`package-card ${item.featured ? "package-card-featured" : ""}`}>
    {item.featured && <span className="featured-ribbon">Featured</span>}
    <PackageVisual index={index} featured={item.featured} />
    <div className="package-card-body"><div className="package-card-top"><span className="duration-pill"><Clock3 size={15} />{duration}</span><span className="package-number" aria-hidden="true">0{index + 1}</span></div><h3>{item.name}</h3><ol className="itinerary">{item.inclusions.map((inclusion) => <li key={inclusion}><span className="timeline-dot" aria-hidden="true" />{inclusion}</li>)}</ol><div className="package-card-footer"><div className="guest-control"><span className="planner-label">Guests</span><div className="stepper"><button type="button" aria-label={`Remove guest from ${item.name}`} onClick={() => setGuests((value) => Math.max(1, value - 1))}><Minus size={15} /></button><strong>{guests}</strong><button type="button" aria-label={`Add guest to ${item.name}`} onClick={() => setGuests((value) => Math.min(20, value + 1))}><Plus size={15} /></button></div></div><a className="button button-gold package-cta" href={packageWhatsapp(item.name, item.duration, guests)} target="_blank" rel="noreferrer">Enquire on WhatsApp <ArrowRight size={16} /></a></div></div>
  </article>;
}

export function PackagesSection() {
  return <section className="packages-section" id="packages"><div className="container"><div className="packages-heading"><div><p className="eyebrow eyebrow-light">Choose your time</p><h2>Pick your time on the water</h2><p>Prices on enquiry. Tell us your group size and date.</p></div><span className="packages-note">All trips are planned by enquiry</span></div><div className="package-grid">{packages.map((item, index) => <PackageCard key={item.name} item={item} index={index} />)}</div><article className="custom-card"><div><p className="eyebrow eyebrow-light">Made around your plans</p><h3>Customised Events</h3><p>{customExperiences.join(" · ")}</p></div><a className="button button-gold" href={whatsappEnquiry("Customised Events")} target="_blank" rel="noreferrer">Enquire on WhatsApp <ArrowRight size={16} /></a></article></div></section>;
}
