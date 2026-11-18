// Keyword universe → one URL per cluster (KEYWORD_MAP.md is generated from this file; see scripts/keyword-map.mjs).
// Rules: each primary keyword belongs to exactly one URL; a planned page that can't reach ~500 unique, useful words
// becomes a section of its hub instead; nothing is targeted that our data can't support (see `blockedBy`).
// Self-contained on purpose (no imports), so Node can read it directly.

export type Intent = "brand" | "transactional" | "informational" | "local" | "comparison";
export type Status =
  | "live" // the URL exists and targets this cluster
  | "planned" // a new page in Phase C
  | "section" // a section (anchor) of the URL, not its own page
  | "blocked" // needs owner data first; not targeted until then
  | "not-targeted"; // deliberately not targeted (wrong service, or would need claims we can't make)

export type KeywordCluster = {
  id: string;
  /** The one primary keyword this URL owns. */
  primary: string;
  /** Close variants, modifiers and questions served by the same URL (never the primary of another cluster). */
  secondary: readonly string[];
  intent: Intent;
  /** 1 = core money/brand terms, 2 = strong supporting terms, 3 = long tail. Judgement-based: no volume data yet. */
  priority: 1 | 2 | 3;
  url: string;
  status: Status;
  /** What's missing before this cluster can be targeted (or fully targeted). */
  blockedBy?: string;
  notes?: string;
};

