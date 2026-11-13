export type Place = {
  slug: string;
  name: string;
  description: string;
  packages: readonly string[];
  icon: "compass" | "lighthouse" | "cave" | "fish" | "waves" | "leaf";
};

export const places: readonly Place[] = [
  { slug: "sightseeing", name: "Gokarna sightseeing", description: "See the coastline from the water on selected trips.", packages: ["Premium", "Standard"], icon: "compass" },
  { slug: "lighthouse", name: "Lighthouse", description: "A listed stop on the Premium experience.", packages: ["Premium"], icon: "lighthouse" },
  { slug: "mystery-cave", name: "Mystery cave", description: "Explore a distinctive coastal stop on selected packages.", packages: ["Premium", "Standard"], icon: "cave" },
  { slug: "fishing-harbour", name: "Fishing harbour", description: "Take in the working harbour on the Premium trip.", packages: ["Premium"], icon: "fish" },
  { slug: "sea-river-joining", name: "Sea & river joining point", description: "Follow the meeting point of two waters on Premium.", packages: ["Premium"], icon: "waves" },
  { slug: "mangroves", name: "Mangroves", description: "Choose River Trips for mangrove views and kayaking.", packages: ["River Trips"], icon: "leaf" },
];
