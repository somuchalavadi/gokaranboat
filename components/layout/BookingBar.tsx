"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { packages } from "@/lib/packages";
import { whatsappUrl } from "@/lib/site";

export function BookingBar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const [experience, setExperience] = useState<string>(packages[0].name);
  const [date, setDate] = useState("");
  const [group, setGroup] = useState("");
  const href = useMemo(() => {
    const details = [`Hello, I would like to enquire about ${experience}.`];
    if (date) details.push(`Date: ${date}.`);
    if (group) details.push(`Guests: ${group}.`);
    return whatsappUrl(details.join(" "));
  }, [experience, date, group]);

  if (pathname === "/contact") return null;
  return <div className={`booking-bar glass-dark ${expanded ? "is-expanded" : ""}`} aria-label="Quick booking">
    <button className="booking-toggle" type="button" aria-expanded={expanded} onClick={() => setExpanded((open) => !open)}><span>Book on WhatsApp</span><ChevronDown size={16} /></button>
    <div className="booking-fields">
      <label><span>Experience</span><select value={experience} onChange={(event) => setExperience(event.target.value)}>{packages.map((item) => <option key={item.name}>{item.name}</option>)}<option>Customised Events</option></select></label>
      <label><span>Date</span><input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label>
      <label><span>Guests</span><input min="1" type="number" value={group} placeholder="Optional" aria-live="polite" onChange={(event) => setGroup(event.target.value)} /></label>
    </div>
    <a className="button button-light" href={href} target="_blank" rel="noreferrer">Book on WhatsApp <ArrowRight size={15} /></a>
  </div>;
}
