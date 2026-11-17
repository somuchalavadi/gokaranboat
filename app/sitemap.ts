import type { MetadataRoute } from "next";
import { seoPages } from "@/data/seo-pages";
import { absoluteUrl } from "@/lib/url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/packages"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/adventures"), changeFrequency: "monthly", priority: 0.7 },
    ...seoPages.map((page) => ({ url: absoluteUrl(`/${page.slug}`), lastModified: page.updatedAt, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
