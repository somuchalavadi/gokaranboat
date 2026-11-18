// All visitor-facing content lives here. Components render only from this file.
// Values the owner hasn't confirmed yet are `null` with a TODO(owner) note; the UI hides them until filled in.

export type ImageAsset = { src: string; width: number; height: number; alt: string };

export const business = {
  name: "Rudra Gokarna Adventures",
  tagline: "Boat adventures and coastal experiences in Gokarna.",
  boatName: "The Rudra Gokarna",
  logo: { src: "/brand/rudra_gokarna_main_logo_transparent.png", width: 380, height: 160, alt: "Rudra Gokarna Adventures" },
  emblem: "/brand/rudra-gokarn-adventures-emblem-512.png",
  priceRange: null as string | null, // TODO(owner): schema.org price range (e.g. "₹₹") once prices are confirmed.
  rating: null as number | null, // TODO(owner): Google rating, e.g. 4.8.
  reviewCount: null as number | null, // TODO(owner): number of Google reviews.
  openingHours: null as string[] | null, // TODO(owner): schema.org format, e.g. ["Mo-Su 07:00-18:00"].
  geo: null as { latitude: number; longitude: number } | null, // TODO(owner): exact Gokarna Beach pick-up pin.
  socials: null as { label: string; url: string }[] | null, // TODO(owner): Instagram / Google Maps listing / Facebook URLs.
  foundingDate: null as string | null, // TODO(owner): year the business started, e.g. "2021".
  slogan: null as string | null, // TODO(owner): an official slogan, if you use one.
  // Used in structured data only.
  areaServed: ["Gokarna", "Uttara Kannada, Karnataka"],
  knowsAbout: ["Boat trips", "Dolphin watching", "Kayaking", "Snorkelling", "Mangrove river trips", "Fishing trips", "Bioluminescence trips", "Gokarna coastline"],
};

export const contact = {
  // One number for both calls and WhatsApp.
  whatsappNumber: "917019745857",
  phones: [{ display: "+91 70197 45857", tel: "+917019745857", label: "Call / WhatsApp", primary: true }],
  pickup: {
    label: "Gokarna Beach, Gokarna, Karnataka",
    mapsUrl: "https://maps.app.goo.gl/s4jSzvA6cUZmsFzZ6",
    street: "Gokarna Beach",
    locality: "Gokarna",
    region: "Karnataka",
    country: "IN",
    postalCode: null as string | null, // TODO(owner): confirm the postal code for the pick-up address.
    // Shown on the "How to reach" guide once confirmed; null lines are left out.
    directions: {
      railwayStation: null as string | null, // TODO(owner): how guests get from Gokarna Road station to the pick-up, and roughly how long it takes.
      busStand: null as string | null, // TODO(owner): how guests get from the Gokarna bus stand to the pick-up.
      parking: null as string | null, // TODO(owner): where guests arriving by car or bike can park.
      landmark: null as string | null, // TODO(owner): a landmark near the pick-up spot on the beach, e.g. "beside the lifeguard tower".
    },
  },
  replyTime: null as string | null, // TODO(owner): e.g. "We usually reply within an hour."
  pickupTime: null as string | null, // TODO(owner): when guests should arrive, e.g. "15 minutes before departure".
  email: null as string | null, // TODO(owner): business email address.
};

// Facts the owner still needs to supply. Not rendered anywhere until confirmed.
export const pending = {
  boatLicence: null as string | null, // TODO(owner): boat licence details.
  capacity: null as number | null, // TODO(owner): licensed passenger capacity.
  cancellationPolicy: null as string | null, // TODO(owner): cancellation policy.
  season: null as string | null, // TODO(owner): operating season and monsoon closure dates.
  bioluminescenceTiming: null as string | null, // TODO(owner): when bioluminescence trips run.
  crewAbout: null as string | null, // TODO(owner): a short crew/about paragraph (shown on /about once filled in).
  grievanceOfficer: null as string | null, // TODO(owner): name and contact of the person who handles privacy requests (DPDP Act).
  vectorLogo: null as string | null, // TODO(owner): an SVG/vector version of the logo.
  boatRenders: null as string | null, // TODO(owner): higher-resolution boat renders (the current ones are 328–1008px wide).
  tripPhotos: null as string | null, // TODO(owner): real photos of the activities and places, to replace the illustrative stock images.
  heroClip: null as string | null, // TODO(owner): a 1080p (or larger) landscape clip, so the hero loop can be 1080p (all current clips are 720p).
};

