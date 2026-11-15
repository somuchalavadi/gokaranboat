import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import "./legacy.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBar } from "@/components/layout/MobileBar";
import { RevealObserver } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });

export const metadata: Metadata = { metadataBase: new URL(site.url || "https://therudragokarna.vercel.app"), title: { default: "Boat Tours & Water Activities in Gokarna | Rudra Gokarna Adventures", template: `%s | ${site.name}` }, description: site.description, openGraph: { type: "website", siteName: site.name, title: "Boat Tours & Water Activities in Gokarna | Rudra Gokarna Adventures", description: site.description, images: [{ url: "/images/rudra-boat-showcase.jpeg", width: 1200, height: 630, alt: "The Rudra Gokarna boat on the Gokarna coast" }], url: site.url || "https://therudragokarna.vercel.app" }, twitter: { card: "summary_large_image", title: "Boat Tours & Water Activities in Gokarna | Rudra Gokarna Adventures", description: site.description, images: ["/images/rudra-boat-showcase.jpeg"] } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = { "@context": "https://schema.org", "@type": "LocalBusiness", name: site.name, url: site.url || "https://therudragokarna.vercel.app", telephone: site.phones, address: site.pickup };
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        <a href="#main" className="fixed top-2 left-2 z-[100] -translate-y-[200%] rounded-input bg-white px-4 py-3 font-semibold text-ink focus:translate-y-0">
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <MobileBar />
        <RevealObserver />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
