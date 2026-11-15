// All visitor-facing content lives here. Components render only from this file.
// Values the owner hasn't confirmed yet are `null` with a TODO(owner) note; the UI hides them until filled in.

export type ImageAsset = { src: string; width: number; height: number; alt: string };

export const business = {
  name: "Rudra Gokarna Adventures",
  tagline: "Boat adventures and coastal experiences in Gokarna.",
  boatName: "The Rudra Gokarna",
  logo: { src: "/brand/rudra_gokarna_main_logo_transparent.png", width: 1164, height: 491, alt: "Rudra Gokarna Adventures" },
  emblem: "/brand/rudra-gokarn-adventures-emblem-512.png",
  priceRange: null as string | null, // TODO(owner): schema.org price range (e.g. "₹₹") once prices are confirmed.
  rating: null as number | null, // TODO(owner): Google rating, e.g. 4.8.
  reviewCount: null as number | null, // TODO(owner): number of Google reviews.
  openingHours: null as string[] | null, // TODO(owner): schema.org format, e.g. ["Mo-Su 07:00-18:00"].
  geo: null as { latitude: number; longitude: number } | null, // TODO(owner): exact Gokarna Beach pick-up pin.
  socials: null as { label: string; url: string }[] | null, // TODO(owner): Instagram / Google Maps listing / Facebook URLs.
};

export const contact = {
  whatsappNumber: "919591556869",
  phones: [
    { display: "+91 95915 56869", tel: "+919591556869", label: "Call / WhatsApp", primary: true },
    { display: "+91 70223 44675", tel: "+917022344675", label: "Alternate", primary: false },
  ],
  pickup: {
    label: "Gokarna Beach, Gokarna, Karnataka",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Gokarna+Beach%2C+Gokarna%2C+Karnataka",
    street: "Gokarna Beach",
    locality: "Gokarna",
    region: "Karnataka",
    country: "IN",
    postalCode: null as string | null, // TODO(owner): confirm the postal code for the pick-up address.
  },
  replyTime: null as string | null, // TODO(owner): e.g. "We usually reply within an hour."
  email: null as string | null, // TODO(owner): business email address.
};

// Facts the owner still needs to supply. Not rendered anywhere until confirmed.
export const pending = {
  boatLicence: null as string | null, // TODO(owner): boat licence details.
  capacity: null as number | null, // TODO(owner): licensed passenger capacity.
  cancellationPolicy: null as string | null, // TODO(owner): cancellation policy.
  season: null as string | null, // TODO(owner): operating season and monsoon closure dates.
  bioluminescenceTiming: null as string | null, // TODO(owner): when bioluminescence trips run.
  crewAbout: null as string | null, // TODO(owner): a short crew/about paragraph.
  vectorLogo: null as string | null, // TODO(owner): an SVG/vector version of the logo.
};

export const seo = {
  title: "Gokarna Boat Trips, Kayaking & Dolphin Tours | Rudra Gokarna Adventures",
  description:
    "Boat trips from Gokarna Beach, Karnataka: kayaking, snorkelling, dolphin watching, sea caves and mangrove river trips. 2–4 hour packages and custom trips.",
  ogImage: { src: "/images/og.jpg", width: 1200, height: 630, alt: "The Rudra Gokarna boat on calm water off the Gokarna coast" },
};

export const nav = [
  { label: "Packages", id: "packages" },
  { label: "Experiences", id: "experiences" },
  { label: "Boat", id: "boat" },
  { label: "Gallery", id: "gallery" },
  { label: "Book", id: "book" },
  { label: "FAQ", id: "faq" },
] as const;

