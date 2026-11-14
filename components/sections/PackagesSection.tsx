"use client";

import Image from "next/image";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { comparisonRows, customExperiences, packages } from "@/lib/packages";
import { confirmed } from "@/lib/confirm";
import { packageWhatsapp, whatsappEnquiry } from "@/lib/site";
import { Accordion } from "@/components/ui/Accordion";

function durationParts(duration: string) { return duration.split(" "); }
function priceLine(price: number | null) { return price === null ? "Price on enquiry" : `From ₹${price} per person · Final price confirmed on enquiry`; }

function PackageCard({ item, index }: { item: (typeof packages)[number]; index: number }) {
  const [guests, setGuests] = useState<number | null>(null);
  const [hours] = durationParts(item.duration);
  const bar = Number(hours) === 4 ? 100 : Number(hours) === 3 ? 75 : 50;
  return <article id={`package-${item.shortName.toLowerCase().replace(/\s+/g, "-")}`} className={`package-plan-card ${item.featured ? "package-plan-featured" : index === 2 ? "package-plan-dark" : ""}`}>
    <div className="package-plan-copy"><div className="package-card-image"><Image src={item.image} alt={`Representative coastal image for ${item.name}`} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 380px" /></div>{item.featured && <span className="glass-chip">Featured</span>}<div className="duration-display"><strong>{hours}</strong><span>hours</span></div><div className="time-bar" aria-hidden="true"><i style={{ width: `${bar}%` }} /></div><h3>{item.name}</h3><p className="price-line">{priceLine(item.price)}{item.featured && " · nine stops"}</p><ol className="route-list">{item.inclusions.map((stop) => <li key={stop}><span aria-hidden="true" />{stop}</li>)}</ol><div className="package-enquiry-row"><div className="guest-control"><span className="package-label">Guests</span><div className="stepper"><button type="button" aria-label={`Remove guest from ${item.name}`} onClick={() => setGuests((value) => value === null ? null : Math.max(1, value - 1))}><Minus size={15} /></button><strong aria-live="polite">{guests ?? "—"}</strong><button type="button" aria-label={`Add guest to ${item.name}`} onClick={() => setGuests((value) => value === null ? 1 : value + 1)}><Plus size={15} /></button></div></div><a className="button button-light" href={packageWhatsapp(item.name, item.duration, guests)} target="_blank" rel="noreferrer">Enquire <ArrowRight size={15} /></a></div></div></article>;
}

export function PackagesSection({ compact = false }: { compact?: boolean }) {
  return <section className={`packages-section ${compact ? "packages-section-compact" : ""}`} id="packages"><div className="container"><div className="packages-heading"><div><h2>Choose your time on the water</h2><p>Four trips, each shown by its length and route. Prices are shared when you enquire.</p></div></div><div className="package-plan-grid">{packages.map((item, index) => <PackageCard key={item.name} item={item} index={index} />)}</div></div></section>;
}

export function PackageComparisonSection() {
  return <section className="comparison detail-section"><div className="container"><h2>Compare what each trip lists</h2><p>Only the activities listed for each package are shown.</p><div className="comparison-scroll"><table><caption className="sr-only">Activities listed for each package</caption><thead><tr><th scope="col">Activity</th>{packages.map((item) => <th scope="col" key={item.name} className={item.featured ? "is-premium" : ""}>{item.shortName}<small>{item.duration}</small></th>)}</tr></thead><tbody>{comparisonRows.map((row) => <tr key={row}><th scope="row">{row}</th>{packages.map((item) => <td className={item.featured ? "is-premium" : ""} key={item.name}>{(item.inclusions as readonly string[]).includes(row) ? <span aria-label="Listed">✓</span> : <span className="not-listed" aria-label="Not listed">–</span>}</td>)}</tr>)}</tbody></table></div></div></section>;
}

export function CustomEventsSection() { return <section className="detail-section custom-events-section"><div className="container"><div className="custom-band"><div><h2>Customised Events</h2><p>Tell us what you have in mind and we will plan around it.</p><ul>{customExperiences.map((item) => <li key={item}>{item}</li>)}</ul><a className="text-link" href="/new-year">New Year and occasions <ArrowRight size={15} /></a></div><a className="button button-dark" href={whatsappEnquiry("a customised Gokarna experience")} target="_blank" rel="noreferrer">Plan your experience <ArrowRight size={15} /></a></div></div></section>; }

export function GoodToKnowSection() { return <section className="detail-section good-to-know-section"><div className="container"><div className="good-to-know"><h2>Good to know</h2><p>Trips run subject to sea and weather conditions.</p><p>Wildlife sightings can’t be promised.</p><p>Tell us about children, non-swimmers or health needs when you enquire.</p>{confirmed.lifeJacketsProvided && <p>Life jackets are provided.</p>}{confirmed.safetyBriefing && <p>A safety briefing is included.</p>}<p>{confirmed.seasonMonths ? `Running months: ${confirmed.seasonMonths.join(", ")}.` : "Ask us which dates are running."}</p></div></div></section>; }

export function PackagesFaqSection() { return <section className="faq-section detail-section"><div className="container"><h2>Questions before you enquire</h2><Accordion limit={4} /></div></section>; }
