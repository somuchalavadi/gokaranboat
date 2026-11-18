import { contact, enquiry } from "@/data/site";

// The single helper every WhatsApp CTA uses.
export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function telLink(tel: string) {
  return `tel:${tel}`;
}

export type BookingDetails = {
  trip: string;
  places: readonly string[];
  hours: number | null;
  date: string;
  guests: number;
  name: string;
  phone: string;
};

// "2026-11-22" → "Sun, 22 Nov 2026"
function formatDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return iso;
  const date = new Date(Date.UTC(year, month - 1, day));
  const part = (options: Intl.DateTimeFormatOptions) => date.toLocaleDateString("en-IN", { ...options, timeZone: "UTC" });
  return `${part({ weekday: "short" })}, ${day} ${part({ month: "short" })} ${year}`;
}

// "2026-12-20" → "20 Dec 2026"
function formatShortDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return iso;
  const monthName = new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-IN", { month: "short", timeZone: "UTC" });
  return `${day} ${monthName} ${year}`;
}

// The enquiry popup's message. Empty optional fields (no date, guests not set) leave their line out.
export function buildEnquiryMessage({ phrase, date, guests }: { phrase: string; date: string | null; guests: number | null }) {
  const lines = [`${enquiry.greeting} ${phrase}`];
  if (date) lines.push(`${enquiry.dateLine}: ${formatShortDate(date)}`);
  if (guests !== null) lines.push(`${enquiry.guestsLine}: ${guests}`);
  lines.push(enquiry.signature);
  return lines.join("\n");
}

export function buildBookingMessage(details: BookingDetails) {
  const lines = ["Hi Rudra Gokarna Adventures, I'd like to book a trip.", "", `Trip: ${details.trip}`];
  if (details.places.length) lines.push(`Places: ${details.places.join(", ")}`);
  if (details.hours) lines.push(`Length: ${details.hours} hours`);
  lines.push(`Date: ${formatDate(details.date)}`, `Guests: ${details.guests}`, `Name: ${details.name.trim()}`, `Phone: ${details.phone.trim()}`, "", "Please confirm availability and price.");
  return lines.join("\n");
}

// Accepts 10-digit Indian mobile numbers, optionally prefixed with +91, 91 or 0.
export function isIndianMobile(value: string) {
  return /^(?:\+?91|0)?[6-9]\d{9}$/.test(value.replace(/[\s()-]/g, ""));
}

// Outbound booking and map links (wa.me, Google Maps) open in a new tab and aren't endorsed for crawlers.
export const outboundRel = "nofollow noopener";
export function isOutboundBookingLink(href: string) {
  return /^https:\/\/(wa\.me|maps\.app\.goo\.gl)\/|^https:\/\/(www\.)?google\.[a-z.]+\/maps/.test(href);
}
