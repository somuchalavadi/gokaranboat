export const packages = [
  { name: "Premium Package", shortName: "Premium", duration: "3 hours", featured: true, price: null as number | null, inclusions: ["Sightseeing around Gokarna", "Lighthouse", "Kayaking", "Snorkelling", "Swimming", "Dolphin watching", "Mystery cave exploration", "Fishing harbour trip", "Sea and river joining point"] },
  { name: "Standard Package", shortName: "Standard", duration: "2 hours", featured: false, price: null as number | null, inclusions: ["Sightseeing around Gokarna", "Mystery cave exploration", "Dolphin watching"] },
  { name: "Exclusive Package", shortName: "Exclusive", duration: "4 hours", featured: false, price: null as number | null, inclusions: ["Fishing trips", "Bioluminescence trip"] },
  { name: "River Trips", shortName: "River Trips", duration: "2 hours", featured: false, price: null as number | null, inclusions: ["Mangrove views", "Kayaking in mangroves"] },
] as const;
export const customExperiences = ["Couples", "Customised family experiences", "New Year celebrations", "Other special occasions"] as const;
export const comparisonRows = Array.from(new Set(packages.flatMap((item) => item.inclusions)));
