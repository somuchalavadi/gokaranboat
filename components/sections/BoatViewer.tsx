"use client";

import { Img } from "@/components/ui/Img";
import { useState } from "react";
import { boat } from "@/data/site";

// Static viewer: one main render plus four thumbnail buttons that crossfade it.
export function BoatViewer() {
  const [index, setIndex] = useState(0);
  const current = boat.views[index];

  return (
    <div data-reveal>
      <figure>
        <div className="relative aspect-[16/10] overflow-hidden rounded-card bg-white ring-1 ring-line lg:aspect-[2/1]">
          {boat.views.map((view, viewIndex) => (
            <Img
              key={view.id}
              src={view.src}
              alt={viewIndex === index ? view.alt : ""}
              aria-hidden={viewIndex !== index}
              fill
              sizes="(max-width: 1023px) 100vw, 680px"
              className={`object-contain p-4 transition-opacity duration-300 ease-out sm:p-8 ${viewIndex === index ? "opacity-100" : "opacity-0"}`}
            />
          ))}
          <span className="absolute top-3 left-3 inline-flex h-8 items-center rounded-full bg-sand-50 px-3 text-sm font-semibold ring-1 ring-line">{boat.label}</span>
        </div>
        <figcaption className="sr-only" aria-live="polite">
          {current.alt}
        </figcaption>
      </figure>
      <div role="group" aria-label="Boat views" className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
        {boat.views.map((view, viewIndex) => (
          <button
            key={view.id}
            type="button"
            aria-pressed={viewIndex === index}
            onClick={() => setIndex(viewIndex)}
            className={`flex flex-col items-center gap-1 rounded-input bg-white p-2 transition-shadow ${viewIndex === index ? "ring-2 ring-navy-900" : "ring-1 ring-line hover:ring-ink/50"}`}
          >
            <span className="relative block aspect-[3/2] w-full">
              <Img src={view.src} alt="" fill sizes="(max-width: 1023px) 22vw, 150px" className="object-contain" />
            </span>
            <span className="text-sm leading-tight font-medium">{view.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
