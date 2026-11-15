"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";

// Scroll-snap carousel on phones and tablets (85vw cards, the next one peeks in); 4 columns from 1024px.
export function PackageCarousel({ labels, children }: { labels: readonly string[]; children: ReactNode }) {
  const scroller = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const items = Children.toArray(children);

  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    const cards = Array.from(root.children);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(cards.indexOf(entry.target));
      },
      { root, threshold: 0.6 },
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  function goTo(index: number) {
    const card = scroller.current?.children[index] as HTMLElement | undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    card?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest", inline: "start" });
  }

  return (
    <div data-reveal>
      <ul
        ref={scroller}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pt-2 pb-4 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {items.map((item, index) => (
          <li key={labels[index]} className="w-[85vw] max-w-[360px] shrink-0 snap-start md:w-[44vw] lg:w-auto lg:max-w-none">
            {item}
          </li>
        ))}
      </ul>
      <div className="flex justify-center lg:hidden">
        {labels.map((label, index) => (
          <button
            key={label}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Show ${label}`}
            aria-current={active === index ? "true" : undefined}
            className="inline-flex size-11 items-center justify-center rounded-full"
          >
            <span className={`block h-2 rounded-full transition-[width,background-color] duration-200 ${active === index ? "w-6 bg-navy-900" : "w-2 bg-ink/50"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
