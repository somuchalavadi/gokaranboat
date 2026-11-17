// Guides: a hub page plus focused how-to and planning articles. Components only render this data.
// Same rules as data/seo-pages.ts: confirmed facts from data/site.ts plus true, general travel guidance.
// Unknown facts are null and their lines are left out. Two guides are built only once their data exists:
// the prices guide (when any package has a price) and the sighting log (when data/sightings.ts has a month).
import { about, booking, contact, goodToKnow, packages, pending, type ImageAsset } from "@/data/site";
import { carry, getSeoPage, joinList, linkLabel, type KeyFact, type PageFaq, type SeoPageSlug } from "@/data/seo-pages";
import { sightings } from "@/data/sightings";

export type GuideSlug =
  | "gokarna-boat-trip-guide"
  | "how-to-reach-gokarna-beach-boat-pickup"
  | "best-time-for-dolphin-watching-gokarna"
  | "gokarna-boat-trip-prices"
  | "dolphin-sighting-log";

export type GuideLink = { href: string; label: string };
export type GuideTable = { caption: string; head: readonly string[]; rows: readonly (readonly string[])[] };
export type GuideSection = {
  id: string;
  heading: string;
  paragraphs: readonly (string | null)[];
  list?: readonly string[] | null;
  links?: readonly GuideLink[];
  table?: GuideTable;
};

export type Guide = {
  slug: GuideSlug;
  h1: string;
  /** Descriptive anchor text used wherever other pages link here. */
  linkLabel: string;
  title: string;
  description: string;
  primaryKeyword: string;
  answerSummary: string;
  keyFacts: readonly KeyFact[];
  sections: readonly GuideSection[];
  faqs: readonly PageFaq[];
  image: ImageAsset;
  datePublished: string;
  updatedAt: string;
};

export const guideHubSlug: GuideSlug = "gokarna-boat-trip-guide";
export const guidePath = (slug: GuideSlug) => `/guides/${slug}`;

const date = "2026-11-17";
const hours = packages.map((item) => item.durationHours);
const span = `${Math.min(...hours)} to ${Math.max(...hours)} hours`;
const priced = packages.filter((item): item is typeof item & { price: number } => item.price !== null);
const orList = (items: readonly string[]) => joinList(items).replace(/ and ([^,]+)$/, " or $1");
const theNames = (items: readonly { name: string }[]) => joinList(items.map((item) => `the ${item.name}`));
const rupees = (value: number) => `₹${value.toLocaleString("en-IN")}`;
const landing = (slug: SeoPageSlug): GuideLink => ({ href: `/${slug}`, label: linkLabel(slug) });
const pickupFact: KeyFact = { label: "Pick-up point", value: contact.pickup.label, href: contact.pickup.mapsUrl };
const bookFact: KeyFact = { label: "How to book", value: `WhatsApp or call ${contact.phones[0].display}` };
const dolphinPackages = packages.filter((item) => item.highlights.includes("dolphins"));
const dolphinImage = getSeoPage("dolphin-watching-gokarna")?.heroImage ?? about.image;

// ---- Hub ---------------------------------------------------------------------------------------

