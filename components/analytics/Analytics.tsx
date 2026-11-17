"use client";

import Script from "next/script";
import { useEffect } from "react";
import { eventForHref, gaId, gtag, track } from "@/lib/analytics";

// GA4, rendered only when NEXT_PUBLIC_GA_ID is set. gtag.js loads with `lazyOnload` (after the page has loaded),
// so it doesn't compete with the page for bandwidth or main-thread time. Config and events queue before then.
// One delegated click listener turns WhatsApp, phone and Maps links into GA4 events.
export function Analytics() {
  useEffect(() => {
    const send = gtag();
    send("js", new Date());
    send("config", gaId, { anonymize_ip: true });

    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const name = eventForHref(href);
      if (name) track(name, { link_location: link.closest("[id]")?.id ?? "page" });
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="lazyOnload" />;
}