export const keywordClusters: readonly KeywordCluster[] = [
  // ── Brand ──────────────────────────────────────────────────────────────────────────────────────
  {
    id: "brand",
    primary: "Rudra Gokarna Adventures",
    secondary: ["Rudra Gokarna", "The Rudra Gokarna", "Rudra Adventure Gokarna", "the rudra adventure Gokarna", "rudra boat Gokarna", "rudra boat ride", "therudraadventure"],
    intent: "brand",
    priority: 1,
    url: "/",
    status: "live",
    notes: "WebSite + Organization alternateName carry the variants (Phase B). Never 'Rudra Adventures' on its own.",
  },
  {
    id: "brand-contact",
    primary: "Rudra Gokarna contact number",
    secondary: ["Rudra Gokarna WhatsApp", "Rudra Gokarna booking", "Rudra Gokarna location", "Rudra Gokarna timings", "Rudra Gokarna Adventures about"],
    intent: "brand",
    priority: 1,
    url: "/about",
    status: "live",
    blockedBy: "Timings: package departure times are null (TODO(owner)).",
  },
  {
    id: "brand-packages",
    primary: "Rudra Gokarna packages",
    secondary: ["Rudra Gokarna price", "Rudra Gokarna boat ride packages", "Gokarna boat packages"],
    intent: "brand",
    priority: 1,
    url: "/packages",
    status: "live",
    blockedBy: "Price: all package prices are null (TODO(owner)); the page says 'price on enquiry'.",
  },
  {
    id: "brand-disambiguation",
    primary: "Rudra Gokarna vs Rudra Adventures Rishikesh",
    secondary: ["is Rudra Gokarna the same as Rudra Adventures", "Rudra Adventures Gokarna"],
    intent: "brand",
    priority: 2,
    url: "/about#not-rudra-adventures-rishikesh",
    status: "section",
    notes: "Also a FAQ on home and the guide hub (Phase B), in FAQPage JSON-LD.",
  },
  {
    id: "brand-reviews",
    primary: "Rudra Gokarna reviews",
    secondary: ["Rudra Gokarna Adventures rating"],
    intent: "brand",
    priority: 2,
    url: "/about",
    status: "blocked",
    blockedBy: "Google Business Profile URL and rating (business.socials, rating, reviewCount are null). No self-made review schema, ever.",
  },

  // ── Core service (Gokarna) ─────────────────────────────────────────────────────────────────────
  {
    id: "core-boat-trip",
    primary: "Gokarna boat trips",
    secondary: ["boat ride in Gokarna", "Gokarna boat ride", "boating in Gokarna", "Gokarna boat tour", "sea boat ride Gokarna", "sightseeing boat Gokarna", "Gokarna Beach boat ride", "boat ride near me (in Gokarna)", "Gokarna boat ride booking", "book boat ride Gokarna online"],
    intent: "transactional",
    priority: 1,
    url: "/",
    status: "live",
    notes: "'Near me' and 'today' are won by the Google Business Profile + on-page NAP, not a separate page.",
  },
  {
    id: "core-price",
    primary: "Gokarna boat ride price",
    secondary: ["Gokarna boat ride cost", "Gokarna boating charges", "Gokarna boat ride per person", "how much is a boat ride in Gokarna"],
    intent: "transactional",
    priority: 1,
    url: "/guides/gokarna-boat-trip-prices",
    status: "blocked",
    blockedBy: "At least one package price (TODO(owner)). The guide builds itself once a price exists; until then /packages answers 'price on enquiry'.",
  },
  {
    id: "core-planning",
    primary: "Gokarna boat trip guide",
    secondary: ["how long is a Gokarna boat trip", "Gokarna boat ride timings", "how to book a boat trip in Gokarna", "what to wear on a Gokarna boat trip", "what to carry", "is Gokarna boat ride safe", "minimum age for Gokarna boat ride", "Gokarna boat ride for family", "Gokarna boat ride for kids", "Gokarna one day trip by boat", "half day boat trip Gokarna", "Gokarna weekend boat trip"],
    intent: "informational",
    priority: 1,
    url: "/guides/gokarna-boat-trip-guide",
    status: "live",
    blockedBy: "Timings, minimum age, safety gear and season are null (TODO(owner)); those answers say 'ask us' until filled in.",
  },
  {
    id: "core-monsoon",
    primary: "Gokarna boat ride in monsoon",
    secondary: ["are boat rides open in monsoon Gokarna", "Gokarna boating season", "best time for boat ride in Gokarna"],
    intent: "informational",
    priority: 2,
    url: "/guides/gokarna-boat-trip-guide#section-timing",
    status: "section",
    blockedBy: "Operating season / monsoon closure (pending.season, TODO(owner)). General context (fishing ban 1 Jun–31 Jul) is already approved.",
  },
  {
    id: "core-water-activities",
    primary: "water activities in Gokarna",
    secondary: ["sea adventure Gokarna", "adventure activities in Gokarna", "things to do in Gokarna by boat"],
    intent: "informational",
    priority: 1,
    url: "/adventures",
    status: "live",
  },
  {
    id: "core-water-sports",
    primary: "water sports in Gokarna",
    secondary: ["Gokarna boat trip vs water sports", "jet ski / banana ride Gokarna (comparison only)"],
    intent: "comparison",
    priority: 2,
    url: "/guides/gokarna-boat-trip-vs-water-sports",
    status: "planned",
    notes: "Neutral comparison: we run boat trips, not jet skis or banana rides. No claims about other operators' prices or safety.",
  },
  {
    id: "core-private",
    primary: "private boat Gokarna",
    secondary: ["private boat ride Gokarna", "Gokarna boat for couples", "family boat trip Gokarna", "group boat trip Gokarna", "friends boat trip Gokarna", "corporate boat trip Gokarna", "birthday boat ride Gokarna", "New Year boat ride Gokarna"],
    intent: "transactional",
    priority: 1,
    url: "/private-boat-gokarna",
    status: "live",
    notes: "Occasions are sections (Phase C3); split out only where the content is genuinely unique.",
  },
  {
    id: "core-unconfirmed-services",
    primary: "sunset boat ride Gokarna",
    secondary: ["speed boat ride Gokarna", "motor boat ride Gokarna", "Gokarna cruise", "boat party Gokarna"],
    intent: "transactional",
    priority: 2,
    url: "—",
    status: "blocked",
    blockedBy: "Owner to confirm whether sunset trips, a speed boat or parties are offered. Not mentioned anywhere until confirmed.",
  },

  // ── Activities ─────────────────────────────────────────────────────────────────────────────────
  {
    id: "act-dolphins",
    primary: "dolphin watching in Gokarna",
    secondary: ["dolphin spotting Gokarna", "Gokarna dolphin trip", "dolphin safari Gokarna", "Gokarna dolphin boat ride"],
    intent: "transactional",
    priority: 1,
    url: "/dolphin-watching-gokarna",
    status: "live",
  },
  {
    id: "act-dolphins-time",
    primary: "best time for dolphins in Gokarna",
    secondary: ["best time for dolphin watching Gokarna", "Gokarna dolphin season", "dolphin sightings Gokarna"],
    intent: "informational",
    priority: 2,
    url: "/guides/best-time-for-dolphin-watching-gokarna",
    status: "live",
    blockedBy: "Sighting log data (data/sightings.ts is empty) for real statistics.",
  },
  {
    id: "act-kayaking",
    primary: "kayaking in Gokarna",
    secondary: ["sea kayaking Gokarna", "Gokarna kayaking price", "can non-swimmers do kayaking"],
    intent: "transactional",
    priority: 1,
    url: "/kayaking-in-gokarna",
    status: "live",
  },
  {
    id: "act-mangroves",
    primary: "mangrove river trip Gokarna",
    secondary: ["mangrove kayaking Gokarna", "mangrove boat ride Gokarna", "river trip Gokarna", "Gokarna backwaters boat ride"],
    intent: "transactional",
    priority: 1,
    url: "/mangrove-river-trip-gokarna",
    status: "live",
    blockedBy: "River name and route (TODO(owner)). Never 'Sharavathi' unless the owner confirms it.",
  },
  {
    id: "act-snorkelling",
    primary: "snorkelling in Gokarna",
    secondary: ["snorkeling Gokarna", "swimming in the sea Gokarna", "Gokarna snorkelling price"],
    intent: "transactional",
    priority: 1,
    url: "/snorkelling-in-gokarna",
    status: "live",
    notes: "Not scuba: Netrani Island scuba is another operator's service and is never claimed.",
  },
  {
    id: "act-fishing",
    primary: "fishing trip Gokarna",
    secondary: ["fishing boat ride Gokarna", "sea fishing Gokarna"],
    intent: "transactional",
    priority: 2,
    url: "/fishing-trip-gokarna",
    status: "live",
  },
  {
    id: "act-bioluminescence",
    primary: "bioluminescence in Gokarna",
    secondary: ["glowing water Gokarna", "glowing beach Gokarna", "bioluminescence boat trip Karnataka"],
    intent: "transactional",
    priority: 2,
    url: "/bioluminescence-gokarna",
    status: "live",
    blockedBy: "Months and time of night (TODO(owner)).",
  },
  {
    id: "act-places",
    primary: "Gokarna mystery cave",
    secondary: ["Gokarna lighthouse by boat", "sea-river confluence Gokarna", "Gokarna fishing harbour trip"],
    intent: "informational",
    priority: 3,
    url: "/adventures#places",
    status: "section",
    notes: "Too thin for separate pages (<500 unique words each); kept as sections of /adventures.",
  },

  // ── Places and local ───────────────────────────────────────────────────────────────────────────
  {
    id: "local-hub",
    primary: "boat rides in Uttara Kannada",
    secondary: ["boat ride Gokarna Karnataka", "coastal Karnataka boat trip", "Konkan coast boat ride Karnataka", "boat rides near Sirsi", "boat rides near Yellapur", "boat rides near Dandeli"],
    intent: "local",
    priority: 2,
    url: "/boat-rides-uttara-kannada",
    status: "planned",
    blockedBy: "data/nearby.ts distances and drive times (TODO(owner) or a verified source).",
    notes: "Sirsi, Yellapur and Dandeli are hub sections only (inland, far from the sea).",
  },
  {
    id: "local-pickup",
    primary: "Gokarna Beach boat pick-up",
    secondary: ["where is the Gokarna boat ride pick-up", "how to reach Gokarna Beach", "Gokarna Road railway station to Gokarna Beach"],
    intent: "local",
    priority: 1,
    url: "/guides/how-to-reach-gokarna-beach-boat-pickup",
    status: "live",
    blockedBy: "Landmark, parking, arrival time (TODO(owner)).",
  },
  {
    id: "local-beaches",
    primary: "Gokarna beaches by boat",
    secondary: ["Om Beach boat ride", "Kudle Beach boat", "Half Moon Beach boat", "Paradise Beach boat Gokarna"],
    intent: "informational",
    priority: 2,
    url: "—",
    status: "blocked",
    blockedBy: "Owner to confirm which beaches the route passes. Until then beaches are not named on any page.",
  },
  ...(["Honnavar", "Murudeshwar", "Kumta", "Bhatkal", "Ankola", "Karwar"] as const).map(
    (town): KeywordCluster => ({
      id: `town-${town.toLowerCase()}`,
      primary: `boat ride near ${town}`,
      secondary: [`${town} boat ride`, `boating near ${town}`, `sea trip from ${town}`],
      intent: "local",
      priority: town === "Kumta" || town === "Ankola" || town === "Honnavar" ? 2 : 3,
      url: `/boat-ride-near-${town.toLowerCase()}`,
      status: "planned",
      blockedBy: "Distance and drive time from data/nearby.ts. Becomes a hub section instead if it can't reach ~500 unique words.",
      notes: town === "Murudeshwar" ? "Never claim Murudeshwar water sports or Netrani scuba as ours." : town === "Honnavar" ? "Never claim Sharavathi backwater rides as ours. 'Honavar' spelling: one natural mention at most." : undefined,
    }),
  ),

  // ── Source cities (travel planning) ───────────────────────────────────────────────────────────
  ...([
    ["goa", "Goa", ["Belgaum (via Goa or Hubli)"]],
    ["bangalore", "Bangalore", ["Mysore"]],
    ["hubli-dharwad", "Hubli-Dharwad", ["Belgaum", "Hyderabad (via Hubli)"]],
    ["mangalore-udupi", "Mangalore-Udupi", ["Shimoga"]],
    ["pune-mumbai", "Pune-Mumbai", []],
  ] as const).map(
    ([slug, city, extra]): KeywordCluster => ({
      id: `city-${slug}`,
      primary: `Gokarna boat trip from ${city}`,
      secondary: [`${city} to Gokarna boat ride plan`, `Gokarna weekend trip from ${city}`, ...extra.map((name) => `Gokarna boat trip from ${name}`)],
      intent: "informational",
      priority: slug === "goa" || slug === "bangalore" ? 2 : 3,
      url: `/guides/gokarna-boat-trip-from-${slug}`,
      status: "planned",
      blockedBy: "Travel times need a verified source; ranges only, never exact fares.",
    }),
  ),

  // ── Comparisons ────────────────────────────────────────────────────────────────────────────────
  {
    id: "cmp-murudeshwar",
    primary: "Gokarna vs Murudeshwar water activities",
    secondary: ["Gokarna or Murudeshwar for boat ride", "Murdeshwar vs Gokarna (one natural mention)"],
    intent: "comparison",
    priority: 2,
    url: "/guides/gokarna-vs-murudeshwar-water-activities",
    status: "planned",
    notes: "Neutral and factual, with a comparison table; Murudeshwar's activities are described as other operators'.",
  },

  // ── Languages ──────────────────────────────────────────────────────────────────────────────────
  {
    id: "lang-kn",
    primary: "ಗೋಕರ್ಣ ಬೋಟ್ ರೈಡ್",
    secondary: ["ಗೋಕರ್ಣ ದೋಣಿ ವಿಹಾರ", "ಗೋಕರ್ಣ ಡಾಲ್ಫಿನ್", "ಗೋಕರ್ಣ ಕಯಾಕಿಂಗ್", "ಹೊನ್ನಾವರ ಬೋಟ್ ರೈಡ್"],
    intent: "transactional",
    priority: 3,
    url: "/kn",
    status: "planned",
    blockedBy: "Native Kannada review. Ships noindex (hreflang en-IN / kn-IN) until approved.",
  },
  {
    id: "lang-hi",
    primary: "गोकर्ण बोट राइड",
    secondary: ["गोकर्ण डॉल्फिन"],
    intent: "transactional",
    priority: 3,
    url: "/hi",
    status: "planned",
    blockedBy: "Optional. Native Hindi review; noindex until approved.",
  },
  {
    id: "misspellings",
    primary: "Gokarn boat ride",
    secondary: ["Gokarana boat ride", "Honavar boat ride", "Murdeshwar boat ride"],
    intent: "transactional",
    priority: 3,
    url: "—",
    status: "not-targeted",
    notes: "No pages for misspellings; at most one natural mention each where readers would use them.",
  },
];