const hub: Guide = {
  slug: "gokarna-boat-trip-guide",
  h1: "Gokarna boat trip guide",
  linkLabel: "Gokarna boat trip guide",
  title: "Gokarna Boat Trip Guide | Rudra Gokarna Adventures",
  description: "Plan a boat trip from Gokarna Beach: which trip to choose, how long trips last, prices, pick-up, safety, what to bring and the best time for dolphins.",
  primaryKeyword: "Gokarna boat trip",
  answerSummary: `Boat trips from Gokarna Beach last ${span}. Choose by what you want to do: the Premium Package covers the most, Standard is shorter, Exclusive is for fishing and bioluminescence, and River Trips go into the mangroves. Prices and dates are confirmed on WhatsApp.`,
  keyFacts: [
    { label: "Trips", value: joinList(packages.map((item) => `${item.name} (${item.durationHours} hours)`)) },
    pickupFact,
    { label: "Price", value: priced.length ? `From ${rupees(Math.min(...priced.map((item) => item.price)))}` : "Shared when you enquire" },
    { label: "Season", value: pending.season },
    bookFact,
  ],
  sections: [
    {
      id: "choose",
      heading: "Which boat trip should you choose?",
      paragraphs: [`We run ${["no", "one", "two", "three", "four", "five", "six"][packages.length] ?? packages.length} trips from Gokarna Beach. Each one is built around different things to do, so start with what your group wants from the day.`],
      list: packages.map((item) => `${item.name} (${item.durationHours} hours): ${item.description} Best for: ${item.bestFor.charAt(0).toLowerCase()}${item.bestFor.slice(1)}`),
      links: [{ href: "/packages", label: "Compare every package" }],
    },
    {
      id: "price",
      heading: "How much does a Gokarna boat trip cost?",
      paragraphs: [
        priced.length
          ? `Trips start from ${rupees(Math.min(...priced.map((item) => item.price)))}. The price depends on the package and your group size.`
          : "Prices depend on the package, your date and your group size, so we share them when you enquire. Send your date and group size on WhatsApp and we'll reply with the price for your trip.",
      ],
      links: priced.length ? [{ href: guidePath("gokarna-boat-trip-prices"), label: "Gokarna boat trip prices" }] : [],
    },
    {
      id: "timing",
      heading: "How long are the trips, and when do they run?",
      paragraphs: [
        `${joinList(packages.map((item) => `${item.name} ${item.durationHours} hours`))}. Custom trips can be ${orList(booking.customDurations.map(String))} hours.`,
        pending.season ? `Season: ${pending.season}` : null,
        "Ask us which dates and departure times are running when you enquire.",
      ],
    },
    {
      id: "pickup",
      heading: "Where do the trips start?",
      paragraphs: [`Every trip starts from ${contact.pickup.label}. The pick-up point is pinned on Google Maps, so you can get directions from wherever you're staying.`],
      links: [
        { href: guidePath("how-to-reach-gokarna-beach-boat-pickup"), label: "How to reach the Gokarna Beach pick-up" },
        { href: contact.pickup.mapsUrl, label: "Pick-up point on Google Maps" },
      ],
    },
    {
      id: "safety",
      heading: "Safety and sea conditions",
      paragraphs: [
        "Trips depend on sea and weather conditions. Tell us about children, non-swimmers or any health needs when you enquire, and follow the crew's instructions on board.",
      ],
      list: goodToKnow.map((item) => item.text).filter((text) => !text.startsWith("Trips depend on sea")),
    },
    {
      id: "bring",
      heading: "What to bring",
      paragraphs: ["Bring what you'd want for a few hours on open water in the sun. If your trip includes swimming, snorkelling or kayaking, add swimwear, a towel and a change of clothes."],
      list: carry,
    },
    {
      id: "dolphins",
      heading: "Dolphin watching",
      paragraphs: [
        `Dolphin watching is part of ${theNames(dolphinPackages)}. Dolphins are wild, so sightings depend on conditions and can't be promised, but a calm sea makes them much easier to spot.`,
      ],
      links: [
        { href: guidePath("best-time-for-dolphin-watching-gokarna"), label: "Best time for dolphin watching in Gokarna" },
        landing("dolphin-watching-gokarna"),
        ...(sightings.length ? [{ href: guidePath("dolphin-sighting-log"), label: "Our dolphin sighting log" }] : []),
      ],
    },
    {
      id: "more",
      heading: "Night, river and private trips",
      paragraphs: [
        "Beyond the coastal trips, the Exclusive Package covers fishing and a bioluminescence trip, River Trips head into the mangroves by boat and kayak, and private trips are planned around couples, families and celebrations.",
      ],
      links: [landing("bioluminescence-gokarna"), landing("fishing-trip-gokarna"), landing("mangrove-river-trip-gokarna"), landing("kayaking-in-gokarna"), landing("snorkelling-in-gokarna"), landing("private-boat-gokarna")],
    },
  ],
  faqs: [
    { question: "Do I need to book a Gokarna boat trip in advance?", answer: "Enquiring ahead is the easiest way to get the trip and date you want. Send your date and group size on WhatsApp and we'll confirm availability and the price." },
    { question: "Can we plan a private or custom trip?", answer: `Yes. Custom trips can be ${orList(booking.customDurations.map(String))} hours and are planned around couples, families, New Year and other occasions.` },
    { question: "Are dolphin sightings guaranteed?", answer: "No. Dolphins are wild animals, so sightings depend on conditions and nobody can promise one, but a calm sea makes them easier to spot." },
  ],
  image: about.image,
  datePublished: date,
  updatedAt: date,
};

