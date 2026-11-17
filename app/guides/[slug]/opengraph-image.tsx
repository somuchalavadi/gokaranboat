import { getGuide, guides } from "@/data/guides";
import { ogAlt, ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const guide = getGuide((await params).slug);
  return ogImage({ eyebrow: "Guide", title: guide?.h1 ?? "Gokarna boat trip guide" });
}
