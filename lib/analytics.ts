// GA4 event helpers. Nothing here sends personal data: no names, phone numbers or message text.
// Events queue in window.dataLayer until gtag.js loads (it loads lazily, after the page), so early clicks still count.

type GtagWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };

export const gaId = process.env.NEXT_PUBLIC_GA_ID ?? "";

export type AnalyticsEvent = "whatsapp_click" | "call_click" | "maps_click" | "booking_form_submit";

// Sets up the gtag queue (the same stub Google's snippet defines) and returns gtag.
export function gtag() {
  const w = window as GtagWindow;
  w.dataLayer = w.dataLayer ?? [];
  w.gtag =
    w.gtag ??
    function gtagStub() {
      // gtag.js expects the Arguments object itself, not an array.
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer!.push(arguments);
    };
  return w.gtag;
}

export function track(event: AnalyticsEvent, params: Record<string, string | number> = {}) {
  if (!gaId || typeof window === "undefined") return;
  gtag()("event", event, params);
}

// Which event (if any) a link click counts as.
export function eventForHref(href: string): AnalyticsEvent | null {
  if (href.startsWith("tel:")) return "call_click";
  if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) return "whatsapp_click";
  if (/^https:\/\/(maps\.app\.goo\.gl|(www\.)?google\.[a-z.]+\/maps|maps\.google\.)/.test(href)) return "maps_click";
  return null;
}