export const seo = {
  title: "Gokarna Boat Trips & Kayaking | Rudra Gokarna Adventures",
  description: "Boat trips from Gokarna Beach: dolphin watching, kayaking, snorkelling, sea caves and mangrove river trips. 2–4 hour and custom trips.",
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
  timings: string | null;
  minAge: number | null;
  description: string;
  bestFor: string;
  message: string;
};

export const packages: readonly TripPackage[] = [
  {
    id: "premium",
    name: "Premium Package",
    shortName: "Premium",
    durationHours: 3,
    featured: true,
    badge: "Most activities",
    image: { src: "/images/stock/premium.webp", width: 1600, height: 1066, alt: "Aerial view of a rocky shoreline, shallow turquoise water and a wooded hill" },
    highlights: ["sightseeing", "lighthouse", "kayaking", "snorkelling", "swimming", "dolphins", "mystery-cave", "fishing-harbour", "sea-river"],
    price: null, // TODO(owner): "From" price in ₹ per person.
    maxGuests: null, // TODO(owner): maximum guests for this trip.
    timings: null, // TODO(owner): departure times, e.g. "7:00, 10:00 and 15:00".
    minAge: null, // TODO(owner): minimum age for children on this trip.
    description: "The fullest coastal trip: sightseeing, the lighthouse, the mystery cave and the fishing harbour, with time to kayak, snorkel and swim.",
    bestFor: "Groups who want to see and do the most in one trip.",
    message: "Hi, I'm interested in the Premium package.",
  },
  {
    id: "standard",
    name: "Standard Package",
    shortName: "Standard",
    durationHours: 2,
    featured: false,
    badge: null,
    image: { src: "/images/stock/standard.webp", width: 960, height: 720, alt: "Rocky shoreline and open sea seen from above" },
    highlights: ["sightseeing", "mystery-cave", "dolphins"],
    price: null, // TODO(owner): "From" price in ₹ per person.
    maxGuests: null, // TODO(owner): maximum guests for this trip.
    timings: null, // TODO(owner): departure times, e.g. "7:00, 10:00 and 15:00".
    minAge: null, // TODO(owner): minimum age for children on this trip.
    description: "A shorter trip along the coast with sightseeing, the mystery cave and a chance to see dolphins.",
    bestFor: "A first look at the coast in two hours.",
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
    timings: null, // TODO(owner): departure times, e.g. "7:00, 10:00 and 15:00".
    minAge: null, // TODO(owner): minimum age for children on this trip.
    description: "A four-hour trip built around fishing and a bioluminescence trip.",
    bestFor: "Fishing fans and anyone curious about bioluminescence.",
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
    timings: null, // TODO(owner): departure times, e.g. "7:00, 10:00 and 15:00".
    minAge: null, // TODO(owner): minimum age for children on this trip.
    description: "Two hours in the mangroves, with mangrove views and kayaking between the trees.",
    bestFor: "Nature lovers and kayakers.",
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
    image: { src: "/images/stock/snorkelling.webp", width: 1360, height: 1020, alt: "A snorkeller floating in clear turquoise water, seen from above" },
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
    note: "Sightings depend on conditions.",
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
    image: { src: "/images/stock/mystery-cave.webp", width: 960, height: 640, alt: "A small boat approaching a narrow opening between high rocky cliffs" },
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
    image: { src: "/images/stock/mangroves.webp", width: 1360, height: 764, alt: "A boat moving along a calm, green, mangrove-lined waterway" },
    highlightIds: ["mangrove-views", "mangrove-kayaking"],
  },
  {
    id: "coastline",
    title: "Gokarna coastline",
    description: "The Gokarna shore, seen from the water.",
    note: null,
    image: { src: "/images/rudra-coast.jpeg", width: 864, height: 1152, alt: "The Rudra Gokarna on calm water, seen from a rocky Gokarna shore between trees" },
    highlightIds: ["sightseeing"],
  },
];

