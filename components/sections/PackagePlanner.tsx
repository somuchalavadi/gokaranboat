"use client";

import { ArrowRight, Minus, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { places } from "@/lib/places";
import { whatsappUrl } from "@/lib/site";

const durations = ["2 hrs", "3 hrs", "4 hrs"] as const;

export function PackagePlanner() {
  const [selected, setSelected] = useState<string[]>([]);
  const [duration, setDuration] = useState<(typeof durations)[number]>("3 hrs");
  const [guests, setGuests] = useState<number | null>(null);
  const href = useMemo(() => {
    const placesText = selected.length ? selected.join(", ") : "…";
    return whatsappUrl(`Hello, I would like to plan a trip. Places I'm interested in: ${placesText}. Preferred length: ${duration}.${guests ? ` Guests: ${guests}.` : ""} Please tell me what is possible and the price.`);
  }, [selected, duration, guests]);

  function toggle(place: string) {
    setSelected((current) => current.includes(place) ? current.filter((item) => item !== place) : [...current, place]);
  }

  return <section className="planner-section" aria-labelledby="planner-title">
    <div className="container">
      <div className="planner-card">
        <div className="planner-copy"><p className="eyebrow">Make your own</p><h2 id="planner-title">Shape a day that feels like yours</h2><p>Tell us what you’d like to see and when. We’ll confirm what’s possible.</p></div>
        <div className="planner-controls">
          <div className="planner-group"><span className="planner-label">Places</span><div className="choice-row">{places.map((place) => <button type="button" className={`choice-chip ${selected.includes(place.name) ? "is-selected" : ""}`} aria-pressed={selected.includes(place.name)} key={place.slug} onClick={() => toggle(place.name)}>{place.name}</button>)}</div></div>
          <div className="planner-group"><span className="planner-label">Duration</span><div className="choice-row">{durations.map((item) => <button type="button" className={`choice-chip ${duration === item ? "is-selected" : ""}`} aria-pressed={duration === item} key={item} onClick={() => setDuration(item)}>{item}</button>)}</div></div>
          <div className="planner-footer"><div className="guest-control"><span className="planner-label">Guests</span><div className="stepper"><button type="button" aria-label="Remove guest" onClick={() => setGuests((value) => value === null ? null : Math.max(1, value - 1))}><Minus size={16} /></button><strong aria-live="polite">{guests ?? "—"}</strong><button type="button" aria-label="Add guest" onClick={() => setGuests((value) => value === null ? 1 : value + 1)}><Plus size={16} /></button></div></div><a className="button button-dark" href={href} target="_blank" rel="noreferrer">Send my plan <ArrowRight size={17} /></a></div>
        </div>
      </div>
    </div>
  </section>;
}
