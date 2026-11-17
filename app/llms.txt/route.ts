import { about, business, contact, packages } from "@/data/site";
import { seoPages } from "@/data/seo-pages";
import { guidePath, guides } from "@/data/guides";
import { absoluteUrl } from "@/lib/url";

// /llms.txt: a plain-text summary and link map for AI assistants (llmstxt.org format). Built at build time.
export const dynamic = "force-static";

export function GET() {
  const prices = packages.map((item) => item.price).filter((price): price is number => price !== null);
  const line = (label: string, path: string, note: string) => `- [${label}](${absoluteUrl(path)}): ${note}`;
  const body = [
    `# ${business.name}`,
    "",
    `> ${about.canonical}`,
    "",
    `Pick-up point: ${contact.pickup.label} (${contact.pickup.mapsUrl}). Book on WhatsApp or by phone: ${contact.phones.map((phone) => phone.display).join(", ")}. ${prices.length ? `Trips from ₹${Math.min(...prices).toLocaleString("en-IN")}.` : "Prices are shared on enquiry."}`,
    "",
    "## Trips",
    "",
    line("All packages", "/packages", packages.map((item) => `${item.name} (${item.durationHours} hours)`).join(", ")),
    line("Things to do", "/adventures", "every activity and place, and which packages include each"),
    "",
    "## Activities",
    "",
    ...seoPages.map((page) => line(page.h1, `/${page.slug}`, page.description)),
    "",
    "## Guides",
    "",
    ...guides.map((guide) => line(guide.h1, guidePath(guide.slug), guide.description)),
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
