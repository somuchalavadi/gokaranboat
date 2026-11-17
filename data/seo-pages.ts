// Landing pages for search intent: one per activity or trip type. Components only render this data.
// Rules: only facts the owner has confirmed (in data/site.ts) plus true, general travel guidance. Anything
// unknown is null with a TODO(owner) note, and the page leaves that line out.
import { contact, highlights, packages, pending, type HighlightId, type ImageAsset, type TripPackage } from "@/data/site";

export type KeyFact = { label: string; value: string | null; href?: string };
export type ContentSection = { id: string; heading: string; paragraphs: readonly (string | null)[]; list?: readonly string[] | null };
export type PageFaq = { question: string; answer: string | null };

export type SeoPageSlug =
  | "dolphin-watching-gokarna"
  | "kayaking-in-gokarna"
  | "snorkelling-in-gokarna"
  | "mangrove-river-trip-gokarna"
  | "fishing-trip-gokarna"
  | "bioluminescence-gokarna"
  | "private-boat-gokarna";

export type SeoPage = {
  slug: SeoPageSlug;
  h1: string;
  /** Descriptive anchor text used wherever other pages link here. */
  linkLabel: string;
  title: string;
  description: string;
  primaryKeyword: string;
  answerSummary: string;
  packageIds: readonly TripPackage["id"][];
  /** Package highlights this page is about (used for "Included in" and internal links). */
  highlightIds: readonly HighlightId[];
  keyFacts: readonly KeyFact[];
  sections: readonly ContentSection[];
  faqs: readonly PageFaq[];
  relatedSlugs: readonly SeoPageSlug[];
  heroImage: ImageAsset;
  gallery: readonly ImageAsset[];
  whatsappMessage: string;
  updatedAt: string;
};

// ---- Shared facts and helpers ------------------------------------------------------------------

