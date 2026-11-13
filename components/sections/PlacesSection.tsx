import Link from "next/link";
import { Anchor, Compass, Fish, Leaf, Lighthouse, Mountain, Waves } from "lucide-react";
import { places, type Place } from "@/lib/places";

const iconMap = { compass: Compass, lighthouse: Lighthouse, cave: Mountain, fish: Fish, waves: Waves, leaf: Leaf } as const;

function PlaceFallback({ place }: { place: Place }) {
  const Icon = iconMap[place.icon];
  return <div className="place-fallback" aria-label={`${place.name} illustration`}><Icon size={42} strokeWidth={1.35} /><Anchor size={14} className="place-fallback-anchor" /></div>;
}

export function PlacesSection() {
  return <section className="places-section" id="places"><div className="container"><div className="places-heading"><div><p className="eyebrow">Along the Gokarna coast</p><h2>Places you’ll see</h2><p>Explore the stops included in each package, then choose the pace that suits your group.</p></div><span className="places-count">06 places</span></div><div className="places-grid">{places.map((place) => <article className="place-card" key={place.slug}><PlaceFallback place={place} /><div className="place-card-body"><h3>{place.name}</h3><p>{place.description}</p><div className="place-chips">{place.packages.map((packageName) => <Link href={`#package-${packageName.toLowerCase().replace(/\s+/g, "-")}`} className="place-chip" key={packageName}>{packageName}</Link>)}</div></div></article>)}</div></div></section>;
}
