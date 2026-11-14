"use client";

import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { packages } from "@/lib/packages";
import { whatsappUrl } from "@/lib/site";

export function BookingBar() { const [experience, setExperience] = useState<string>(packages[0].name); const [date, setDate] = useState(""); const [group, setGroup] = useState("4"); const href = useMemo(() => whatsappUrl(`Hello, I would like to enquire about ${experience}. Date: ${date || "Not specified"}. Group size: ${group || "Not specified"}.`), [experience, date, group]); return <div className="booking-bar glass-dark" aria-label="Quick booking"><label><span>Experience</span><select value={experience} onChange={(event) => setExperience(event.target.value)}>{packages.map((item) => <option key={item.name}>{item.name}</option>)}<option>Customised Events</option></select></label><label><span>Date</span><input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label><label><span>Guests</span><input min="1" type="number" value={group} onChange={(event) => setGroup(event.target.value)} /></label><a className="button button-light" href={href} target="_blank" rel="noreferrer">Book on WhatsApp <ArrowRight size={15} /></a></div>; }