const updatedAt = "2026-11-17";
const byId = (id: TripPackage["id"]) => packages.find((item) => item.id === id) as TripPackage;
export const joinList = (items: readonly string[]) => (items.length <= 1 ? (items[0] ?? "") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`);
const lower = (ids: readonly HighlightId[]) => ids.map((id) => highlights[id].toLowerCase());
const hours = (id: TripPackage["id"]) => `${byId(id).durationHours}-hour`;
const nameWithHours = (id: TripPackage["id"]) => `${hours(id)} ${byId(id).name}`;

// General packing guidance (true for any boat trip). TODO(owner): confirm, and add anything you provide or require.
export const carry = ["Sun protection: a cap or hat, sunscreen and sunglasses", "Drinking water", "Light clothes you don't mind getting splashed", "A dry bag or zip pouch for your phone", "Any medicine you need, such as for motion sickness"];
const carryWet = [...carry.slice(0, 3), "Swimwear, a towel and a change of clothes", ...carry.slice(3)];

export function keyFacts(ids: readonly TripPackage["id"][], carryList: readonly string[]): KeyFact[] {
  const prices = ids.map((id) => byId(id).price).filter((price): price is number => price !== null);
  const ages = ids.map((id) => byId(id).minAge).filter((age): age is number => age !== null);
  const timings = ids.map((id) => byId(id).timings).filter((time): time is string => time !== null);
  return [
    { label: "Price", value: prices.length ? `From ₹${Math.min(...prices).toLocaleString("en-IN")}` : "Shared when you enquire" },
    { label: "Duration", value: joinList(ids.map((id) => `${byId(id).durationHours} hours (${byId(id).shortName})`)) },
    { label: "Departure times", value: timings.length ? timings.join("; ") : null },
    { label: "Pick-up point", value: contact.pickup.label, href: contact.pickup.mapsUrl },
    { label: "Minimum age", value: ages.length ? `${Math.min(...ages)} years` : null },
    { label: "Season", value: pending.season },
    { label: "Included", value: ids.map((id) => `${byId(id).shortName}: ${lower(byId(id).highlights).join(", ")}`).join(". ") },
    { label: "What to carry", value: carryList.map((item) => item.split(":")[0]).join(", ") },
  ];
}

const safetyLine = "Trips depend on sea and weather conditions. Tell us about children, non-swimmers or any health needs when you enquire, and follow the crew's instructions on board.";
const priceAnswer = "Prices are shared when you enquire on WhatsApp or by phone. Send your date and group size and we'll reply with the price for your trip.";
const kidsAnswer = "Tell us your children's ages when you enquire, and we'll advise which trip suits your family.";

// ---- Pages -------------------------------------------------------------------------------------

export const seoPages: readonly SeoPage[] = [
  {
    slug: "dolphin-watching-gokarna",
    h1: "Dolphin watching in Gokarna",
    linkLabel: "Dolphin watching in Gokarna",
    title: "Dolphin Watching in Gokarna by Boat | Rudra Gokarna",
    description: "Watch for dolphins on a boat trip from Gokarna Beach. Part of our 3-hour Premium and 2-hour Standard trips. Sightings aren't guaranteed.",
    primaryKeyword: "dolphin watching Gokarna",
    answerSummary: `Rudra Gokarna Adventures runs boat trips from Gokarna Beach that include time out at sea watching for dolphins. Dolphin watching is part of the ${nameWithHours("premium")} and the ${nameWithHours("standard")}. Dolphins are wild, so sightings aren't guaranteed. Prices are shared when you enquire on WhatsApp or by phone.`,
    packageIds: ["standard", "premium"],
    highlightIds: ["dolphins"],
    keyFacts: keyFacts(["standard", "premium"], carry),
    sections: [
      {
        id: "what-you-do",
        heading: "What you'll do",
        paragraphs: [
          `The boat leaves Gokarna Beach and heads along the coast, and part of the trip is spent out at sea watching the water for dolphins. On the ${byId("standard").name} that sits alongside ${joinList(lower(byId("standard").highlights.filter((id) => id !== "dolphins")))}. The ${byId("premium").name} adds ${joinList(lower(byId("premium").highlights.filter((id) => !byId("standard").highlights.includes(id))))}.`,
          "Dolphins are wild animals, so whether and where they surface changes from day to day. Nobody can promise a sighting. What helps is a calm sea and patient eyes: watch for a fin breaking the surface or a splash a little way off, and keep your camera ready rather than glued to your eye.",
        ],
      },
      {
        id: "route",
        heading: "Route",
        // TODO(owner): which stretch of coast and which beaches the dolphin-watching route covers.
        paragraphs: [null],
      },
      {
        id: "duration",
        heading: "How long it takes",
        paragraphs: [`The ${byId("standard").name} runs for ${byId("standard").durationHours} hours and the ${byId("premium").name} for ${byId("premium").durationHours} hours. Ask us which dates and times are running when you send your enquiry.`],
      },
      {
        id: "included",
        heading: "What's included",
        paragraphs: ["Dolphin watching is part of these trips:"],
        list: [byId("standard"), byId("premium")].map((item) => `${item.name} (${item.durationHours} hours): ${lower(item.highlights).join(", ")}`),
      },
      { id: "carry", heading: "What to carry", paragraphs: ["Out at sea there's little shade, and spray reaches the deck. Bring:"], list: carry },
      {
        id: "who",
        heading: "Who it suits",
        paragraphs: [
          "Families, couples and groups who want time on the water and a chance to see wildlife. The Standard trip is a good first look at the coast in two hours; the Premium trip suits anyone who wants to fit in swimming, snorkelling and kayaking too.",
          kidsAnswer,
        ],
      },
      { id: "safety", heading: "Safety", paragraphs: [safetyLine] },
      {
        id: "best-time",
        heading: "Best time to go",
        paragraphs: [
          "A calm, clear sea makes it easier to notice fins and splashes, and choppy water makes it harder. Sightings can happen at any time of day, though, and are never guaranteed.",
          pending.season ? `Trips run ${pending.season}.` : null,
        ],
      },
    ],
    faqs: [
      { question: "Will we definitely see dolphins in Gokarna?", answer: "No. Dolphins are wild, so sightings aren't guaranteed, but every Premium and Standard trip includes time watching for them out at sea." },
      { question: "Which boat trips include dolphin watching?", answer: `The ${nameWithHours("standard")} and the ${nameWithHours("premium")}. Both leave from ${contact.pickup.label}.` },
      { question: "How much is dolphin watching in Gokarna?", answer: priceAnswer },
      { question: "Is dolphin watching suitable for children?", answer: kidsAnswer },
    ],
    relatedSlugs: ["kayaking-in-gokarna", "snorkelling-in-gokarna", "private-boat-gokarna"],
    heroImage: { src: "/images/stock/dolphin-watching.webp", width: 1600, height: 1082, alt: "Dolphins breaking the surface of blue ocean waves (illustrative photo)" },
    gallery: [],
    whatsappMessage: "Hi, I'd like to go dolphin watching. Which trip would you suggest?",
    updatedAt,
  },
  {
    slug: "kayaking-in-gokarna",
    h1: "Kayaking in Gokarna",
    linkLabel: "Kayaking in Gokarna",
    title: "Kayaking in Gokarna: Sea and Mangroves | Rudra Gokarna",
    description: "Kayak in Gokarna on a boat trip from Gokarna Beach: at sea on the 3-hour Premium trip, or through the mangroves on a 2-hour River Trip.",
    primaryKeyword: "kayaking in Gokarna",
    answerSummary: `Rudra Gokarna Adventures offers kayaking in Gokarna two ways: at sea as part of the ${nameWithHours("premium")}, or among the mangroves on a ${byId("river").durationHours}-hour River Trip. Both start from Gokarna Beach. Tell us if you've never kayaked before when you enquire. Prices are shared on WhatsApp or by phone.`,
    packageIds: ["premium", "river"],
    highlightIds: ["kayaking", "mangrove-kayaking"],
    keyFacts: keyFacts(["premium", "river"], carryWet),
    sections: [
      {
        id: "what-you-do",
        heading: "What you'll do",
        paragraphs: [
          `There are two ways to kayak with us. On the ${byId("premium").name} the boat takes you along the coast and kayaking is one of the activities, alongside ${joinList(lower(byId("premium").highlights.filter((id) => id !== "kayaking")))}.`,
          `On a River Trip the setting changes completely: you head into the mangroves for ${joinList(lower(byId("river").highlights))}. If you want quieter water and trees instead of open sea, this is the one to choose.`,
          "Kayaking is a gentle workout for the arms and shoulders. Short, steady strokes are easier than big ones, and it's fine to rest and drift for a moment.",
        ],
      },
      {
        id: "route",
        heading: "Where you paddle",
        // TODO(owner): name the river for the mangrove kayaking and roughly how long the paddle is.
        paragraphs: [null],
      },
      {
        id: "duration",
        heading: "How long it takes",
        paragraphs: [`The ${byId("premium").name} lasts ${byId("premium").durationHours} hours in total and the River Trip ${byId("river").durationHours} hours. Kayaking is part of each trip rather than the whole of it. Ask us which dates are running.`],
      },
      {
        id: "included",
        heading: "What's included",
        paragraphs: ["Kayaking is part of these trips:"],
        list: [byId("premium"), byId("river")].map((item) => `${item.name} (${item.durationHours} hours): ${lower(item.highlights).join(", ")}`),
      },
      { id: "carry", heading: "What to carry", paragraphs: ["Expect to get wet, especially climbing in and out of the kayak. Bring:"], list: carryWet },
      {
        id: "who",
        heading: "Who it suits",
        paragraphs: [
          "Couples and groups who like to be active, and anyone who wants to see the coast or the mangroves at water level. Tell us if anyone in your group hasn't kayaked before or can't swim, so we can suggest the right trip.",
        ],
      },
      { id: "safety", heading: "Safety", paragraphs: [safetyLine] },
      {
        id: "best-time",
        heading: "Best time to go",
        paragraphs: ["Calmer water makes paddling easier and more comfortable, so sea conditions matter more for kayaking than for sightseeing.", pending.season ? `Trips run ${pending.season}.` : null],
      },
    ],
    faqs: [
      { question: "Where can I go kayaking in Gokarna?", answer: `At sea on the ${nameWithHours("premium")}, or in the mangroves on a ${byId("river").durationHours}-hour River Trip. Both start from ${contact.pickup.label}.` },
      { question: "Do I need kayaking experience?", answer: "Tell us your experience when you enquire, and we'll advise which trip suits you." },
      { question: "How much does kayaking in Gokarna cost?", answer: priceAnswer },
      { question: "Can non-swimmers go kayaking?", answer: "Tell us if anyone in your group can't swim when you enquire, and we'll advise which trips and activities suit them." },
    ],
    relatedSlugs: ["mangrove-river-trip-gokarna", "snorkelling-in-gokarna", "dolphin-watching-gokarna"],
    heroImage: { src: "/images/stock/kayaking.webp", width: 1600, height: 1200, alt: "A person paddling a red kayak across calm grey-blue sea (illustrative photo)" },
    gallery: [{ src: "/images/stock/mangroves.webp", width: 1360, height: 764, alt: "A boat moving along a calm, green, mangrove-lined waterway (illustrative photo)" }],
    whatsappMessage: "Hi, I'd like to go kayaking in Gokarna. Which trip would you suggest?",
    updatedAt,
  },
  {
    slug: "snorkelling-in-gokarna",
    h1: "Snorkelling in Gokarna",
    linkLabel: "Snorkelling in Gokarna",
    title: "Snorkelling in Gokarna on a Boat Trip | Rudra Gokarna",
    description: "Snorkel in Gokarna on the 3-hour Premium boat trip from Gokarna Beach, with swimming, kayaking, dolphin watching and the mystery cave.",
    primaryKeyword: "snorkelling in Gokarna",
    answerSummary: `Snorkelling in Gokarna is part of the ${nameWithHours("premium")} from Rudra Gokarna Adventures, which leaves from Gokarna Beach. The same trip includes swimming, kayaking, dolphin watching, the lighthouse and the mystery cave. Tell us if anyone in your group can't swim. Prices are shared when you enquire.`,
    packageIds: ["premium"],
    highlightIds: ["snorkelling"],
    keyFacts: keyFacts(["premium"], carryWet),
    sections: [
      {
        id: "what-you-do",
        heading: "What you'll do",
        paragraphs: [
          `Snorkelling is one of the activities on the ${byId("premium").name}, our fullest trip along the coast. Alongside it you'll have ${joinList(lower(byId("premium").highlights.filter((id) => id !== "snorkelling")))}.`,
          "With a mask and snorkel you can float face-down and watch the water below while breathing normally. Breathe slowly through your mouth, keep your movements relaxed, and lift your head whenever you need a break.",
          "How far you can see underwater depends on the day: calm, clear water gives the best views, while wind and waves stir up sand and reduce visibility.",
        ],
      },
      {
        id: "route",
        heading: "Where you snorkel",
        // TODO(owner): where on the route the snorkelling stop is.
        paragraphs: [null],
      },
      { id: "duration", heading: "How long it takes", paragraphs: [`The ${byId("premium").name} lasts ${byId("premium").durationHours} hours, with snorkelling as one part of it. Ask us which dates are running.`] },
      {
        id: "included",
        heading: "What's included",
        // TODO(owner): whether masks, snorkels and life jackets are provided.
        paragraphs: [`Snorkelling is part of the ${byId("premium").name}:`],
        list: [`${byId("premium").name} (${byId("premium").durationHours} hours): ${lower(byId("premium").highlights).join(", ")}`],
      },
      { id: "carry", heading: "What to carry", paragraphs: ["You'll be in the water, so come ready to swim. Bring:"], list: carryWet },
      {
        id: "who",
        heading: "Who it suits",
        paragraphs: ["Swimmers who want to see what's under the surface, and groups who want to pack the most into one trip. If anyone in your group can't swim, or you're bringing children, tell us when you enquire and we'll advise."],
      },
      { id: "safety", heading: "Safety", paragraphs: [safetyLine] },
      { id: "best-time", heading: "Best time to go", paragraphs: ["Calm, clear days are best for snorkelling, because visibility drops when the sea is rough.", pending.season ? `Trips run ${pending.season}.` : null] },
    ],
    faqs: [
      { question: "Which boat trip includes snorkelling in Gokarna?", answer: `The ${nameWithHours("premium")}, which also includes swimming, kayaking and dolphin watching.` },
      { question: "Can non-swimmers snorkel?", answer: "Tell us if anyone in your group can't swim when you enquire, and we'll advise which activities suit them." },
      { question: "How much does snorkelling in Gokarna cost?", answer: priceAnswer },
      { question: "Is snorkelling equipment provided?", answer: null }, // TODO(owner)
    ],
    relatedSlugs: ["kayaking-in-gokarna", "dolphin-watching-gokarna", "private-boat-gokarna"],
    heroImage: { src: "/images/stock/snorkelling.webp", width: 1360, height: 1020, alt: "A snorkeller floating in clear turquoise water, seen from above (illustrative photo)" },
    gallery: [{ src: "/images/stock/swimming.webp", width: 1600, height: 1200, alt: "People swimming among small waves close to shore (illustrative photo)" }],
    whatsappMessage: "Hi, I'd like to go snorkelling on the Premium trip.",
    updatedAt,
  },
  {
    slug: "mangrove-river-trip-gokarna",
    h1: "Mangrove river trip near Gokarna",
    linkLabel: "Mangrove river trips near Gokarna",
    title: "Mangrove River Trip & Kayaking near Gokarna | Rudra",
    description: "A 2-hour River Trip from Gokarna Beach into the mangroves, with mangrove views and kayaking between the trees.",
    primaryKeyword: "mangrove river trip Gokarna",
    answerSummary: `The River Trip from Rudra Gokarna Adventures is a ${byId("river").durationHours}-hour trip into the mangroves near Gokarna, with mangrove views and kayaking in the mangroves. It starts from Gokarna Beach and suits anyone who wants quieter water and nature rather than open sea. Prices are shared when you enquire on WhatsApp.`,
    packageIds: ["river"],
    highlightIds: ["mangrove-views", "mangrove-kayaking"],
    keyFacts: keyFacts(["river"], carryWet),
    sections: [
      {
        id: "what-you-do",
        heading: "What you'll do",
        paragraphs: [
          `The River Trip swaps the open sea for the mangroves: ${joinList(lower(byId("river").highlights))}. It's a slower, closer look at a very different side of the Gokarna area.`,
          "Mangroves are trees that grow in salty, tidal water where rivers meet the sea. Their tangled roots shelter young fish, crabs and other small creatures, and the channels between them are a good place to look out for birds.",
          "Kayaking between the trees puts you right at water level. Paddle gently, keep your voice low and you'll notice much more.",
        ],
      },
      {
        id: "route",
        heading: "Route",
        // TODO(owner): which river and mangrove area the trip visits, and where the sea-river joining point is.
        paragraphs: [null],
      },
      { id: "duration", heading: "How long it takes", paragraphs: [`River Trips last ${byId("river").durationHours} hours. Ask us which dates and times are running.`] },
      { id: "included", heading: "What's included", paragraphs: ["The River Trip includes:"], list: lower(byId("river").highlights).map((item) => item[0].toUpperCase() + item.slice(1)) },
      { id: "carry", heading: "What to carry", paragraphs: ["You may get wet getting in and out of the kayak. Bring:"], list: carryWet },
      {
        id: "who",
        heading: "Who it suits",
        paragraphs: ["Nature lovers, kayakers and anyone who'd rather explore quiet channels than the open sea. Tell us about children or non-swimmers when you enquire and we'll advise."],
      },
      { id: "safety", heading: "Safety", paragraphs: [safetyLine] },
      {
        id: "best-time",
        heading: "Best time to go",
        paragraphs: ["Water levels in mangrove channels rise and fall with the tide, so the timing of the trip can depend on it. Ask us which times suit the day you have in mind.", pending.season ? `Trips run ${pending.season}.` : null],
      },
    ],
    faqs: [
      { question: "What does a River Trip involve?", answer: `A ${byId("river").durationHours}-hour trip into the mangroves with ${joinList(lower(byId("river").highlights))}.` },
      { question: "Which river is the mangrove trip on?", answer: null }, // TODO(owner)
      { question: "How much is the mangrove river trip?", answer: priceAnswer },
      { question: "Is the River Trip good for families?", answer: kidsAnswer },
    ],
    relatedSlugs: ["kayaking-in-gokarna", "dolphin-watching-gokarna", "fishing-trip-gokarna"],
    heroImage: { src: "/images/stock/mangroves.webp", width: 1360, height: 764, alt: "A boat moving along a calm, green, mangrove-lined waterway (illustrative photo)" },
    gallery: [{ src: "/images/stock/river-trips.webp", width: 1600, height: 1200, alt: "Mangrove trees and their roots rising from dark mud (illustrative photo)" }],
    whatsappMessage: "Hi, I'd like to book a River Trip to the mangroves.",
    updatedAt,
  },
  {
    slug: "fishing-trip-gokarna",
    h1: "Fishing trip in Gokarna",
    linkLabel: "Fishing trips in Gokarna",
    title: "Fishing Trip in Gokarna by Boat | Rudra Gokarna",
    description: "Go fishing on the 4-hour Exclusive boat trip from Gokarna Beach, which also includes a bioluminescence trip. Prices on enquiry.",
    primaryKeyword: "fishing trip Gokarna",
    answerSummary: `Rudra Gokarna Adventures runs fishing trips in Gokarna as part of the ${nameWithHours("exclusive")}, which also includes a bioluminescence trip. Trips start from Gokarna Beach. Ask us about timing and conditions for your date; prices are shared when you enquire on WhatsApp or by phone.`,
    packageIds: ["exclusive"],
    highlightIds: ["fishing-trips"],
    keyFacts: keyFacts(["exclusive"], carry),
    sections: [
      {
        id: "what-you-do",
        heading: "What you'll do",
        paragraphs: [
          `Fishing is the heart of the ${byId("exclusive").name}, a ${byId("exclusive").durationHours}-hour trip that pairs ${joinList(lower(byId("exclusive").highlights))}. It's our longest package, built for people who want time out on the water rather than a quick tour.`,
          "Fishing from a boat is a patient pastime: there are quiet stretches and sudden bursts of action. Keep your line steady, be patient, and don't be disappointed by a slow day: fish don't keep schedules.",
        ],
      },
      {
        id: "route",
        heading: "Where you fish",
        // TODO(owner): whether fishing is at sea or near shore, by day or at night, and whether tackle and bait are provided.
        paragraphs: [null],
      },
      { id: "duration", heading: "How long it takes", paragraphs: [`The ${byId("exclusive").name} lasts ${byId("exclusive").durationHours} hours. Ask us about timing and conditions for your date.`] },
      { id: "included", heading: "What's included", paragraphs: [`The ${byId("exclusive").name} includes:`], list: byId("exclusive").highlights.map((id) => highlights[id]) },
      { id: "carry", heading: "What to carry", paragraphs: ["Four hours is a while on the water. Bring:"], list: [...carry, "A snack if you get hungry on longer trips"] },
      { id: "who", heading: "Who it suits", paragraphs: ["Anyone who enjoys fishing or wants to try it, and groups looking for a longer, slower trip. Tell us about children or anyone prone to seasickness when you enquire."] },
      { id: "safety", heading: "Safety", paragraphs: [safetyLine] },
      { id: "best-time", heading: "Best time to go", paragraphs: ["Calm seas make fishing from a boat more comfortable. Ask us which dates are running and what conditions look like.", pending.season ? `Trips run ${pending.season}.` : null] },
    ],
    faqs: [
      { question: "Which trip includes fishing in Gokarna?", answer: `The ${nameWithHours("exclusive")}, which also includes a bioluminescence trip.` },
      { question: "Is fishing tackle provided?", answer: null }, // TODO(owner)
      { question: "How much is a fishing trip in Gokarna?", answer: priceAnswer },
      { question: "Can beginners join a fishing trip?", answer: "Tell us your experience when you enquire, and we'll advise whether the trip suits you." },
    ],
    relatedSlugs: ["bioluminescence-gokarna", "private-boat-gokarna", "mangrove-river-trip-gokarna"],
    heroImage: { src: "/images/stock/fishing-harbour.webp", width: 1600, height: 1200, alt: "A brightly painted fishing boat on a sandy beach with the sea behind (illustrative photo)" },
    gallery: [],
    whatsappMessage: "Hi, I'd like to ask about a fishing trip (Exclusive package).",
    updatedAt,
  },
  {
    slug: "bioluminescence-gokarna",
    h1: "Bioluminescence in Gokarna",
    linkLabel: "Bioluminescence trips in Gokarna",
    title: "Bioluminescence in Gokarna: Boat Trip | Rudra Gokarna",
    description: "See glowing water on a bioluminescence trip, part of the 4-hour Exclusive boat trip from Gokarna Beach. Ask us about timing and conditions.",
    primaryKeyword: "bioluminescence Gokarna",
    answerSummary: `Rudra Gokarna Adventures includes a bioluminescence trip in the ${nameWithHours("exclusive")}, together with fishing. Bioluminescence is light made by tiny sea organisms, seen as a blue glow when the water moves. It depends on conditions and isn't guaranteed. Ask us about timing for your date when you enquire.`,
    packageIds: ["exclusive"],
    highlightIds: ["bioluminescence"],
    keyFacts: [...keyFacts(["exclusive"], carry).filter((fact) => fact.label !== "Season"), { label: "When it's visible", value: pending.bioluminescenceTiming }],
    sections: [
      {
        id: "what-you-do",
        heading: "What you'll see",
        paragraphs: [
          "Bioluminescence is light produced by living things. In the sea it usually comes from plankton so small you can't see them individually; when the water is disturbed, by a wave, an oar or a hand, they flash, and the water seems to glow blue.",
          `On the ${byId("exclusive").name} a bioluminescence trip is paired with fishing over ${byId("exclusive").durationHours} hours. When the glow is there, trailing a hand in the water or watching the wake behind the boat is unforgettable.`,
          "It's a natural event, not a show. How bright it is, and whether it appears at all, depends on the season, the sea and the night, so we can't guarantee it.",
        ],
      },
      {
        id: "timing",
        heading: "When to go",
        // TODO(owner): which months and roughly what time of night the bioluminescence trip runs.
        paragraphs: [
          pending.bioluminescenceTiming ? `On our trips it's usually visible ${pending.bioluminescenceTiming}.` : null,
          "Bioluminescence shows best on dark nights, away from bright lights, and a moonless or cloudy night makes the glow easier to see. Ask us about timing and conditions for your date.",
        ],
      },
      { id: "duration", heading: "How long it takes", paragraphs: [`The ${byId("exclusive").name} lasts ${byId("exclusive").durationHours} hours in total.`] },
      { id: "included", heading: "What's included", paragraphs: [`The ${byId("exclusive").name} includes:`], list: byId("exclusive").highlights.map((id) => highlights[id]) },
      { id: "carry", heading: "What to carry", paragraphs: ["Evenings on the water can feel cooler. Bring:"], list: ["A light layer for the evening", "Drinking water", "A dry bag or zip pouch for your phone", "Any medicine you need, such as for motion sickness"] },
      { id: "who", heading: "Who it suits", paragraphs: ["Couples, curious travellers and photographers who are happy to wait for the right moment. Phones rarely capture the glow well, so plan to enjoy it with your own eyes."] },
      { id: "safety", heading: "Safety", paragraphs: [safetyLine] },
    ],
    faqs: [
      { question: "Can you see bioluminescence in Gokarna?", answer: `It's part of the ${nameWithHours("exclusive")} from Gokarna Beach. It depends on natural conditions, so it can't be guaranteed.` },
      { question: "What causes bioluminescence?", answer: "Tiny sea organisms, mostly plankton, that give off light when the water around them is disturbed." },
      { question: "When is the best time to see bioluminescence?", answer: pending.bioluminescenceTiming ? `On our trips, usually ${pending.bioluminescenceTiming}.` : null },
      { question: "How much is the bioluminescence trip?", answer: priceAnswer },
    ],
    relatedSlugs: ["fishing-trip-gokarna", "private-boat-gokarna", "dolphin-watching-gokarna"],
    heroImage: { src: "/images/stock/exclusive.webp", width: 1539, height: 1200, alt: "Dark shoreline at night with points of blue light glowing in the water (illustrative photo)" },
    gallery: [],
    whatsappMessage: "Hi, I'd like to ask about the bioluminescence trip (Exclusive package).",
    updatedAt,
  },
  {
    slug: "private-boat-gokarna",
    h1: "Private boat trips in Gokarna",
    linkLabel: "Private boat trips in Gokarna",
    title: "Private Boat in Gokarna for Couples & Groups | Rudra",
    description: "Plan a private boat trip from Gokarna Beach: choose the places and 2, 3 or 4 hours. For couples, families, New Year and other occasions.",
    primaryKeyword: "private boat Gokarna",
    answerSummary: "Rudra Gokarna Adventures plans private and custom boat trips from Gokarna Beach for couples, families, New Year and other occasions. Choose the places you'd like to see and a 2, 3 or 4-hour trip, then send the details on WhatsApp. Custom trips are planned on request, and prices are shared when you enquire.",
    packageIds: [],
    highlightIds: [],
    keyFacts: [
      { label: "Price", value: "Shared when you enquire" },
      { label: "Duration", value: "2, 3 or 4 hours (your choice)" },
      { label: "Pick-up point", value: contact.pickup.label, href: contact.pickup.mapsUrl },
      { label: "Occasions", value: "Couples, families, New Year and other occasions" },
      { label: "Maximum group size", value: pending.capacity ? `${pending.capacity} guests` : null },
      { label: "Season", value: pending.season },
      { label: "What to carry", value: carry.map((item) => item.split(":")[0]).join(", ") },
    ],
    sections: [
      {
        id: "what-you-do",
        heading: "What you can plan",
        paragraphs: [
          "A custom trip starts with what you want to see. Choose from the places on our routes: the lighthouse, the mystery cave, the fishing harbour, the sea-river joining point, the mangroves and the Gokarna coastline. Then pick a 2, 3 or 4-hour trip and tell us your date and group size.",
          "We plan trips for couples, families, New Year celebrations and other special occasions. Tell us what you have in mind, whether it's a quiet trip for two, a family day out or a celebration with friends, and we'll come back with what's possible.",
        ],
      },
      {
        id: "how",
        heading: "How to plan it",
        paragraphs: [
          "Use the booking form on our home page: choose Custom, pick your places and trip length, add a date and your group size, and send it on WhatsApp. You can also message or call us directly. We'll confirm availability and the price.",
        ],
      },
      {
        id: "boat",
        heading: "The boat",
        paragraphs: ["Trips run aboard The Rudra Gokarna, a navy and white boat with gold lines, an open upper deck and a covered cabin with windows."],
      },
      { id: "carry", heading: "What to carry", paragraphs: ["Bring:"], list: carry },
      { id: "who", heading: "Who it suits", paragraphs: ["Couples marking a special day, families who want the boat to themselves, and groups celebrating New Year or another occasion."] },
      { id: "safety", heading: "Safety", paragraphs: [safetyLine] },
    ],
    faqs: [
      { question: "Can we book a private boat in Gokarna?", answer: "Yes. Custom trips are planned on request for couples, families, New Year and other occasions. Send your date, group size and ideas on WhatsApp." },
      { question: "How long can a private boat trip be?", answer: "You can choose 2, 3 or 4 hours when you plan a custom trip." },
      { question: "How much does a private boat cost in Gokarna?", answer: priceAnswer },
      { question: "Can you arrange a New Year boat trip?", answer: "New Year celebrations are planned on request. Tell us your group size and what you have in mind." },
    ],
    relatedSlugs: ["bioluminescence-gokarna", "dolphin-watching-gokarna", "mangrove-river-trip-gokarna"],
    heroImage: { src: "/images/rudra-hero.jpeg", width: 1600, height: 1200, alt: "The Rudra Gokarna on calm water off the Gokarna coast, with guests on deck" },
    gallery: [{ src: "/images/rudra-coast.jpeg", width: 864, height: 1152, alt: "The Rudra Gokarna on calm water, seen from a rocky Gokarna shore between trees" }],
    whatsappMessage: "Hi, I'd like to plan a private boat trip in Gokarna.",
    updatedAt,
  },
];

export function getSeoPage(slug: string) {
  return seoPages.find((page) => page.slug === slug);
}

// Which landing page covers a package highlight (for "Included activities" links and tiles).
export const landingForHighlight: Partial<Record<HighlightId, SeoPageSlug>> = {
  dolphins: "dolphin-watching-gokarna",
  kayaking: "kayaking-in-gokarna",
  "mangrove-kayaking": "kayaking-in-gokarna",
  snorkelling: "snorkelling-in-gokarna",
  "mangrove-views": "mangrove-river-trip-gokarna",
  "fishing-trips": "fishing-trip-gokarna",
  bioluminescence: "bioluminescence-gokarna",
};

export function linkLabel(slug: SeoPageSlug) {
  return seoPages.find((page) => page.slug === slug)?.linkLabel ?? slug;
}
