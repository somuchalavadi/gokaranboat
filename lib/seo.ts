import type { Metadata } from "next";
import { about, activities, business, contact, faq, hero, highlights, packages, places, seo } from "@/data/site";
import { absoluteUrl } from "@/lib/url";

// Per-page metadata: canonical URL, Open Graph and Twitter card from one place.
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const canonical = absoluteUrl(path);
  // Images come from each route's opengraph-image.tsx (rendered at build time); X falls back to og:image.
  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: { type: "website", siteName: business.name, locale: "en_IN", title, description, url: canonical },
    twitter: { card: "summary_large_image", title, description },
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
    // One node for the business, typed as both, so every page's publisher/provider points at the same @id.
    "@type": ["LocalBusiness", "Organization"],
    "@id": businessId,
    name: business.name,
    description: about.canonical,
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
    areaServed: business.areaServed.map((name) => ({ "@type": "Place", name })),
    knowsAbout: business.knowsAbout,
    foundingDate: business.foundingDate,
    slogan: business.slogan,
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

export function faqJsonLd(items: readonly { question: string; answer: string | null }[] = faq) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items
      .filter((item) => item.answer !== null)
      .map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
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

// Home › …parents › page
export function breadcrumbJsonLd(name: string, path: string, parents: readonly { label: string; href: string }[] = []) {
  const trail = [{ name: "Home", path: "/" }, ...parents.map((parent) => ({ name: parent.label, path: parent.href })), { name, path }];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: absoluteUrl(item.path) })),
  };
}

// Article for a guide; the publisher points at the business node by @id.
export function articleJsonLd(guide: { h1: string; description: string; path: string; image: { src: string }; datePublished: string; updatedAt: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.h1,
    description: guide.description,
    url: absoluteUrl(guide.path),
    mainEntityOfPage: absoluteUrl(guide.path),
    image: absoluteUrl(guide.image.src),
    datePublished: guide.datePublished,
    dateModified: guide.updatedAt,
    inLanguage: "en-IN",
    author: { "@type": "Organization", "@id": businessId, name: business.name },
    publisher: { "@type": "Organization", "@id": businessId, name: business.name, logo: absoluteUrl(business.emblem) },
  };
}

// TouristTrip for a landing page: the activity, the packages that include it and (once confirmed) a price.
export function landingTripJsonLd(page: { h1: string; answerSummary: string; slug: string; heroImage: { src: string }; packageIds: readonly (typeof packages)[number]["id"][] }) {
  const included = packages.filter((item) => page.packageIds.includes(item.id));
  const prices = included.map((item) => item.price).filter((price): price is number => price !== null);
  return compact({
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: page.h1,
    description: page.answerSummary,
    url: absoluteUrl(`/${page.slug}`),
    image: absoluteUrl(page.heroImage.src),
    provider: { "@id": businessId },
    subTrip: included.map((item) => ({ "@type": "TouristTrip", name: item.name, description: tripDescription(item), url: absoluteUrl(`/packages#${item.id}`), provider: { "@id": businessId } })),
    offers: prices.length ? { "@type": "AggregateOffer", lowPrice: Math.min(...prices), priceCurrency: "INR", url: absoluteUrl("/#book") } : null,
  });
}

// Dataset for the dolphin sighting log (only rendered once the log has data).
export function sightingsDatasetJsonLd(guide: { h1: string; description: string; path: string; updatedAt: string }, months: readonly { month: string }[]) {
  return compact({
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: guide.h1,
    description: guide.description,
    url: absoluteUrl(guide.path),
    dateModified: guide.updatedAt,
    temporalCoverage: months.length ? `${months[0].month}/${months[months.length - 1].month}` : null,
    spatialCoverage: { "@type": "Place", name: "Gokarna, Karnataka, India" },
    variableMeasured: ["Trips", "Trips with dolphin sightings"],
    creator: { "@type": "Organization", "@id": businessId, name: business.name },
    isAccessibleForFree: true,
  });
}

const websiteId = absoluteUrl("/#website");

// The site itself; every WebPage node points at it with isPartOf.
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: business.name,
    url: absoluteUrl("/"),
    inLanguage: "en-IN",
    publisher: { "@id": businessId },
  };
}

// One WebPage node per page: dates from the data files, part of the WebSite, about the business. Guides and landing
// pages (`authored`) also name the Organization as author and publisher.
export function webPageJsonLd({
  path,
  name,
  description,
  datePublished,
  dateModified,
  type = "WebPage",
  authored = false,
  image,
}: {
  path: string;
  name: string;
  description: string;
  datePublished: string;
  dateModified: string;
  type?: "WebPage" | "AboutPage" | "CollectionPage" | "FAQPage" | "ContactPage";
  authored?: boolean;
  image?: string;
}) {
  const url = absoluteUrl(path);
  return compact({
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "en-IN",
    isPartOf: { "@id": websiteId },
    about: { "@id": businessId },
    datePublished,
    dateModified,
    primaryImageOfPage: image ? { "@type": "ImageObject", url: absoluteUrl(image) } : null,
    author: authored ? { "@id": businessId } : null,
    publisher: authored ? { "@id": businessId } : null,
  });
}
