"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { imageSlots } from "@/lib/images";
import { Media } from "@/components/ui/Media";
const slots: (keyof typeof imageSlots)[] = ["boat", "boatFeature", "kayaking", "snorkelling", "dolphins", "mangroves", "lighthouse", "cave", "harbour", "joiningPoint", "coast"];
export function GalleryWall({ preview = false }: { preview?: boolean }) {
 const list = preview ? slots.slice(0, 4) : slots;
 const [active, setActive] = useState<number | null>(null);
 const closeRef = useRef<HTMLButtonElement>(null);
 const returnFocusRef = useRef<HTMLElement | null>(null);
 useEffect(() => { if (active !== null) closeRef.current?.focus(); else returnFocusRef.current?.focus(); }, [active]);
 useEffect(() => { if (active === null) return; function key(e: KeyboardEvent) { if (e.key === "Escape") setActive(null); else if (e.key === "ArrowRight") setActive(i => i === null ? null : (i + 1) % slots.length); else if (e.key === "ArrowLeft") setActive(i => i === null ? null : (i - 1 + slots.length) % slots.length); else if (e.key === "Tab") { const controls = document.querySelectorAll<HTMLElement>(".lightbox-panel button"); const first = controls[0], last = controls[controls.length - 1]; if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); } } } window.addEventListener("keydown", key); return () => window.removeEventListener("keydown", key); }, [active]);
 return <><div className={preview ? "gallery-preview" : "gallery-full"}>{list.map((slot, i) => <button type="button" className={`${preview ? "gallery-preview-item" : "gallery-full-item"} gallery-item-${(i % 4) + 1}`} key={slot} aria-label={`Open image: ${imageSlots[slot].alt}`} onClick={e => { returnFocusRef.current = e.currentTarget; setActive(i); }}><Media slot={slot} /></button>)}</div>{active !== null && <div className="lightbox-backdrop" role="dialog" aria-modal="true" aria-label="Photo gallery" onMouseDown={e => { if (e.target === e.currentTarget) setActive(null); }}><div className="lightbox-panel glass-dark"><button ref={closeRef} type="button" className="lightbox-control lightbox-close" aria-label="Close gallery" onClick={() => setActive(null)}><X /></button><button type="button" className="lightbox-control lightbox-prev" aria-label="Previous image" onClick={() => setActive((active - 1 + slots.length) % slots.length)}><ChevronLeft /></button><div className="lightbox-image"><Media slot={slots[active]} /></div><button type="button" className="lightbox-control lightbox-next" aria-label="Next image" onClick={() => setActive((active + 1) % slots.length)}><ChevronRight /></button><p>{imageSlots[slots[active]].alt} · {active + 1} of {slots.length}</p></div></div>}</>;
}