// ---- How to reach the pick-up ------------------------------------------------------------------

const { directions } = contact.pickup;

const reach: Guide = {
  slug: "how-to-reach-gokarna-beach-boat-pickup",
  h1: "How to reach the Gokarna Beach boat pick-up",
  linkLabel: "How to reach the Gokarna Beach pick-up",
  title: "How to Reach the Gokarna Beach Boat Pick-up",
  description: "Where our Gokarna boat trips start, how to find the pick-up point on Gokarna Beach, what to bring and what to do if you're running late.",
  primaryKeyword: "Gokarna Beach boat pick-up",
  answerSummary: `Our boat trips start from ${contact.pickup.label}. Open the pick-up pin on Google Maps for directions from where you're staying, and ask us on WhatsApp what time to arrive for your trip.`,
  keyFacts: [
    pickupFact,
    { label: "Arrive", value: contact.pickupTime },
    { label: "Landmark", value: directions.landmark },
    { label: "Parking", value: directions.parking },
    bookFact,
  ],
  sections: [
    {
      id: "pickup",
      heading: "The pick-up point",
      paragraphs: [
        `Every trip leaves from ${contact.pickup.label}. The exact spot is pinned on Google Maps: open the link on your phone and it will give you walking, driving or riding directions from wherever you are.`,
        directions.landmark,
      ],
      links: [{ href: contact.pickup.mapsUrl, label: "Open the pick-up point on Google Maps" }],
    },
    {
      id: "getting-to-gokarna",
      heading: "Getting to Gokarna",
      paragraphs: [
        "Gokarna is a temple town on the coast of the Uttara Kannada district in Karnataka. The nearest station is Gokarna Road, about 8–10 km from town (auto/taxi ~15–20 min). Ankola and Kumta are better-connected alternatives.",
        directions.railwayStation,
        directions.busStand,
      ],
    },
    {
      id: "arriving",
      heading: "Arriving for your trip",
      paragraphs: [
        contact.pickupTime ? `Please arrive ${contact.pickupTime}.` : "Ask us on WhatsApp what time to arrive for your trip. Leave a little extra time to find the spot on the beach, especially on your first visit.",
        directions.parking,
      ],
    },
    {
      id: "bring",
      heading: "What to bring",
      paragraphs: ["Pack light, and keep your phone in something waterproof."],
      list: carry,
    },
    {
      id: "late",
      heading: "If you're running late or can't find us",
      paragraphs: [`Call or WhatsApp ${contact.phones[0].display} and tell us where you are. You can also share your live location on WhatsApp.`],
    },
  ],
  faqs: [
    { question: "Where does the Gokarna boat trip start?", answer: `From ${contact.pickup.label}. The pick-up point is pinned on Google Maps.` },
    { question: "What time should we arrive?", answer: contact.pickupTime ? `Please arrive ${contact.pickupTime}.` : "Ask us on WhatsApp what time to arrive for your trip." },
    { question: "Is there parking near the pick-up?", answer: directions.parking },
  ],
  image: booking.photo,
  datePublished: date,
  updatedAt: date,
};

// ---- Best time for dolphin watching ------------------------------------------------------------

