import type { imageSlots } from "@/lib/images";

export type Experience = { name: string; group: string; slug: string; image?: keyof typeof imageSlots; description: string };

export const experiences: readonly Experience[] = [
  { name: "Boat adventures", group: "Boat adventures", slug: "boat-adventures", image: "boat", description: "Premium tours, Standard tours, Exclusive fishing trips, River Trips and Customised Events." },
  { name: "Kayaking", group: "Water activities", slug: "kayaking", description: "Paddle calm water and kayak through the mangroves on River Trips." },
  { name: "Snorkelling", group: "Water activities", slug: "snorkelling", description: "Included in the Premium Package for time in the water around Gokarna." },
  { name: "Swimming", group: "Water activities", slug: "swimming", description: "Swimming is included in the Premium Package experience." },
  { name: "Dolphin watching", group: "Sightseeing", slug: "dolphin-watching", description: "Watch for dolphins out at sea; sightings can’t be promised." },
  { name: "Gokarna sightseeing", group: "Sightseeing", slug: "gokarna-sightseeing", description: "See Gokarna from the water on the Premium and Standard packages." },
  { name: "Lighthouse", group: "Sightseeing", slug: "lighthouse", description: "The Premium Package passes the lighthouse." },
  { name: "Mystery cave exploration", group: "Sightseeing", slug: "mystery-cave", description: "Explore the mystery cave on Premium and Standard packages." },
  { name: "Fishing harbour trips", group: "Sightseeing", slug: "fishing-harbour", description: "A fishing harbour trip is included in the Premium Package." },
  { name: "Sea and river joining point", group: "Sightseeing", slug: "joining-point", description: "Visit the sea and river joining point on the Premium Package." },
  { name: "Fishing trips", group: "Fishing and special experiences", slug: "fishing-trips", description: "Fishing trips are available as part of the Exclusive Package." },
  { name: "Bioluminescence trips", group: "Fishing and special experiences", slug: "bioluminescence", description: "Bioluminescence trips are part of the Exclusive Package." },
  { name: "Mangrove exploration", group: "River and mangrove trips", slug: "mangroves", description: "Take in mangrove views and kayak in the mangroves on River Trips." },
  { name: "Couple packages", group: "Customised events", slug: "couple-packages", description: "Ask about a couple experience shaped around your plans." },
  { name: "Family packages", group: "Customised events", slug: "family-packages", description: "Ask about a family experience shaped around your plans." },
  { name: "New Year celebrations", group: "Customised events", slug: "new-year-celebrations", description: "Plan a New Year celebration by enquiry." },
  { name: "Special occasions", group: "Customised events", slug: "special-occasions", description: "Tell us what you have in mind for another special occasion." },
];