export function packagesFor(highlightIds: readonly HighlightId[]) {
  return packages.filter((item) => item.highlights.some((id) => highlightIds.includes(id)));
}

// `href` turns an item into a link (opens in a new tab).
export const trust: readonly { id: string; label: string | null; icon: "pin" | "star" | "safety" | "crew"; href?: string }[] = [
  { id: "pickup", label: "Pick-up from Gokarna Beach", icon: "pin", href: contact.pickup.mapsUrl },
  { id: "rating", label: null, icon: "star" }, // TODO(owner): e.g. "4.8 on Google · 120 reviews", once confirmed.
  { id: "safety", label: null, icon: "safety" }, // TODO(owner): e.g. "Life jackets for every guest", once confirmed.
  { id: "crew", label: null, icon: "crew" }, // TODO(owner): e.g. "Local crew", once confirmed.
];

export const hero = {
  eyebrow: "Gokarna, Karnataka",
  title: "Gokarna boat trips, from the deck.",
  // Rendered as two display lines (one per entry); the text reads as the title above.
  titleLines: ["Gokarna boat trips,", "from the deck."],
  // The first paragraph in <main>: a one-sentence definition of the business, built from data only.
  subtitle: `${business.name} is a boat-trip operator at ${contact.pickup.street}, ${contact.pickup.region}, running ${Math.min(...packages.map((item) => item.durationHours))}–${Math.max(...packages.map((item) => item.durationHours))} hour sea and mangrove trips with dolphin watching, kayaking and snorkelling.`,
  chips: ["Gokarna Beach pick-up", "2–4 hour trips", "Custom trips"],
  ctaTrips: "See trips",
  ctaWhatsApp: "WhatsApp us",
  message: "Hi, I'd like to know about your boat trips in Gokarna.",
  // Pre-sized AVIF/WebP poster variants from scripts/optimize-assets.mjs (source: rudra-boat-showcase.jpeg):
  // landscape files for desktop and a 3:4 crop centred on the boat for phones. The source is 1600×901, so the
  // phone crop is 676px wide at most (it isn't upscaled).
  // TODO(owner): confirm whether this image is a photograph or a render; the alt text stays neutral until then.
  poster: {
    base: "/images/hero/hero-blue",
    widths: [828, 1600],
    portraitBase: "/images/hero/hero-blue-portrait",
    portraitWidths: [676],
    width: 1600,
    height: 901,
    alt: "The Rudra Gokarna boat on bright blue water beside a tropical coastline",
  },
  // The approved hero is a still image; no background video is rendered.
  video: null as { hd: VideoSource[]; sd: VideoSource[] } | null,
};

export type VideoSource = { src: string; type: "video/webm" | "video/mp4" };

// The About section (its lead line is pageSummaries.home.answerSummary in data/pages.ts). `canonical` is the owner-approved ~60-word description, reused in JSON-LD and llms.txt.
export const about = {
  title: "About Rudra Gokarna Adventures",
  paragraphs: [
    "Trips run aboard The Rudra Gokarna, a navy and white boat with gold lines, an open upper deck and a covered cabin with windows.",
    "Choose a listed trip or tell us what you want to see. Custom trips for couples, families, New Year and other occasions are planned on request.",
  ],
  canonical:
    "Rudra Gokarna Adventures runs boat trips from Gokarna Beach in Gokarna, Karnataka, aboard The Rudra Gokarna, a navy-and-white boat with an open upper deck and a covered cabin. Trips last two to four hours and include sightseeing along the coast, dolphin watching, kayaking, snorkelling, a mystery cave, mangrove river trips, fishing and bioluminescence trips, plus custom trips for couples, families and celebrations.",
  image: { src: "/images/rudra-hero.jpeg", width: 1600, height: 1200, alt: "The Rudra Gokarna on calm water off the Gokarna coast, with guests on deck" },
  cta: { label: "Meet the boat", href: "/#boat" },
};

