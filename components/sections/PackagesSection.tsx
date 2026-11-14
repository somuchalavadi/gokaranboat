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
  const [guests, setGuests] = useState(4);
  const [hours] = durationParts(item.duration);
  const bar = Number(hours) === 4 ? 100 : Number(hours) === 3 ? 75 : 50;
  return <article id={`package-${item.shortName.toLowerCase().replace(/\s+/g, "-")}`} className={`package-plan-card ${item.featured ? "package-plan-featured" : index === 2 ? "package-plan-dark" : ""}`}>
    <div className="package-plan-copy">{item.featured && <span className="glass-chip">Featured</span>}<div className="duration-display"><strong>{hours}</strong><span>hours</span></div><div className="time-bar" aria-hidden="true"><i style={{ width: `${bar}%` }} /></div><h3>{item.name}</h3><p className="price-line">{priceLine(item.price)}{item.featured && " · nine listed stops"}</p><ol className="route-list">{item.inclusions.map((stop) => <li key={stop}><span aria-hidden="true" />{stop}</li>)}</ol><div className="package-enquiry-row"><div className="guest-control"><span className="package-label">Guests</span><div className="stepper"><button type="button" aria-label={`Remove guest from ${item.name}`} onClick={() => setGuests((value) => Math.max(1, value - 1))}><Minus size={15} /></button><strong>{guests}</strong><button type="button" aria-label={`Add guest to ${item.name}`} onClick={() => setGuests((value) => value + 1)}><Plus size={15} /></button></div></div><a className="button button-light" href={packageWhatsapp(item.name, item.duration, guests)} target="_blank" rel="noreferrer">Enquire <ArrowRight size={15} /></a></div></div>{item.featured && <div className="package-plan-image"><Image src="/images/boat/boatside.webp" alt="Side design render of The Rudra Gokarna boat" fill sizes="(max-width: 860px) 100vw, 45vw" /><span className="render-label">Design render</span></div>}</article>;
}

function PackageComparison() {
  const label = (value: string) => value.replace("Sightseeing around Gokarna", "Gokarna sightseeing").replace("Mystery cave exploration", "Mystery cave");
  return <section className="comparison"><h2>Compare what each trip lists</h2><p>Only the activities listed for each package are shown.</p><div className="comparison-scroll"><table><caption className="sr-only">Activities listed for each package</caption><thead><tr><th scope="col">Activity</th>{packages.map((item) => <th scope="col" key={item.name} className={item.featured ? "is-premium" : ""}>{item.shortName}<small>{item.duration}</small></th>)}</tr></thead><tbody>{comparisonRows.map((row) => <tr key={row}><th scope="row">{label(row)}</th>{packages.map((item) => <td className={item.featured ? "is-premium" : ""} key={item.name}>{(item.inclusions as readonly string[]).includes(row) ? <span aria-label="Listed">✓</span> : <span className="not-listed" aria-label="Not listed">–</span>}</td>)}</tr>)}</tbody></table></div></section>;
}

export function PackagesSection({ compact = false }: { compact?: boolean }) {
  return <section className={`packages-section ${compact ? "packages-section-compact" : ""}`} id="packages"><div className="container"><div className="packages-heading"><div><p className="eyebrow">Choose your time on the water</p><h2>Choose your time on the water</h2><p>Four listed trips, each shown by its length and the stops it covers. Prices are shared when you enquire.</p></div></div><div className="package-plan-grid">{packages.map((item, index) => <PackageCard key={item.name} item={item} index={index} />)}</div>{!compact && <><PackageComparison /><section className="custom-band"><div><h3>Customised Events</h3><p>Tell us what you have in mind and we will plan around it.</p><ul>{customExperiences.map((item) => <li key={item}>{item.replace("Customised family experiences", "Families").replace("Other special occasions", "Special occasions")}</li>)}</ul></div><a className="button button-dark" href={whatsappEnquiry("a customised Gokarna experience")} target="_blank" rel="noreferrer">Plan your experience <ArrowRight size={15} /></a></section><section className="good-to-know"><h2>Good to know</h2><p>Trips run subject to sea and weather conditions.</p><p>Wildlife sightings can’t be promised.</p><p>Tell us about children, non-swimmers or health needs when you enquire.</p>{confirmed.lifeJacketsProvided && <p>Life jackets are provided.</p>}{confirmed.safetyBriefing && <p>A safety briefing is included.</p>}<p>{confirmed.seasonMonths ? `Running months: ${confirmed.seasonMonths.join(", ")}.` : "Ask us which dates are running."}</p></section><section className="faq-section"><h2>Questions before you enquire</h2><Accordion limit={4} /></section></>}</div></section>;
}
