import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { BookingBar } from "@/components/layout/BookingBar";
import { site } from "@/lib/site";
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter", display: "swap" });
export const metadata: Metadata = { metadataBase: new URL(site.url || "https://therudragokarna.vercel.app"), title: { default: "Gokarna boat adventures | Rudra Gokarna Adventures", template: `%s | ${site.name}` }, description: site.description, openGraph: { type: "website", siteName: site.name, title: "Gokarna boat adventures | Rudra Gokarna Adventures", description: site.description, images: [{ url: "/images/rudra-boat-showcase.jpeg", width: 1200, height: 630, alt: "The Rudra Gokarna boat on the Gokarna coast" }], url: site.url || "https://therudragokarna.vercel.app" }, twitter: { card: "summary_large_image", title: "Gokarna boat adventures | Rudra Gokarna Adventures", description: site.description, images: ["/images/rudra-boat-showcase.jpeg"] } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { const jsonLd = { "@context": "https://schema.org", "@type": "LocalBusiness", name: site.name, url: site.url || "https://therudragokarna.vercel.app", telephone: site.phones, address: site.pickup }; return <html lang="en"><body className={inter.variable}><a className="skip-link" href="#main">Skip to content</a><Navbar /><main id="main">{children}</main><BookingBar /><Footer /><FloatingWhatsApp /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} /></body></html>; }