export const highlights = {
  sightseeing: "Sightseeing",
  lighthouse: "Lighthouse",
  kayaking: "Kayaking",
  snorkelling: "Snorkelling",
  swimming: "Swimming",
  dolphins: "Dolphin watching",
  "mystery-cave": "Mystery cave exploration",
  "fishing-harbour": "Fishing harbour trip",
  "sea-river": "Sea-river joining point",
  "fishing-trips": "Fishing trips",
  bioluminescence: "Bioluminescence trip",
  "mangrove-views": "Mangrove views",
  "mangrove-kayaking": "Kayaking in mangroves",
} as const;
export type HighlightId = keyof typeof highlights;

export type TripPackage = {
  id: "premium" | "standard" | "exclusive" | "river";
  name: string;
  shortName: string;
  durationHours: number;
  featured: boolean;
  badge: string | null;
  image: ImageAsset;
  highlights: readonly HighlightId[];
  price: number | null;
  maxGuests: number | null;
  message: string;
};

export const packages: readonly TripPackage[] = [
  {
    id: "premium",
    name: "Premium Package",
    shortName: "Premium",
    durationHours: 3,
    featured: true,
    badge: "Most popular",
    image: { src: "/images/stock/premium.webp", width: 1600, height: 1066, alt: "Aerial view of a rocky shoreline, shallow turquoise water and a wooded hill" },
    highlights: ["sightseeing", "lighthouse", "kayaking", "snorkelling", "swimming", "dolphins", "mystery-cave", "fishing-harbour", "sea-river"],
    price: null, // TODO(owner): "From" price in ₹ per person.
    maxGuests: null, // TODO(owner): maximum guests for this trip.
    message: "Hi, I'm interested in the Premium package.",
  },
  {
    id: "standard",
    name: "Standard Package",
    shortName: "Standard",
    durationHours: 2,
    featured: false,
    badge: null,
    image: { src: "/images/stock/standard.webp", width: 1600, height: 1200, alt: "Rocky shoreline and open sea seen from above" },
    highlights: ["sightseeing", "mystery-cave", "dolphins"],
    price: null, // TODO(owner): "From" price in ₹ per person.
    maxGuests: null, // TODO(owner): maximum guests for this trip.
    message: "Hi, I'm interested in the Standard package.",
  },
  {
    id: "exclusive",
    name: "Exclusive Package",
    shortName: "Exclusive",
    durationHours: 4,
    featured: false,
    badge: null,
    image: { src: "/images/stock/exclusive.webp", width: 1539, height: 1200, alt: "Dark shoreline at night with points of blue light glowing in the water" },
    highlights: ["fishing-trips", "bioluminescence"],
    price: null, // TODO(owner): "From" price in ₹ per person.
    maxGuests: null, // TODO(owner): maximum guests for this trip.
    message: "Hi, I'm interested in the Exclusive package.",
  },
  {
    id: "river",
    name: "River Trips",
    shortName: "River",
    durationHours: 2,
    featured: false,
    badge: null,
    image: { src: "/images/stock/river-trips.webp", width: 1600, height: 1200, alt: "Mangrove trees and their roots rising from dark mud" },
    highlights: ["mangrove-views", "mangrove-kayaking"],
    price: null, // TODO(owner): "From" price in ₹ per person.
    maxGuests: null, // TODO(owner): maximum guests for this trip.
    message: "Hi, I'm interested in a River Trip.",
  },
];

export type Tile = {
  id: string;
  title: string;
  description: string;
  note: string | null;
  image: ImageAsset;
  highlightIds: readonly HighlightId[];
};