const bestTime: Guide = {
  slug: "best-time-for-dolphin-watching-gokarna",
  h1: "Best time for dolphin watching in Gokarna",
  linkLabel: "Best time for dolphin watching in Gokarna",
  title: "Best Time for Dolphin Watching in Gokarna",
  description: "When dolphin watching from Gokarna works best: calm seas, the monsoon, time of day, and tips for spotting dolphins from the boat.",
  primaryKeyword: "best time for dolphin watching Gokarna",
  answerSummary: `Dolphins are easiest to spot on a calm, clear day, when fins and splashes stand out. Sightings depend on sea conditions and are never guaranteed. Dolphin watching is part of ${theNames(dolphinPackages)}, both leaving from Gokarna Beach.`,
  keyFacts: [
    { label: "Trips with dolphin watching", value: joinList(dolphinPackages.map((item) => `${item.name} (${item.durationHours} hours)`)) },
    { label: "Season", value: pending.season },
    { label: "Sightings", value: "Depend on conditions; not guaranteed" },
    pickupFact,
    bookFact,
  ],
  sections: [
    {
      id: "calm-sea",
      heading: "A calm sea matters most",
      paragraphs: [
        "Dolphins are spotted when a fin breaks the surface or a splash shows a little way off. On a flat, glassy sea those signs stand out; in choppy water with whitecaps they disappear. That makes sea state the biggest single factor in a good dolphin trip.",
        "Sea conditions change from day to day and through the day. Ask us which departure times are running on your date and what the sea is usually like then.",
      ],
    },
    {
      id: "monsoon",
      heading: "The monsoon",
      paragraphs: [
        "Karnataka's annual monsoon fishing ban runs from June 1 to July 31, and sea conditions are usually rough through the monsoon. Ask us which dates are running.",
        pending.season ? `Our season: ${pending.season}` : null,
      ],
    },
    {
      id: "tips",
      heading: "Tips for spotting dolphins",
      paragraphs: ["A few habits help everyone on board:"],
      list: [
        "Scan the water slowly, a little way out from the boat, rather than right beside it",
        "Watch for a curved fin, a splash, or birds gathering over one spot",
        "Keep quiet when the crew points something out, and follow their instructions",
        "Keep your camera ready but enjoy the moment: sightings can be brief",
        "Polarised sunglasses cut glare off the water",
      ],
    },
    {
      id: "guarantee",
      heading: "Why no one can promise a sighting",
      paragraphs: [
        "Dolphins are wild animals that move with the fish they feed on, so where and when they surface depends on conditions and changes from day to day. Both trips that include dolphin watching also include sightseeing along the coast and the mystery cave, so there is plenty to see either way.",
      ],
      links: sightings.length ? [{ href: guidePath("dolphin-sighting-log"), label: "See our monthly dolphin sighting log" }] : [],
    },
    {
      id: "trips",
      heading: "Trips that include dolphin watching",
      paragraphs: dolphinPackages.map((item) => `${item.name} (${item.durationHours} hours): ${item.description}`),
      links: [landing("dolphin-watching-gokarna"), { href: "/packages", label: "Compare every package" }],
    },
  ],
  faqs: [
    { question: "What is the best month for dolphin watching in Gokarna?", answer: pending.season ? `Trips run ${pending.season}. Within that, pick a calm day: sea state matters more than the month.` : "Sea conditions matter more than the month: calm, clear days make dolphins easier to spot, and sightings always depend on conditions. Ask us which dates are running." },
    { question: "Is morning or afternoon better for dolphins?", answer: "Calm water matters more than the hour. Sea conditions change from day to day, so ask us which departure times are running and what the sea is usually like then." },
    { question: "Can I see dolphins during the monsoon?", answer: "Karnataka's annual monsoon fishing ban runs from June 1 to July 31, and sea conditions are usually rough through the monsoon. Ask us which dates are running." },
  ],
  image: dolphinImage,
  datePublished: date,
  updatedAt: date,
};

