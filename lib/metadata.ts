import type { Metadata } from "next";
import { site } from "@/lib/site";

const image = "/images/rudra-boat-showcase.jpeg";
export function pageMetadata(title: string, description: string, path: string): Metadata {
  const fullTitle = `${title} | ${site.name}`;
  const canonical = `${site.url || "https://therudragokarna.vercel.app"}${path}`;
  return { title, description, alternates: { canonical }, openGraph: { type: "website", siteName: site.name, title: fullTitle, description, url: canonical, images: [{ url: image, width: 1200, height: 630, alt: "The Rudra Gokarna boat on the Gokarna coast" }] }, twitter: { card: "summary_large_image", title: fullTitle, description, images: [image] } };
}
