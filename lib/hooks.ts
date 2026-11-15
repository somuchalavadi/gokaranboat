"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

// Returns the id of the section currently under the navbar, from the given list.
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    if (!elements.length) return;
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting);
        setActive(ids.find((id) => visible.get(id)) ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

// True while any element matching the selector intersects the viewport (offset by rootMargin).
// `initial` is the value used before the observer reports, and when nothing matches.
export function useAnyInView(selector: string, rootMargin = "0px", initial = false) {
  const [inView, setInView] = useState(initial);
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll(selector));
    if (!elements.length) return;
    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        setInView(visible.size > 0);
      },
      { rootMargin },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selector, rootMargin]);
  return inView;
}