// ---- Prices (built only once a price exists) --------------------------------------------------

const prices: Guide = {
  slug: "gokarna-boat-trip-prices",
  h1: "Gokarna boat trip prices",
  linkLabel: "Gokarna boat trip prices",
  title: "Gokarna Boat Trip Prices | Rudra Gokarna Adventures",
  description: "Boat trip prices from Gokarna Beach for every package, what each price includes and how to book.",
  primaryKeyword: "Gokarna boat ride price",
  answerSummary: priced.length
    ? `Boat trips from Gokarna Beach start from ${rupees(Math.min(...priced.map((item) => item.price)))}. ${joinList(priced.map((item) => `${item.name} (${item.durationHours} hours) from ${rupees(item.price)}`))}. Confirm your date and group size on WhatsApp.`
    : "",
  keyFacts: [...priced.map((item) => ({ label: item.name, value: `From ${rupees(item.price)}` })), pickupFact, bookFact],
  sections: [
    {
      id: "table",
      heading: "Prices by package",
      paragraphs: ["Prices confirmed by Rudra Gokarna Adventures. Message us to confirm the price for your date and group size."],
      table: {
        caption: "Gokarna boat trip prices by package",
        head: ["Package", "Duration", "Price"],
        rows: packages.map((item) => [item.name, `${item.durationHours} hours`, item.price === null ? "On enquiry" : `From ${rupees(item.price)}`]),
      },
      links: [{ href: "/packages", label: "What each package includes" }],
    },
  ],
  faqs: [],
  image: about.image,
  datePublished: date,
  updatedAt: date,
};

// ---- Dolphin sighting log (built only once data/sightings.ts has a month) --------------------

const monthName = (month: string) => new Date(`${month}-01T00:00:00Z`).toLocaleDateString("en-IN", { month: "long", year: "numeric", timeZone: "UTC" });
const totalTrips = sightings.reduce((sum, item) => sum + item.trips, 0);
const totalSightings = sightings.reduce((sum, item) => sum + item.tripsWithSightings, 0);

const sightingLog: Guide = {
  slug: "dolphin-sighting-log",
  h1: "Gokarna dolphin sighting log",
  linkLabel: "Our dolphin sighting log",
  title: "Gokarna Dolphin Sighting Log | Rudra Gokarna Adventures",
  description: "Month-by-month dolphin sightings on our Gokarna boat trips: how many trips went out and how many saw dolphins.",
  primaryKeyword: "dolphin sightings Gokarna",
  answerSummary: sightings.length
    ? `Across ${totalTrips} recorded trips from Gokarna Beach, ${totalSightings} saw dolphins (${Math.round((totalSightings / totalTrips) * 100)}%). The table below lists every month we have logged, so you can see how sightings vary through the season.`
    : "",
  keyFacts: [
    { label: "Months logged", value: sightings.length ? String(sightings.length) : null },
    { label: "Trips recorded", value: sightings.length ? String(totalTrips) : null },
    { label: "Trips with sightings", value: sightings.length ? String(totalSightings) : null },
  ],
  sections: [
    {
      id: "log",
      heading: "Sightings by month",
      paragraphs: ["Each row is one month of trips that included dolphin watching."],
      table: {
        caption: "Dolphin sightings on Rudra Gokarna Adventures trips, by month",
        head: ["Month", "Trips", "Trips with sightings", "Notes"],
        rows: sightings.map((item) => [monthName(item.month), String(item.trips), String(item.tripsWithSightings), item.notes ?? ""]),
      },
      links: [{ href: guidePath("best-time-for-dolphin-watching-gokarna"), label: "Best time for dolphin watching in Gokarna" }, landing("dolphin-watching-gokarna")],
    },
  ],
  faqs: [],
  image: dolphinImage,
  datePublished: date,
  updatedAt: date,
};

export const guides: readonly Guide[] = [hub, reach, bestTime, ...(priced.length ? [prices] : []), ...(sightings.length ? [sightingLog] : [])];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
