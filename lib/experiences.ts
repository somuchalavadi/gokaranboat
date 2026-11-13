import type { imageSlots } from "@/lib/images";

export type Experience = {
  name: string;
  group: string;
  slug: string;
  image?: keyof typeof imageSlots;
  description: string;
};

export const experiences: readonly Experience[] = [
  { name: "Boat Adventures", group: "Boat Adventures", slug: "boat-adventures", image: "boat", description: "Explore Gokarna by water with premium tours, standard tours, exclusive fishing trips, river trips and customised experiences." },
  { name: "Kayaking", group: "Water Activities", slug: "kayaking", description: "Ask about kayaking on selected Gokarna boat experiences and River Trips." },
  { name: "Snorkelling", group: "Water Activities", slug: "snorkelling", description: "Add snorkelling to the Premium Package and explore the water around Gokarna." },
  { name: "Swimming", group: "Water Activities", slug: "swimming", description: "Swimming is included in the Premium Package experience." },
  { name: "Dolphin Watching", group: "Sightseeing and Coastal Exploration", slug: "dolphin-watching", description: "Look out for dolphins on the coast, included in the Premium and Standard packages." },
  { name: "Gokarna Sightseeing", group: "Sightseeing and Coastal Exploration", slug: "gokarna-sightseeing", description: "See Gokarna from the water on the Premium and Standard packages." },
  { name: "Lighthouse", group: "Sightseeing and Coastal Exploration", slug: "lighthouse", description: "The Premium Package includes a visit around the lighthouse." },
  { name: "Mystery Cave Exploration", group: "Sightseeing and Coastal Exploration", slug: "mystery-cave", description: "Explore the mystery cave on Premium and Standard packages." },
  { name: "Fishing Harbour Trips", group: "Sightseeing and Coastal Exploration", slug: "fishing-harbour", description: "A fishing harbour trip is included in the Premium Package." },
  { name: "Sea and River Joining Point", group: "Sightseeing and Coastal Exploration", slug: "joining-point", description: "Visit the sea and river joining point on the Premium Package." },
  { name: "Mangrove Exploration", group: "River and Mangrove Trips", slug: "mangroves", description: "Take in mangrove views and kayak in the mangroves on River Trips." },
  { name: "Bioluminescence Trips", group: "Fishing and Special Experiences", slug: "bioluminescence", description: "Bioluminescence trips are part of the Exclusive Package." },
  { name: "Couple Packages", group: "Customised Experiences", slug: "couples", description: "Ask about a customised package for couples." },
  { name: "Family Packages", group: "Customised Experiences", slug: "families", description: "Ask about a customised family experience." },
  { name: "New Year Celebrations", group: "Customised Experiences", slug: "new-year", description: "Plan a customised New Year celebration on the water." },
  { name: "Special Occasions", group: "Customised Experiences", slug: "special-occasions", description: "Ask about a customised experience for your special occasion." },
];
