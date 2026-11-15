"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Mark elements with `data-reveal`; this fades them up 16px once as they enter the viewport.
// Hiding only starts after the observer's first report, so anything already on screen is shown straight
// away (no flash) and nothing is hidden if JavaScript never runs. No layout reads, so no forced reflow.
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in])");
    let first = true;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.in = "";
          observer.unobserve(entry.target);
        }
        if (first) {
          first = false;
          document.documentElement.dataset.js = "";
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);
  return null;
}
