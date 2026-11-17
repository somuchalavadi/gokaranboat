// Dolphin sighting log, one entry per month. The /guides/dolphin-sighting-log page (and its Dataset JSON-LD)
// is built only once this list has at least one month. Record real trip counts only.
// TODO(owner): add a line per month, for example:
//   { month: "2026-12", trips: 24, tripsWithSightings: 15, notes: "Calm mornings; most sightings before 10am." },
export type SightingMonth = { month: string; trips: number; tripsWithSightings: number; notes: string | null };

export const sightings: readonly SightingMonth[] = [];
