"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";
import { gallery } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Lightbox } from "@/components/sections/Lightbox";

const gridCount = 6;

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <Section
      id="gallery"
      tone="navy"
      title="Gallery"
      intro={<p>Photos and short clips of The Rudra Gokarna.</p>}
      action={
        <Button variant="secondary" tone="dark" aria-haspopup="dialog" onClick={() => setIndex(0)}>
          View all
        </Button>
      }
    >
      <ul data-reveal className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
        {gallery.slice(0, gridCount).map((item, itemIndex) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => setIndex(itemIndex)}
              aria-haspopup="dialog"
              aria-label={`${item.kind === "video" ? "Play video" : "View photo"}: ${item.alt}`}
              className="group relative block aspect-square w-full overflow-hidden rounded-card bg-navy-700 transition-transform duration-250 ease-out hover:-translate-y-1 lg:aspect-video"
            >
              <Image
                src={item.kind === "video" ? item.poster : item.src}
                alt=""
                fill
                sizes="(max-width: 1023px) 50vw, 400px"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
              {item.kind === "video" && (
                <span className="glass-dark absolute inset-0 m-auto inline-flex size-14 items-center justify-center rounded-full text-white">
                  <Play aria-hidden="true" className="ml-0.5" />
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
      <Lightbox items={gallery} index={index} onIndexChange={setIndex} />
    </Section>
  );
}
