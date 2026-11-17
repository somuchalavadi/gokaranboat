// Answer summaries, key facts and "last updated" dates for the home, /packages and /adventures pages.
// Built only from confirmed facts in data/site.ts; null values are left out by the KeyFacts block.
import { activities, contact, packages, packagesFor, places, type Tile } from "@/data/site";
import { carry, joinList, keyFacts, type KeyFact, type PageFaq } from "@/data/seo-pages";

export type PageSummary = { answerSummary: string; keyFacts: readonly KeyFact[]; updatedAt: string; faqs?: readonly PageFaq[] };

const allIds = packages.map((item) => item.id);
const hours = packages.map((item) => item.durationHours);
const span = `${Math.min(...hours)} to ${Math.max(...hours)} hours`;
const facts = keyFacts(allIds, carry);
const fact = (label: string) => facts.find((item) => item.label === label) as KeyFact;
const lowerFirst = (text: string) => (text.startsWith("Gokarna") ? text : text[0].toLowerCase() + text.slice(1));
const isPlace = (tile: Tile) => places.includes(tile);
const packageNames = (tile: Tile) => joinList(packagesFor(tile.highlightIds).map((item) => `${item.name} (${item.durationHours} hours)`));

const booking: KeyFact = { label: "How to book", value: `WhatsApp or call ${contact.phones[0].display}` };
const custom: KeyFact = { label: "Custom trips", value: "Couples, families, New Year and other occasions, planned on request" };

export const pageSummaries = {
  home: {
    answerSummary: `Rudra Gokarna Adventures runs boat trips from Gokarna Beach in Karnataka. Trips last ${span} and include coastal sightseeing, dolphin watching, kayaking, snorkelling, a mystery cave, mangrove river trips, fishing and bioluminescence, plus custom trips for groups and occasions. Book on WhatsApp or by phone.`,
    keyFacts: [
      { label: "Trips", value: joinList(packages.map((item) => `${item.name} (${item.durationHours} hours)`)) },
      fact("Pick-up point"),
      fact("Price"),
      fact("Departure times"),
      fact("Season"),
      custom,
      booking,
    ],
    updatedAt: "2026-11-17",
  },
  packages: {
    answerSummary: `We run ${packages.length} boat trip packages from Gokarna Beach, each ${span} long: Premium for the widest mix of activities, Standard for a shorter trip with sightseeing, the mystery cave and dolphin watching, Exclusive for fishing and bioluminescence, and River Trips for the mangroves. Prices are shared when you enquire.`,
    keyFacts: [fact("Price"), fact("Duration"), fact("Departure times"), fact("Pick-up point"), fact("Minimum age"), fact("Season"), custom, booking],
    updatedAt: "2026-11-17",
  },
  adventures: {
    answerSummary: `Our Gokarna boat trips include ${joinList(activities.map((tile) => lowerFirst(tile.title)))}, and visit ${joinList(places.map((tile) => `the ${lowerFirst(tile.title)}`))}. Each activity and place below lists the packages that include it, so you can pick the trip that covers what you want to do.`,
    keyFacts: [
      { label: "Activities", value: joinList(activities.map((tile) => tile.title)) },
      { label: "Places", value: joinList(places.map((tile) => tile.title)) },
      fact("Duration"),
      fact("Pick-up point"),
      fact("Price"),
      booking,
    ],
    faqs: [...activities, ...places].map((tile) => ({
      question: `Which Gokarna boat trips include ${isPlace(tile) ? "the " : ""}${lowerFirst(tile.title)}?`,
      answer: packagesFor(tile.highlightIds).length ? `${packageNames(tile)}.` : null,
    })),
    updatedAt: "2026-11-17",
  },
} satisfies Record<"home" | "packages" | "adventures", PageSummary>;
