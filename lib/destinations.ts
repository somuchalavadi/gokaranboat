import type { imageSlots } from "@/lib/images";

export type CoastalDestination = {
  name: string;
  note: string;
  image: keyof typeof imageSlots;
  description: string;
  operated?: boolean;
};

export const coastalDestinations: readonly CoastalDestination[] = [
  {
    name: "Gokarna",
    note: "Coastal base",
    image: "gokarnaGuide",
    description: "A coastal town where beaches, the lighthouse, mangroves and the sea create the setting for Rudra Gokarna Adventures.",
    operated: true,
  },
  {
    name: "Murudeshwar",
    note: "Coastal landmark",
    image: "murudeshwarGuide",
    description: "A coastal stop known for its temple complex and seafront setting.",
  },
  {
    name: "Honnavar",
    note: "River landscape",
    image: "honnavarGuide",
    description: "A coastal river town associated with estuaries, backwaters and mangrove landscapes.",
  },
  {
    name: "Karwar",
    note: "Sea and river",
    image: "karwarGuide",
    description: "A northern Karnataka coastal town where the Kali River meets the Arabian Sea.",
  },
  {
    name: "Udupi",
    note: "Coastal culture",
    image: "udupiGuide",
    description: "A coastal district with beaches, island views and a distinct temple-town culture.",
  },
  {
    name: "Maravanthe",
    note: "Coastal drive",
    image: "maravantheGuide",
    description: "A striking stretch of coastline on Karnataka’s western shore.",
  },
];
