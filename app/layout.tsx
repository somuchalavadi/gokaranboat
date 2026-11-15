import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { business, contact, seo } from "@/data/site";
import { jsonLdScript } from "@/lib/seo";
import { siteUrl } from "@/lib/url";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBar } from "@/components/layout/MobileBar";
import { RevealObserver } from "@/components/ui/Reveal";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: seo.title,
  description: seo.description,
};

export const viewport: Viewport = {
  themeColor: "#0b1b2b",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    url: siteUrl,
    telephone: contact.phones.map((phone) => phone.tel),
    address: contact.pickup.label,
  };
  return (
    <html lang="en-IN" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        <a href="#main" className="fixed top-2 left-2 z-[100] -translate-y-[200%] rounded-input bg-white px-4 py-3 font-semibold text-ink focus:translate-y-0">
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <MobileBar />
        <RevealObserver />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLd)} />
      </body>
    </html>
  );
}
