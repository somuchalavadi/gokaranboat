import { getSeoPage, seoPages } from "@/data/seo-pages";
import { ogAlt, ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return seoPages.map((page) => ({ slug: page.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const page = getSeoPage((await params).slug);
  return ogImage({ eyebrow: "Things to do in Gokarna", title: page?.h1 ?? "Boat trips from Gokarna Beach" });
}
