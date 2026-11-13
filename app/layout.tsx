import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { site } from "@/lib/site";
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-jakarta", display: "swap" });
export const metadata: Metadata = { metadataBase: new URL(site.url || "https://therudragokarna.vercel.app"), title: { default: "Boat Tours & Water Activities in Gokarna | Rudra Gokarna Adventures", template: `%s | ${site.name}` }, description: site.description, openGraph: { type: "website", siteName: site.name, title: "Boat Tours & Water Activities in Gokarna | Rudra Gokarna Adventures", description: site.description, images: [{ url: "/images/rudra-boat-showcase.jpeg", width: 1600, height: 900, alt: "The Rudra Gokarna boat on the Gokarna coast" }], url: site.url || "https://therudragokarna.vercel.app" }, twitter: { card: "summary_large_image", title: "Boat Tours & Water Activities in Gokarna | Rudra Gokarna Adventures", description: site.description, images: ["/images/rudra-boat-showcase.jpeg"] } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { const jsonLd = { "@context": "https://schema.org", "@type": "LocalBusiness", name: site.name, telephone: site.phones, url: site.url || "https://therudragokarna.vercel.app", address: { "@type": "PostalAddress", name: site.pickup, addressLocality: "Gokarna", addressRegion: "Karnataka", addressCountry: "IN" } }; return <html lang="en"><body className={`${inter.variable} ${jakarta.variable}`}><a className="skip-link" href="#main">Skip to content</a><Navbar /><main id="main">{children}</main><Footer /><FloatingWhatsApp /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} /></body></html>; }
