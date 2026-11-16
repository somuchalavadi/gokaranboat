import type { Metadata } from "next";
import { activities, business, contact, faq, hero, highlights, packages, places, seo } from "@/data/site";
import { absoluteUrl } from "@/lib/url";

// Per-page metadata: canonical URL, Open Graph and Twitter card (with image alt) from one place.
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const canonical = absoluteUrl(path);
  const image = { url: seo.ogImage.src, width: seo.ogImage.width, height: seo.ogImage.height, alt: seo.ogImage.alt };
  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: { type: "website", siteName: business.name, locale: "en_IN", title, description, url: canonical, images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

// Serialises JSON-LD for a <script> tag, escaping "<" as the Next.js guide recommends.
export function jsonLdScript(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

// Drops null/undefined fields so unconfirmed owner data never reaches structured data.
function compact<T extends Record<string, unknown>>(data: T) {
  return Object.fromEntries(Object.entries(data).filter(([, value]) => value !== null && value !== undefined));
}

const businessId = absoluteUrl("/#business");

export function localBusinessJsonLd() {
  return compact({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": businessId,
    name: business.name,
    description: seo.description,
    url: absoluteUrl("/"),
    image: [absoluteUrl(seo.ogImage.src), absoluteUrl(`${hero.poster.base}-${hero.poster.width}.webp`)],
    logo: absoluteUrl(business.emblem),
    telephone: contact.phones.length === 1 ? contact.phones[0].tel : contact.phones.map((phone) => phone.tel),
    email: contact.email,
    address: compact({
      "@type": "PostalAddress",
      streetAddress: contact.pickup.street,
      addressLocality: contact.pickup.locality,
      addressRegion: contact.pickup.region,
      postalCode: contact.pickup.postalCode,
      addressCountry: contact.pickup.country,
    }),
    hasMap: contact.pickup.mapsUrl,
    priceRange: business.priceRange,
    openingHours: business.openingHours,
    geo: business.geo ? { "@type": "GeoCoordinates", latitude: business.geo.latitude, longitude: business.geo.longitude } : null,
    sameAs: business.socials?.map((social) => social.url) ?? null,
  });
}

function tripDescription(item: (typeof packages)[number]) {
  return `${item.durationHours}-hour boat trip from Gokarna Beach: ${item.highlights.map((id) => highlights[id].toLowerCase()).join(", ")}.`;
}

export function touristTripsJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Boat trips from Gokarna Beach",
    itemListElement: packages.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: compact({
        "@type": "TouristTrip",
        name: item.name,
        description: tripDescription(item),
        url: absoluteUrl(`/packages#${item.id}`),
        provider: { "@id": businessId },
        itinerary: {
          "@type": "ItemList",
          itemListElement: item.highlights.map((id, step) => ({ "@type": "ListItem", position: step + 1, name: highlights[id] })),
        },
        offers: item.price === null ? null : { "@type": "Offer", price: item.price, priceCurrency: "INR", url: absoluteUrl("/#book") },
      }),
    })),
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
  };
}

export function thingsToDoJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Things to do on Gokarna boat trips",
    itemListElement: [...activities, ...places].map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.title, description: item.description })),
  };
}

export function breadcrumbJsonLd(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name, item: absoluteUrl(path) },
    ],
  };
}