export const activities: readonly Tile[] = [
  {
    id: "kayaking",
    title: "Kayaking",
    description: "Kayak on the Premium trip, or paddle through the mangroves on a River Trip.",
    note: null,
    image: { src: "/images/stock/kayaking.webp", width: 1600, height: 1200, alt: "A person paddling a red kayak across calm grey-blue sea" },
    highlightIds: ["kayaking", "mangrove-kayaking"],
  },
  {
    id: "snorkelling",
    title: "Snorkelling",
    description: "Snorkelling is part of the Premium trip.",
    note: null,
    image: { src: "/images/stock/snorkelling.webp", width: 1600, height: 1200, alt: "A snorkeller floating in clear turquoise water, seen from above" },
    highlightIds: ["snorkelling"],
  },
  {
    id: "swimming",
    title: "Swimming",
    description: "A swim is part of the Premium trip.",
    note: null,
    image: { src: "/images/stock/swimming.webp", width: 1600, height: 1200, alt: "People swimming among small waves close to shore" },
    highlightIds: ["swimming"],
  },
  {
    id: "dolphins",
    title: "Dolphin watching",
    description: "Watch for dolphins out at sea.",
    note: "Sightings not guaranteed.",
    image: { src: "/images/stock/dolphin-watching.webp", width: 1600, height: 1082, alt: "Dolphins breaking the surface of blue ocean waves" },
    highlightIds: ["dolphins"],
  },
  {
    id: "sightseeing",
    title: "Sightseeing",
    description: "Sightseeing along the coast, from the water.",
    note: null,
    image: { src: "/images/stock/sightseeing.webp", width: 1600, height: 1200, alt: "Aerial view of a wooded headland beside a curved sandy beach" },
    highlightIds: ["sightseeing"],
  },
];

export const places: readonly Tile[] = [
  {
    id: "lighthouse",
    title: "Lighthouse",
    description: "A listed stop on the route.",
    note: null,
    image: { src: "/images/stock/lighthouse.webp", width: 1600, height: 1067, alt: "A tall lighthouse with an orange cap beside the ocean under a cloudy sky" },
    highlightIds: ["lighthouse"],
  },
  {
    id: "mystery-cave",
    title: "Mystery cave",
    description: "Explore a distinctive cave along the coast.",
    note: null,
    image: { src: "/images/stock/mystery-cave.webp", width: 1600, height: 1067, alt: "A small boat approaching a narrow opening between high rocky cliffs" },
    highlightIds: ["mystery-cave"],
  },
  {
    id: "fishing-harbour",
    title: "Fishing harbour",
    description: "Take in the working fishing harbour.",
    note: null,
    image: { src: "/images/stock/fishing-harbour.webp", width: 1600, height: 1200, alt: "A brightly painted fishing boat on a sandy beach with the sea behind" },
    highlightIds: ["fishing-harbour"],
  },
  {
    id: "sea-river",
    title: "Sea-river joining point",
    description: "Where the river meets the sea.",
    note: null,
    image: { src: "/images/stock/sea-river-joining.webp", width: 1600, height: 1138, alt: "Aerial view of a broad river mouth flowing into the sea" },
    highlightIds: ["sea-river"],
  },
  {
    id: "mangroves",
    title: "Mangroves",
    description: "Mangrove views, and kayaking through the mangroves.",
    note: null,
    image: { src: "/images/stock/mangroves.webp", width: 1600, height: 899, alt: "A boat moving along a calm, green, mangrove-lined waterway" },
    highlightIds: ["mangrove-views", "mangrove-kayaking"],
  },
  {
    id: "coastline",
    title: "Gokarna coastline",
    description: "The Gokarna shore, seen from the water.",
    note: null,
    image: { src: "/images/rudra-coast.jpeg", width: 1200, height: 1600, alt: "The Rudra Gokarna on calm water, seen from a rocky Gokarna shore between trees" },
    highlightIds: ["sightseeing"],
  },
];

export function packagesFor(highlightIds: readonly HighlightId[]) {
  return packages.filter((item) => item.highlights.some((id) => highlightIds.includes(id)));
}

export const trust: readonly { id: string; label: string | null; icon: "pin" | "star" | "safety" | "crew" }[] = [
  { id: "pickup", label: "Pick-up from Gokarna Beach", icon: "pin" },
  { id: "rating", label: null, icon: "star" }, // TODO(owner): e.g. "4.8 on Google · 120 reviews", once confirmed.
  { id: "safety", label: null, icon: "safety" }, // TODO(owner): e.g. "Life jackets for every guest", once confirmed.
  { id: "crew", label: null, icon: "crew" }, // TODO(owner): e.g. "Local crew", once confirmed.
];

