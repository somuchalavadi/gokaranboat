import { ogAlt, ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Gokarna, Karnataka", title: "Boat trips, kayaking and dolphin watching from Gokarna Beach" });
}
