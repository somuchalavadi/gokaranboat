"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Mark elements with `data-reveal`; this fades them up 16px once as they enter the viewport.
// Elements already on screen when the page hydrates are shown straight away.
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in])"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.in = "";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    for (const el of elements) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) el.dataset.in = "";
      else observer.observe(el);
    }
    document.documentElement.dataset.js = "";
    return () => observer.disconnect();
  }, [pathname]);
  return null;
}
