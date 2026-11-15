"use client";

import { Img } from "@/components/ui/Img";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";
import type { GalleryItem } from "@/data/site";
import { Dialog } from "@/components/ui/Dialog";

const control = "glass-dark inline-flex size-12 items-center justify-center rounded-full text-white hover:bg-white/15";

// ←/→ to move, Esc to close (native dialog), swipe on touch. Videos load and play only in here.
export function Lightbox({ items, index, onIndexChange }: { items: readonly GalleryItem[]; index: number | null; onIndexChange: (index: number | null) => void }) {
  const touchStart = useRef<number | null>(null);
  const item = index === null ? null : items[index];

  function move(step: 1 | -1) {
    if (index === null) return;
    onIndexChange((index + step + items.length) % items.length);
  }

  useEffect(() => {
    if (index === null) return;
    const current = index;
    function onKeyDown(event: KeyboardEvent) {
      // Leave the arrow keys to the video's own controls when one of them has focus.
      if (event.target instanceof HTMLVideoElement) return;
      if (event.key === "ArrowRight") onIndexChange((current + 1) % items.length);
      else if (event.key === "ArrowLeft") onIndexChange((current - 1 + items.length) % items.length);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, items.length, onIndexChange]);

  return (
    <Dialog open={item !== null} onClose={() => onIndexChange(null)} label="Gallery" variant="fullscreen" className="bg-navy-900/95">
      {item && index !== null && (
        <div
          onTouchStart={(event) => {
            touchStart.current = event.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            const start = touchStart.current;
            const end = event.changedTouches[0]?.clientX;
            touchStart.current = null;
            if (start === null || end === undefined || Math.abs(end - start) < 40) return;
            move(end < start ? 1 : -1);
          }}
          className="flex h-full flex-col px-4 pt-16 pb-[calc(env(safe-area-inset-bottom)+16px)] sm:px-6"
        >
          <figure className="flex min-h-0 flex-1 flex-col">
            <div className="relative min-h-0 flex-1">
              {item.kind === "image" ? (
                <Img key={item.src} src={item.src} alt={item.alt} fill sizes="100vw" className="object-contain" />
              ) : (
                <video
                  key={item.src}
                  src={item.src}
                  poster={item.poster}
                  controls
                  autoPlay
                  playsInline
                  preload="none"
                  aria-label={item.alt}
                  className="absolute inset-0 size-full object-contain"
                />
              )}
            </div>
            <figcaption className="mt-3 text-center text-mist" aria-live="polite">
              {item.caption} · {index + 1} of {items.length}
            </figcaption>
          </figure>
          <div className="mt-3 flex items-center justify-center gap-4">
            <button type="button" onClick={() => move(-1)} aria-label="Previous" className={control}>
              <ChevronLeft aria-hidden="true" />
            </button>
            <button type="button" onClick={() => move(1)} aria-label="Next" className={control}>
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </Dialog>
  );
}
