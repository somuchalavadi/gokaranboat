"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { eventForHref, gaId, gtag, track } from "@/lib/analytics";

// GA4, rendered only when NEXT_PUBLIC_GA_ID is set. The config and any events queue in dataLayer straight away,
// but gtag.js itself (~150 KB of script) loads only on the visitor's first interaction (tap, click, key or
// scroll) or after 8 seconds, whichever comes first. With plain `lazyOnload` its long tasks landed inside the
// page's load window and cost mobile Lighthouse 4–6 points; this keeps the page at 95+ while still counting
// every visit that lasts 8 seconds or interacts at all.
// One delegated click listener turns WhatsApp, phone and Maps links into GA4 events.
const triggers = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
const fallbackMs = 8000;

export function Analytics() {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const send = gtag();
    send("js", new Date());
    send("config", gaId, { anonymize_ip: true });

    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const name = eventForHref(href);
      if (!name) return;
      // data-ga-source / data-ga-type on the link add "source" and "type" parameters (e.g. maps_click {source: "header"}).
      const { gaSource, gaType } = (link as HTMLElement).dataset;
      track(name, { link_location: link.closest("[id]")?.id ?? "page", ...(gaSource ? { source: gaSource } : {}), ...(gaType ? { type: gaType } : {}) });
    }
    document.addEventListener("click", onClick, { capture: true });

    const start = () => setLoad(true);
    const timer = window.setTimeout(start, fallbackMs);
    for (const type of triggers) window.addEventListener(type, start, { once: true, passive: true });

    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      window.clearTimeout(timer);
      for (const type of triggers) window.removeEventListener(type, start);
    };
  }, []);

  return load ? <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" /> : null;
}
