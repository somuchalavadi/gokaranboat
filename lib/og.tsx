import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { business, contact } from "@/data/site";
import { absoluteUrl } from "@/lib/url";

// Shared 1200×630 Open Graph card: navy background, gold rule, the page's H1 in Fraunces SemiBold.
// Rendered at build time (static), so it costs nothing per request.
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";
export const ogAlt = `${business.name}: boat trips from ${contact.pickup.label}`;

const font = readFile(join(process.cwd(), "assets/fonts/Fraunces-SemiBold.ttf"));
const emblem = readFile(join(process.cwd(), "public", business.emblem)).then((data) => `data:image/png;base64,${data.toString("base64")}`);

export async function ogImage({ title, eyebrow }: { title: string; eyebrow: string }) {
  const [fontData, emblemSrc] = await Promise.all([font, emblem]);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0b1b2b", color: "#ffffff", padding: "64px 72px", fontFamily: "Fraunces" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> only */}
          <img src={emblemSrc} width={96} height={96} alt="" />
          <div style={{ display: "flex", fontSize: 30, color: "#f2b134", letterSpacing: 1 }}>{business.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 28, color: "#cbd5e1", marginBottom: 16 }}>{eyebrow}</div>
          <div style={{ display: "flex", fontSize: title.length > 40 ? 68 : 80, lineHeight: 1.05, maxWidth: 1000 }}>{title}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 120, height: 6, background: "#f2b134", borderRadius: 3 }} />
          <div style={{ display: "flex", fontSize: 26, color: "#cbd5e1" }}>{new URL(absoluteUrl("/")).host}</div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: [{ name: "Fraunces", data: fontData, style: "normal", weight: 600 }] },
  );
}
