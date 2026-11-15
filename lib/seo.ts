import type { Metadata } from "next";
import { business, seo } from "@/data/site";
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
