import { contact } from "@/data/site";

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

function formatDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return iso;
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
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
