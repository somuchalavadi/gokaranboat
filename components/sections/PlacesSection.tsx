import Link from "next/link";
import { Compass, Fish, Leaf, Lighthouse, Mountain, Waves } from "lucide-react";
import { places } from "@/lib/places";
import { Media } from "@/components/ui/Media";

const iconMap = { compass: Compass, lighthouse: Lighthouse, cave: Mountain, fish: Fish, waves: Waves, leaf: Leaf } as const;
const imageMap = { sightseeing: "stockPlaceSightseeing", lighthouse: "stockLighthouse", "mystery-cave": "stockCave", "fishing-harbour": "stockHarbour", "sea-river-joining": "stockJoiningPoint", mangroves: "stockMangroves" } as const;

export function PlacesSection() {
  return <section className="places-section" id="places"><div className="container"><div className="places-heading"><div><p className="eyebrow">Along the Gokarna coast</p><h2>Places you’ll see</h2><p>Explore the stops included in each package, then choose the pace that suits your group.</p></div><span className="places-count">06 places</span></div><div className="places-grid">{places.map((place) => { const Icon = iconMap[place.icon]; return <article className="place-card" key={place.slug}><div className="place-fallback"><Media slot={imageMap[place.slug as keyof typeof imageMap]} sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 380px" /><Icon size={20} className="place-icon-badge" aria-hidden="true" />{place.slug === "mystery-cave" && <small className="representative-label">Representative image</small>}</div><div className="place-card-body"><h3>{place.name}</h3><p>{place.description}</p><div className="place-chips">{place.packages.map((packageName) => <Link href={`#package-${packageName.toLowerCase().replace(/\s+/g, "-")}`} className="place-chip" key={packageName}>{packageName}</Link>)}</div></div></article>; })}</div></div></section>;
}
