import type { Metadata } from "next";
import { site } from "@/lib/site";

const image = "/images/rudra-boat-showcase.jpeg";
export function pageMetadata(title: string, description: string, path: string): Metadata {
  const fullTitle = `${title} | ${site.name}`;
  return { title, description, alternates: { canonical: path }, openGraph: { type: "website", siteName: site.name, title: fullTitle, description, url: path, images: [{ url: image, width: 1600, height: 900, alt: "The Rudra Gokarna boat on the Gokarna coast" }] }, twitter: { card: "summary_large_image", title: fullTitle, description, images: [image] } };
}
