"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { imageSlots } from "@/lib/images";
import { Media } from "@/components/ui/Media";

const slots = (Object.keys(imageSlots) as (keyof typeof imageSlots)[]).filter((slot) => Boolean(imageSlots[slot].src));

export function GalleryWall({ preview = false }: { preview?: boolean }) {
  const list = preview ? slots.slice(0, 3) : slots;
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const move = (direction: 1 | -1) => setActive((current) => current === null ? null : (current + direction + slots.length) % slots.length);

  useEffect(() => { if (active !== null) closeRef.current?.focus(); else returnFocusRef.current?.focus(); }, [active]);
  useEffect(() => {
    if (active === null) return;
    function key(e: KeyboardEvent) { if (e.key === "Escape") setActive(null); else if (e.key === "ArrowRight") move(1); else if (e.key === "ArrowLeft") move(-1); }
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [active]);

  return <><div className={preview ? "gallery-preview" : "gallery-full"}>{list.map((slot) => <button type="button" className="gallery-item" key={slot} aria-label={`Open image: ${imageSlots[slot].alt}`} onClick={(e) => { returnFocusRef.current = e.currentTarget; setActive(slots.indexOf(slot)); }}><Media slot={slot} /></button>)}</div>{active !== null && <div className="lightbox-backdrop" role="dialog" aria-modal="true" aria-label="Photo gallery" onMouseDown={(e) => { if (e.target === e.currentTarget) setActive(null); }} onTouchStart={(e) => { touchStartX.current = e.touches[0]?.clientX ?? null; }} onTouchEnd={(e) => { const start = touchStartX.current; const end = e.changedTouches[0]?.clientX ?? null; touchStartX.current = null; if (start === null || end === null || Math.abs(end - start) < 40) return; move(end < start ? 1 : -1); }}><div className="lightbox-panel glass-dark"><button ref={closeRef} type="button" className="lightbox-control lightbox-close" aria-label="Close gallery" onClick={() => setActive(null)}><X /></button><button type="button" className="lightbox-control lightbox-prev" aria-label="Previous image" onClick={() => move(-1)}><ChevronLeft /></button><div className="lightbox-image"><Media slot={slots[active]} /></div><button type="button" className="lightbox-control lightbox-next" aria-label="Next image" onClick={() => move(1)}><ChevronRight /></button><p>{imageSlots[slots[active]].alt} · {active + 1} of {slots.length}</p></div></div>}</>;
}
