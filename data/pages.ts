// Answer summaries, key facts and "last updated" dates for the home, /packages and /adventures pages.
// Built only from confirmed facts in data/site.ts; null values are left out by the KeyFacts block.
import { activities, contact, highlights, packages, packagesFor, places, type Tile } from "@/data/site";
import { carry, joinList, keyFacts, type KeyFact, type PageFaq } from "@/data/seo-pages";

export type PageSummary = { answerSummary: string; keyFacts: readonly KeyFact[]; datePublished: string; updatedAt: string; faqs?: readonly PageFaq[] };

const count = ["no", "one", "two", "three", "four", "five", "six"][packages.length] ?? String(packages.length);
const allIds = packages.map((item) => item.id);
const hours = packages.map((item) => item.durationHours);
const span = `${Math.min(...hours)} to ${Math.max(...hours)} hours`;
const facts = keyFacts(allIds, carry);
const fact = (label: string) => facts.find((item) => item.label === label) as KeyFact;
const lowerFirst = (text: string) => (text.startsWith("Gokarna") ? text : text[0].toLowerCase() + text.slice(1));
const isPlace = (tile: Tile) => places.includes(tile);

// A 40–60 word direct answer for "Which trips include X?", built from the package data.
function tileAnswer(tile: Tile) {
  const included = packagesFor(tile.highlightIds);
  if (!included.length) return null;
  const subject = isPlace(tile) ? `The ${lowerFirst(tile.title)}` : tile.title;
  const verb = isPlace(tile) && /[^s]s$/.test(tile.title) ? "are" : "is";
  const only = included[0];
  const rest = only.highlights.filter((id) => !tile.highlightIds.includes(id)).map((id) => highlights[id].toLowerCase());
  const others =
    included.length === 1 && rest.length
      ? ` ${/Package$/.test(only.name) ? "The " : ""}${only.name} also ${/s$/.test(only.name) ? "include" : "includes"} ${joinList(rest)}.`
      : ` ${tile.description}`;
  const names = joinList(included.map((item) => `${/Package$/.test(item.name) ? "the " : ""}${item.name} (${item.durationHours} hours)`));
  const build = (middle: string) => `${subject} ${verb} part of ${names}.${middle} Every trip starts from Gokarna Beach, Gokarna, Karnataka, and prices are shared when you enquire on WhatsApp or by phone.`;
  const answer = build(others);
  // Too short for a direct answer (a single package with little else in it): add that package's own description.
  return answer.split(/\s+/).length < 40 && included.length === 1 ? build(`${others} ${only.description}`) : answer;
}

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
    datePublished: "2026-11-13",
    updatedAt: "2026-11-18",
  },
  packages: {
    answerSummary: `We run ${count} boat trip packages from Gokarna Beach, each ${span} long: Premium for the widest mix of activities, Standard for a shorter trip with sightseeing, the mystery cave and dolphin watching, Exclusive for fishing and bioluminescence, and River Trips for the mangroves. Prices are shared when you enquire.`,
    keyFacts: [fact("Price"), fact("Duration"), fact("Departure times"), fact("Pick-up point"), fact("Minimum age"), fact("Season"), custom, booking],
    datePublished: "2026-11-13",
    updatedAt: "2026-11-18",
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
      answer: tileAnswer(tile),
    })),
    datePublished: "2026-11-13",
    updatedAt: "2026-11-18",
  },
} satisfies Record<"home" | "packages" | "adventures", PageSummary>;
