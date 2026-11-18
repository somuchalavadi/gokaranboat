import type { MetadataRoute } from "next";
import { about, aboutPage, activities, gallery, hero, packages, places, privacyPage, termsPage } from "@/data/site";
import { pageSummaries } from "@/data/pages";
import { seoPages } from "@/data/seo-pages";
import { guidePath, guides } from "@/data/guides";
import { absoluteUrl } from "@/lib/url";

// Every indexable page, with its last content update and the images that appear on it.
const images = (srcs: readonly string[]) => [...new Set(srcs)].map((src) => absoluteUrl(src));

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified: pageSummaries.home.updatedAt,
      changeFrequency: "monthly",
      priority: 1,
      images: images([`${hero.poster.base}-${hero.poster.width}.webp`, about.image.src, ...gallery.filter((item) => item.kind === "image").map((item) => item.src)]),
    },
    { url: absoluteUrl("/packages"), lastModified: pageSummaries.packages.updatedAt, changeFrequency: "monthly", priority: 0.8, images: images(packages.map((item) => item.image.src)) },
    { url: absoluteUrl("/adventures"), lastModified: pageSummaries.adventures.updatedAt, changeFrequency: "monthly", priority: 0.7, images: images([...activities, ...places].map((tile) => tile.image.src)) },
    ...seoPages.map((page) => ({
      url: absoluteUrl(`/${page.slug}`),
      lastModified: page.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: images([page.heroImage.src, ...page.gallery.map((image) => image.src)]),
    })),
    ...[aboutPage, privacyPage, termsPage].map((page) => ({
      url: absoluteUrl(page.path),
      lastModified: page.updatedAt,
      changeFrequency: "yearly" as const,
      priority: page === aboutPage ? 0.5 : 0.2,
      ...(page === aboutPage ? { images: images([about.image.src]) } : {}),
    })),
    ...guides.map((guide) => ({ url: absoluteUrl(guidePath(guide.slug)), lastModified: guide.updatedAt, changeFrequency: "monthly" as const, priority: 0.6, images: images([guide.image.src]) })),
  ];
}
