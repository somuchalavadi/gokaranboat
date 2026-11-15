"use client";

import { useEffect, useState } from "react";
import { gallery } from "@/data/site";
import { Lightbox } from "@/components/sections/Lightbox";

// Opens the lightbox for any `[data-gallery-open]` button inside #gallery, so the grid itself can stay a
// server component.
export function GalleryLightbox() {
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    const root = document.getElementById("gallery");
    if (!root) return;
    function onClick(event: MouseEvent) {
      const opener = (event.target as Element).closest<HTMLElement>("[data-gallery-open]");
      if (!opener) return;
      // Safari doesn't focus buttons on click; focus it so the dialog can return focus here on close.
      opener.focus();
      setIndex(Number(opener.dataset.galleryOpen));
    }
    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, []);

  return <Lightbox items={gallery} index={index} onIndexChange={setIndex} />;
}
