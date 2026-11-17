import { ogAlt, ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Things to do", title: "Things to do on the water in Gokarna" });
}