export const packagesIntro = {
  title: "Choose your trip",
  details: "/packages",
  table: { caption: "Boat trip packages at a glance", head: ["Package", "Duration", "Highlights", "Price"] },
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

// Owner-supplied media only (no stock), and nothing that repeats the hero: the hero poster
// (rudra-boat-showcase) isn't here, and clip 02 (a byte-identical copy of clip 01) is skipped.
// Videos show their poster in the grid and load only inside the lightbox.
export const gallery: readonly GalleryItem[] = [
  { kind: "image", id: "calm", src: "/images/rudra-hero.jpeg", width: 1600, height: 1200, alt: "The Rudra Gokarna on calm water with guests on deck and hills in the haze behind", caption: "On calm water off Gokarna" },
  { kind: "video", id: "clip-04", src: "/videos/rudra-boat-04.mp4", poster: "/videos/posters/rudra-boat-04.webp", width: 720, height: 1280, alt: "Guests climbing over rocks to a beach, with a boat and a kayak waiting offshore", caption: "Back to the boat" },
  { kind: "image", id: "coast", src: "/images/rudra-coast.jpeg", width: 864, height: 1152, alt: "The Rudra Gokarna on calm water, seen from a rocky shore between trees", caption: "Seen from the shore" },
  { kind: "video", id: "clip-03", src: "/videos/rudra-boat-03.mp4", poster: "/videos/posters/rudra-boat-03.webp", width: 720, height: 1280, alt: "Guests walking single file through a narrow, dark cave passage", caption: "Through the cave" },
  { kind: "video", id: "clip-01", src: "/videos/rudra-boat-01.mp4", poster: "/videos/posters/rudra-boat-01.webp", width: 1280, height: 720, alt: "A slow pan from a sandy cove with rocks and trees out to the boat on calm sea", caption: "From the cove" },
  { kind: "video", id: "clip-05", src: "/videos/rudra-boat-05.mp4", poster: "/videos/posters/rudra-boat-05.webp", width: 720, height: 1280, alt: "A guest holding a small crab while wading in shallow water", caption: "In the shallows" },
];

export const booking = {
  title: "Plan & book",
  intro: "Choose a trip, a date and your group. We'll open WhatsApp with your details filled in.",
  customDurations: [2, 3, 4] as const,
  guests: { min: 1, max: 20 },
  photo: { src: "/images/rudra-coast.jpeg", width: 864, height: 1152, alt: "The Rudra Gokarna on calm water, seen from a rocky Gokarna shore between trees" },
};

// Header buttons and the mobile menu's extra link.
export const header = {
  book: "Book now",
  bookShort: "Book",
  pickup: "Pick-up",
  pickupLabel: "Pick-up point on Google Maps",
  menuPickup: "Pick-up point",
  logoLabel: "Rudra Gokarna Adventures, home",
  openMenu: "Open menu",
  about: "About us",
};

// The phone-only bottom bar.
export const mobileBar = {
  label: "Quick contact",
  call: "Call",
  whatsapp: "WhatsApp",
};

// The "Book now" enquiry popup. Every label and option comes from here; the message is built in lib/whatsapp.ts.
export type EnquiryTypeId = TripPackage["id"] | "custom" | "occasion" | "question";
export const enquiry = {
  title: "What would you like to enquire about?",
  typesLegend: "Enquiry type",
  types: [
    ...packages.map((item) => ({ id: item.id as EnquiryTypeId, label: `${item.name} · ${item.durationHours} hrs`, phrase: `I'd like to enquire about the ${item.name} (${item.durationHours} hrs).` })),
    { id: "custom" as EnquiryTypeId, label: "Custom trip", phrase: "I'd like to enquire about a custom trip." },
    { id: "occasion" as EnquiryTypeId, label: "Special occasion / event", phrase: "I'd like to enquire about a special occasion / event." },
    { id: "question" as EnquiryTypeId, label: "Just a question", phrase: "I have a question about your boat trips." },
  ],
  optionalToggle: "Add date & group size",
  dateLabel: "Date",
  guestsLabel: "Guests",
  guestsUnset: "Not set",
  fewerGuests: "Fewer guests",
  moreGuests: "More guests",
  submit: "Continue on WhatsApp",
  note: "We'll open WhatsApp with your message ready to send.",
  greeting: "Hi Rudra Gokarna Adventures!",
  dateLine: "Date",
  guestsLine: "Guests",
  signature: "(Sent from therudraadventure.com)",
  cardCta: "Enquire",
  guests: booking.guests,
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
  { icon: "wildlife", text: "Wildlife sightings depend on conditions and aren't guaranteed." },
  { icon: "health", text: "Tell us about children, non-swimmers or health needs when you enquire." },
  { icon: "dates", text: "Ask us which dates are running." },
];

const byId = Object.fromEntries(packages.map((item) => [item.id, item])) as Record<TripPackage["id"], TripPackage>;

// Shared answers, reused by the landing pages and guides so the same question gets the same answer everywhere.
export const commonAnswers = {
  kids: "Tell us your children's ages when you enquire on WhatsApp or by phone, and we'll advise which trip suits your family. We'll confirm any age limits for your trip at the same time. Trips depend on sea and weather conditions, and everyone on board follows the crew's instructions.",
  nonSwimmers: "Tell us if anyone in your group can't swim when you enquire, and we'll advise which trips and activities suit them. Some activities, like snorkelling and swimming, happen in the water, while sightseeing and dolphin watching are from the boat. Trips depend on sea and weather conditions.",
  price: (subject: string) =>
    `The price of ${subject} is shared when you enquire, because it depends on the trip, your date and your group size. Send those details on WhatsApp or call ${contact.phones[0].display}, and we'll reply with the price and confirm availability. Every trip starts from Gokarna Beach, Gokarna, Karnataka.`,
  riverTrip: `A River Trip is a ${byId.river.durationHours}-hour trip from Gokarna Beach into the mangroves near Gokarna, with mangrove views from the water and kayaking between the trees. It suits nature lovers and anyone who prefers quiet channels to the open sea. Timings depend on conditions on the day, so ask us when you enquire.`,
  pickup: `Every boat trip starts from ${contact.pickup.label}. The pick-up point is pinned on Google Maps, with links in the Book section, the footer and the header. Ask us on WhatsApp what time to arrive, and allow a little extra time to find the spot on your first visit.`,
};

export const faq: readonly { question: string; answer: string | null }[] = [
  {
    question: "Which package suits us?",
    answer: `Choose by what you want to do. Premium (${byId.premium.durationHours} hours) covers the most, including kayaking, snorkelling, swimming and dolphin watching. Standard (${byId.standard.durationHours} hours) is shorter, with sightseeing, the mystery cave and dolphins. Exclusive (${byId.exclusive.durationHours} hours) is for fishing and bioluminescence, and River Trips (${byId.river.durationHours} hours) are for the mangroves. Send your group and date on WhatsApp for advice.`,
  },
  {
    question: "How long is each trip?",
    answer: `Our packages last ${Math.min(...packages.map((item) => item.durationHours))} to ${Math.max(...packages.map((item) => item.durationHours))} hours: ${packages.map((item) => `${item.shortName === "River" ? "River Trips" : item.shortName} ${item.durationHours} hours`).join(", ").replace(/, ([^,]+)$/, " and $1")}. Custom trips can be ${booking.customDurations.join(", ").replace(/, (\d)$/, " or $1")} hours, planned around your group. Every trip starts from Gokarna Beach; ask us which dates and departure times are running when you enquire.`,
  },
  { question: "What does a River Trip involve?", answer: "" },
  {
    question: "What is the Exclusive Package?",
    answer: `The Exclusive Package is our longest trip: ${byId.exclusive.durationHours} hours from Gokarna Beach, built around fishing and a bioluminescence trip. Bioluminescence is a natural glow in the water that depends on the season, the sea and the night, so it can't be guaranteed. Ask us about timing and conditions for your date.`,
  },
  { question: "Where do the boat trips start?", answer: "" },
  {
    question: "What time should we arrive for pick-up?",
    answer: contact.pickupTime, // hidden until the owner confirms it
  },
  { question: "Are the boat trips suitable for children?", answer: "" },
  { question: "Can non-swimmers join a boat trip?", answer: "" },
  {
    question: "What happens if the weather is bad?",
    answer: `Trips depend on sea and weather conditions, so check with us if the forecast looks uncertain. Message us on WhatsApp or call ${contact.phones[0].display} before your trip. Wildlife sightings and bioluminescence also depend on conditions and are never guaranteed, and calm, clear days make dolphins and underwater views easier to see.`,
  },
  {
    question: "How do we book a trip?",
    answer: `Use the Plan & book form: choose a trip, pick a date and your group size, and add your name and phone number. It opens WhatsApp with your message ready to send, or you can call ${contact.phones[0].display} instead. We'll confirm availability and the price, then meet you at Gokarna Beach.`,
  },
].map((item) => {
  const shared: Record<string, string> = {
    "What does a River Trip involve?": commonAnswers.riverTrip,
    "Where do the boat trips start?": commonAnswers.pickup,
    "Are the boat trips suitable for children?": commonAnswers.kids,
    "Can non-swimmers join a boat trip?": commonAnswers.nonSwimmers,
  };
  return item.answer === "" ? { ...item, answer: shared[item.question] } : item;
});

// "How to book" steps (an ordered list on the home page and the guide hub).
export const howToBook = {
  title: "How to book a boat trip in Gokarna",
  intro: `Booking takes four steps, and nothing is paid on this website. Use the Plan & book form or the "Book now" button, and WhatsApp opens with your details ready to send, or call ${contact.phones[0].display}. We confirm availability and the price before your trip.`,
  steps: [
    `Choose a trip: one of our ${["no", "one", "two", "three", "four", "five", "six"][packages.length] ?? packages.length} packages, or a custom trip of ${booking.customDurations.join(", ").replace(/, (\d)$/, " or $1")} hours.`,
    "Pick a date and your group size.",
    "Send your request on WhatsApp. We'll confirm availability and the price.",
    `Meet us at the pick-up point on ${contact.pickup.street}, pinned on Google Maps.`,
  ],
};

export const footer = {
  copyright: `© ${new Date().getFullYear()} ${business.name}`,
  legal: [
    { label: "About us", href: "/about" },
    { label: "Privacy policy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms" },
  ],
  legalLabel: "About and policies",
  credit: {
    label: "Designed & developed by",
    name: "Dishan Web Wings",
    url: "https://dishanwebwing.com/",
  },
};

// The 404 page. Phase 3 adds the activity landing pages to these links.
export const notFound = {
  title: "This page isn't here",
  text: "The link may be old or mistyped. These pages will help you find a boat trip from Gokarna Beach.",
  links: [
    { label: "Boat trip packages", href: "/packages" },
    { label: "Things to do on the water", href: "/adventures" },
    { label: "Plan and book a trip", href: "/#book" },
    { label: "Dolphin watching in Gokarna", href: "/dolphin-watching-gokarna" },
    { label: "Kayaking in Gokarna", href: "/kayaking-in-gokarna" },
    { label: "Private boat trips in Gokarna", href: "/private-boat-gokarna" },
    { label: "Gokarna boat trip guide", href: "/guides/gokarna-boat-trip-guide" },
  ],
};

// ---- Trust pages --------------------------------------------------------------------------------------------

export type InfoSection = { id: string; heading: string; paragraphs: readonly (string | null)[]; list?: readonly string[] | null };
export type InfoPage = {
  path: string;
  h1: string;
  crumb: string;
  title: string;
  description: string;
  answerSummary: string;
  sections: readonly InfoSection[];
  datePublished: string;
  updatedAt: string;
};

const minHours = Math.min(...packages.map((item) => item.durationHours));
const maxHours = Math.max(...packages.map((item) => item.durationHours));

export const aboutPage: InfoPage = {
  path: "/about",
  h1: "About Rudra Gokarna Adventures",
  crumb: "About",
  title: "About Rudra Gokarna Adventures | Gokarna Boat Trips",
  description: "Who we are: a boat-trip operator at Gokarna Beach, Karnataka, with The Rudra Gokarna boat, 2–4 hour trips and custom trips. Contact and pick-up.",
  answerSummary: `${business.name} is a boat-trip operator at Gokarna Beach, Karnataka, running ${minHours}–${maxHours} hour sea and mangrove trips with dolphin watching, kayaking and snorkelling. Trips run aboard our boat, ${business.boatName}, and custom trips are planned for couples, families and celebrations. Book on WhatsApp or by phone.`,
  sections: [
    { id: "who-we-are", heading: "Who we are", paragraphs: [about.canonical] },
    { id: "the-boat", heading: "The boat", paragraphs: [`${business.boatName} is our boat: ${boat.copy.charAt(0).toLowerCase()}${boat.copy.slice(1)}`] },
    { id: "the-crew", heading: "The crew", paragraphs: [pending.crewAbout] },
    {
      id: "not-rudra-adventures-rishikesh",
      heading: "Are you the same as Rudra Adventures in Rishikesh?",
      paragraphs: [
        `No. ${business.name} is a separate company running boat trips from Gokarna Beach, Karnataka. We aren't connected to any business in Rishikesh or Uttarakhand. Our only boat is ${business.boatName}, every trip starts from Gokarna Beach in Uttara Kannada, and you can reach us on ${contact.phones[0].display}.`,
      ],
    },
    {
      id: "contact",
      heading: "Contact and pick-up",
      paragraphs: [
        `Call or WhatsApp ${contact.phones[0].display} to ask a question or book. Every trip starts from ${contact.pickup.label}, and the pick-up point is pinned on Google Maps.`,
        contact.email ? `Email: ${contact.email}` : null,
      ],
    },
  ],
  datePublished: "2026-11-18",
  updatedAt: "2026-11-18",
};

const analyticsOn = Boolean(process.env.NEXT_PUBLIC_GA_ID);

export const privacyPage: InfoPage = {
  path: "/privacy-policy",
  h1: "Privacy policy",
  crumb: "Privacy policy",
  title: "Privacy Policy | Rudra Gokarna Adventures",
  description: "What Rudra Gokarna Adventures collects on this website and on WhatsApp, why, and your rights under India's DPDP Act 2023.",
  answerSummary:
    "This policy explains what information Rudra Gokarna Adventures handles when you use therudraadventure.com or contact us, and why. In short: the booking form and enquiry popup only prepare a WhatsApp message in your browser, nothing you type is stored on our website's servers, and we use your details only to answer you and arrange your trip.",
  sections: [
    {
      id: "who-we-are",
      heading: "Who we are",
      paragraphs: [
        `${business.name} runs boat trips from ${contact.pickup.label}. For this website and the messages you send us, we decide how your personal data is used, which makes us the "Data Fiduciary" under India's Digital Personal Data Protection Act, 2023 (the DPDP Act). You can reach us on ${contact.phones[0].display} by call or WhatsApp.`,
        contact.email ? `Email: ${contact.email}` : null,
      ],
    },
    {
      id: "what-we-collect",
      heading: "What we collect and why",
      paragraphs: ["We only handle the information you choose to give us, plus the basic technical data any website needs to work."],
      list: [
        "Booking form and enquiry popup: the trip, date and group size, and in the booking form your name and phone number. Your browser uses them to write a WhatsApp message; they aren't sent to or stored on our website's servers. If you send the message, we receive it in WhatsApp like any other message.",
        "Messages and calls: what you tell us on WhatsApp or by phone, used to answer your questions, share the price and arrange your trip.",
        "Session storage: the enquiry popup remembers the last enquiry type you chose until you close the tab. It stays in your browser and is never sent to us.",
        analyticsOn
          ? "Analytics: we use Google Analytics 4 to count visits and clicks on the WhatsApp, phone and map links, with IP anonymisation requested. These events don't include your name, phone number or message. Google Analytics sets cookies on your device."
          : "Analytics: we don't currently use analytics or advertising cookies. If we add Google Analytics, this page will say so first.",
        "Technical logs: our hosting provider, Vercel, processes standard request data (such as IP address, browser type and the pages requested) to deliver this website and protect it from abuse.",
      ],
    },
    {
      id: "third-parties",
      heading: "WhatsApp, Google Maps and other services",
      paragraphs: [
        "Links to WhatsApp (wa.me) and Google Maps open those services, which handle your data under their own privacy policies. Our fonts and images are served from this website itself, not from third-party font or image services.",
      ],
    },
    {
      id: "sharing",
      heading: "What we don't do",
      paragraphs: ["We don't sell your personal data or use it for advertising. We share it only when that's needed to arrange your trip, or when the law requires it."],
    },
    {
      id: "retention",
      heading: "How long we keep it",
      paragraphs: ["We keep your messages only as long as we need them to answer you and arrange your trip, or as long as the law requires. You can ask us to delete them at any time."],
    },
    {
      id: "your-rights",
      heading: "Your rights under the DPDP Act",
      paragraphs: [`Under the DPDP Act you can ask us for the following. To use any of these rights, call or WhatsApp ${contact.phones[0].display}.`],
      list: [
        "A summary of the personal data we hold about you and how we use it",
        "Correction, completion or updating of your data",
        "Erasure of your data, unless the law requires us to keep it",
        "Withdrawal of your consent at any time (this doesn't affect what was done before)",
        "Redressal of any grievance about how we've handled your data",
        "Nomination of someone to exercise these rights for you in case of death or incapacity",
      ],
    },
    {
      id: "complaints",
      heading: "Complaints",
      paragraphs: [
        `If you have a concern, contact us first on ${contact.phones[0].display} and we'll try to resolve it. If you're not satisfied with our response, you can complain to the Data Protection Board of India.`,
        pending.grievanceOfficer ? `Grievance officer: ${pending.grievanceOfficer}` : null,
      ],
    },
    {
      id: "children",
      heading: "Children",
      paragraphs: ["This website isn't aimed at children, and we don't knowingly collect children's personal data through it. Parents or guardians enquire and book for children."],
    },
    {
      id: "changes",
      heading: "Changes to this policy",
      paragraphs: ["If anything changes, we'll update this page. The date at the top shows when it was last updated."],
    },
  ],
  datePublished: "2026-11-18",
  updatedAt: "2026-11-18",
};

export const termsPage: InfoPage = {
  path: "/terms",
  h1: "Terms of booking",
  crumb: "Terms",
  title: "Terms of Booking | Rudra Gokarna Adventures",
  description: "How booking a boat trip with Rudra Gokarna Adventures works: confirmation on WhatsApp, weather-dependent trips, wildlife and cancellations.",
  answerSummary:
    "These terms cover enquiries and bookings with Rudra Gokarna Adventures for boat trips from Gokarna Beach, Gokarna, Karnataka. In short: bookings are made and confirmed on WhatsApp or by phone, every trip depends on sea and weather conditions, and wildlife sightings and bioluminescence depend on nature, so they can't be guaranteed.",
  sections: [
    {
      id: "booking",
      heading: "Booking",
      paragraphs: [
        `You can enquire through the Plan & book form, the enquiry popup, WhatsApp or a phone call on ${contact.phones[0].display}. A booking is confirmed only when we confirm it to you on WhatsApp or by phone, with the trip, date, group size and price.`,
      ],
    },
    { id: "prices", heading: "Prices", paragraphs: ["Prices are shared when you enquire. The price we confirm for your booking is the one that applies."] },
    {
      id: "weather",
      heading: "Weather and sea conditions",
      paragraphs: ["Every trip depends on sea and weather conditions. If conditions aren't suitable, the trip may be shortened, changed or rescheduled, and we'll tell you as early as we can."],
    },
    {
      id: "wildlife",
      heading: "Wildlife and natural events",
      paragraphs: ["Dolphins are wild animals and bioluminescence is a natural event. Both depend on conditions, so neither can be guaranteed on any trip."],
    },
    {
      id: "safety",
      heading: "Safety on board",
      paragraphs: [
        "Tell us about children, non-swimmers and any health needs when you enquire. Everyone on board follows the crew's instructions, and the crew may stop an activity if it isn't safe.",
      ],
    },
    {
      id: "cancellation",
      heading: "Cancellation and refunds",
      paragraphs: [pending.cancellationPolicy ?? `Ask us about cancellation and refunds on WhatsApp or by phone (${contact.phones[0].display}) before you book, and we'll confirm them with your booking.`],
    },
    { id: "photos", heading: "Photos on this website", paragraphs: ["Activity and place photos marked as illustrative are stock images, not photos from our trips."] },
    { id: "law", heading: "Governing law", paragraphs: ["These terms are governed by the laws of India."] },
  ],
  datePublished: "2026-11-18",
  updatedAt: "2026-11-18",
};
