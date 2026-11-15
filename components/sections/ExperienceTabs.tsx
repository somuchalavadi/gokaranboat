"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { activities, packagesFor, places, type Tile } from "@/data/site";
import { Dialog } from "@/components/ui/Dialog";

const tabs = [
  { id: "activities", label: "Activities", items: activities },
  { id: "places", label: "Places", items: places },
] as const;

// Bento on desktop: 5 tiles = one 2×2 + four small; 6 tiles = two wide + four small.
// Phones: two columns of squares, with the first tile full width when the count is odd.
function tileLayout(index: number, count: number) {
  const wideOnPhone = count % 2 === 1 && index === 0;
  const phone = wideOnPhone ? "col-span-2 aspect-[2/1]" : "aspect-square";
  let desktop = "";
  if (count === 5 && index === 0) desktop = "lg:col-span-2 lg:row-span-2";
  if (count === 6 && (index === 0 || index === 5)) desktop = "lg:col-span-2";
  const big = wideOnPhone || desktop !== "";
  return {
    className: `${phone} lg:aspect-auto ${desktop}`,
    sizes: big ? "(max-width: 1023px) 100vw, 600px" : "(max-width: 1023px) 50vw, 300px",
  };
}

function TileCard({ item, index, count, onOpen }: { item: Tile; index: number; count: number; onOpen: () => void }) {
  const layout = tileLayout(index, count);
  return (
    <li className={layout.className}>
      <article className="group relative h-full overflow-hidden rounded-card bg-navy-700 transition-transform duration-250 ease-out hover:-translate-y-1">
        <Image src={item.image.src} alt={item.image.alt} fill sizes={layout.sizes} className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-3/4 bg-linear-to-t from-navy-900/95 via-navy-900/50 to-transparent" />
        <h3 className="absolute inset-x-0 bottom-0 p-4 font-display text-lg leading-tight font-semibold text-white lg:p-5 lg:text-h3">
          <button type="button" onClick={onOpen} aria-haspopup="dialog" className="text-left after:absolute after:inset-0 after:content-['']">
            {item.title}
          </button>
        </h3>
      </article>
    </li>
  );
}

export function ExperienceTabs() {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState<Tile | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = tabs.length - 1;
    const next = { ArrowRight: index === last ? 0 : index + 1, ArrowLeft: index === 0 ? last : index - 1, Home: 0, End: last }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setTab(next);
    tabRefs.current[next]?.focus();
  }

  const included = open ? packagesFor(open.highlightIds) : [];

  return (
    <div data-reveal>
      <div role="tablist" aria-label="Activities and places" className="inline-flex rounded-full bg-navy-700 p-1">
        {tabs.map((item, index) => (
          <button
            key={item.id}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${item.id}`}
            aria-selected={tab === index}
            aria-controls={`panel-${item.id}`}
            tabIndex={tab === index ? 0 : -1}
            onClick={() => setTab(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={`h-12 rounded-full px-6 font-semibold transition-colors ${tab === index ? "bg-white text-navy-900" : "text-white hover:bg-white/10"}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tabs.map((item, index) => (
        <div key={item.id} role="tabpanel" id={`panel-${item.id}`} aria-labelledby={`tab-${item.id}`} hidden={tab !== index} className="mt-6">
          <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:grid-rows-[repeat(2,220px)] lg:gap-4">
            {item.items.map((tile, tileIndex) => (
              <TileCard key={tile.id} item={tile} index={tileIndex} count={item.items.length} onOpen={() => setOpen(tile)} />
            ))}
          </ul>
        </div>
      ))}

      <Dialog open={open !== null} onClose={() => setOpen(null)} label={open?.title ?? "Details"}>
        {open && (
          <div className="p-6 pr-16">
            <p className="font-display text-h3 font-semibold">{open.title}</p>
            <p className="mt-2 text-lg">{open.description}</p>
            {open.note && <p className="mt-2 text-sm font-semibold text-muted">{open.note}</p>}
            {included.length > 0 && (
              <p className="mt-4">
                <span className="font-semibold">Included in:</span> {included.map((pkg) => pkg.name).join(", ")}
              </p>
            )}
          </div>
        )}
      </Dialog>
    </div>
  );
}