export const hero = {
  eyebrow: "Gokarna, Karnataka",
  title: "Gokarna, from the deck.",
  subtitle: "Coastline, caves, mangroves and open sea, seen from the water.",
  chips: ["Gokarna Beach pick-up", "2–4 hour trips", "Custom trips"],
  message: "Hi, I'd like to know about your boat trips in Gokarna.",
  // Pre-sized AVIF/WebP files from scripts/optimize-assets.mjs: `${base}-${width}.{avif,webp}`.
  poster: {
    base: "/images/hero/hero",
    widths: [828, 1600],
    width: 1600,
    height: 1200,
    alt: "The Rudra Gokarna on calm water off the Gokarna coast, with hills in the haze behind",
  },
  // A 9-second loop cut from clip 01 (the only landscape clip). The source is 720p, so the larger loop is 720p, not 1080p.
  // hd is used at ≥1280px viewports, sd below that. Phones, reduced motion and Save-Data get the poster only.
  video: {
    hd: [
      { src: "/videos/hero-loop-720.webm", type: "video/webm" },
      { src: "/videos/hero-loop-720.mp4", type: "video/mp4" },
    ],
    sd: [
      { src: "/videos/hero-loop-540.webm", type: "video/webm" },
      { src: "/videos/hero-loop-540.mp4", type: "video/mp4" },
    ],
  } as { hd: VideoSource[]; sd: VideoSource[] } | null,
};

export type VideoSource = { src: string; type: "video/webm" | "video/mp4" };

export const packagesIntro = {
  title: "Choose your trip",
  details: "/packages",
};

export const experiencesIntro = {
  title: "What you'll do & see",
  intro: "Tap a tile to see which trips include it.",
  stockNote: "Activity and place photos are illustrative.",
  details: "/adventures",
};

export const boat = {
  title: "Meet The Rudra Gokarna",
  copy: "A navy and white hull with gold lines, an open upper deck and a covered cabin with windows. Trips leave from Gokarna Beach.",
  label: "Design render",
  message: "Hi, I'd like to know more about The Rudra Gokarna boat.",
  views: [
    { id: "front-quarter", label: "Front quarter", src: "/images/boat/boatfrontquarter.webp", width: 784, height: 388, alt: "Design render of the boat, front-quarter view" },
    { id: "side", label: "Side", src: "/images/boat/boatside.webp", width: 792, height: 264, alt: "Design render of the boat, side view" },
    { id: "rear-side", label: "Rear side", src: "/images/boat/boatrearside.webp", width: 1008, height: 384, alt: "Design render of the boat, rear-side view" },
    { id: "front", label: "Front", src: "/images/boat/boatfront.webp", width: 328, height: 384, alt: "Design render of the boat, front view" },
  ],
};

export type GalleryItem =
  | { kind: "image"; id: string; src: string; width: number; height: number; alt: string; caption: string }
  | { kind: "video"; id: string; src: string; poster: string; width: number; height: number; alt: string; caption: string };

export const galleryIntro = {
  title: "Gallery",
  intro: "Photos and short clips from Rudra Gokarna Adventures.",
};

// Owner-supplied media only (no stock). Clip 01 is the hero loop and clip 02 is a byte-identical copy of it,
// so neither appears here. Videos show their poster in the grid and load only inside the lightbox.
export const gallery: readonly GalleryItem[] = [
  { kind: "image", id: "hero", src: "/images/hero/hero-1600.webp", width: 1600, height: 1200, alt: "The Rudra Gokarna on calm water with guests on deck and hills in the haze behind", caption: "On calm water off Gokarna" },
  { kind: "video", id: "clip-04", src: "/videos/rudra-boat-04.mp4", poster: "/videos/posters/rudra-boat-04.webp", width: 720, height: 1280, alt: "Guests climbing over rocks to a beach, with a boat and a kayak waiting offshore", caption: "Back to the boat" },
  { kind: "image", id: "coast", src: "/images/rudra-coast.jpeg", width: 1200, height: 1600, alt: "The Rudra Gokarna on calm water, seen from a rocky shore between trees", caption: "Seen from the shore" },
  { kind: "video", id: "clip-03", src: "/videos/rudra-boat-03.mp4", poster: "/videos/posters/rudra-boat-03.webp", width: 720, height: 1280, alt: "Guests walking single file through a narrow, dark cave passage", caption: "Through the cave" },
  // TODO(owner): confirm whether this image is a photograph or a render, then update the caption and alt text.
  { kind: "image", id: "showcase", src: "/images/rudra-boat-showcase.jpeg", width: 1600, height: 901, alt: "The Rudra Gokarna on bright blue water in front of palm trees", caption: "The Rudra Gokarna" },
  { kind: "video", id: "clip-05", src: "/videos/rudra-boat-05.mp4", poster: "/videos/posters/rudra-boat-05.webp", width: 720, height: 1280, alt: "A guest holding a small crab while wading in shallow water", caption: "In the shallows" },
];

export const booking = {
  title: "Plan & book",
  intro: "Choose a trip, a date and your group. We'll open WhatsApp with your details filled in.",
  customDurations: [2, 3, 4] as const,
  guests: { min: 1, max: 20 },
  photo: { src: "/images/rudra-coast.jpeg", width: 1200, height: 1600, alt: "" },
};

export const events = {
  title: "Couples, families and celebrations",
  copy: "Customised trips for special occasions. Tell us what you have in mind and we'll plan around it.",
  pills: ["Couples", "Family", "New Year", "Other occasions"],
  cta: "Plan an occasion",
  message: "Hi, I'd like to plan a customised trip for a special occasion.",
};

export const faqIntro = {
  title: "Before you book",
  goodToKnowTitle: "Good to know",
  questionsTitle: "Common questions",
};

export const goodToKnow: readonly { icon: "weather" | "wildlife" | "health" | "dates"; text: string }[] = [
  { icon: "weather", text: "Trips depend on sea and weather conditions." },
  { icon: "wildlife", text: "Wildlife sightings aren't guaranteed." },
  { icon: "health", text: "Tell us about children, non-swimmers or health needs when you enquire." },
  { icon: "dates", text: "Ask us which dates are running." },
];

const byId = Object.fromEntries(packages.map((item) => [item.id, item])) as Record<TripPackage["id"], TripPackage>;
const list = (ids: readonly HighlightId[]) => ids.map((id) => highlights[id].toLowerCase()).join(", ");

export const faq: readonly { question: string; answer: string }[] = [
  {
    question: "Which package suits us?",
    answer: `Premium covers the most in ${byId.premium.durationHours} hours: ${list(byId.premium.highlights)}. Standard (${byId.standard.durationHours} hours) is a shorter trip with ${list(byId.standard.highlights)}. Exclusive is for fishing and bioluminescence, and River Trips are for the mangroves. Send us your group and date on WhatsApp and we'll help you choose.`,
  },
  {
    question: "How long is each trip?",
    answer: `${packages.map((item) => `${item.shortName === "River" ? "River Trips" : item.shortName} ${item.durationHours} hours`).join(", ")}. Custom trips can be ${booking.customDurations.join(", ").replace(/, (\d)$/, " or $1")} hours.`,
  },
  {
    question: "What does a River Trip involve?",
    answer: `A ${byId.river.durationHours}-hour trip for ${list(byId.river.highlights)}.`,
  },
  {
    question: "What is the Exclusive Package?",
    answer: `A ${byId.exclusive.durationHours}-hour package with ${list(byId.exclusive.highlights)}. Ask us about timing and conditions for your date.`,
  },
];

export const footer = {
  copyright: `© ${new Date().getFullYear()} ${business.name}`,
};
