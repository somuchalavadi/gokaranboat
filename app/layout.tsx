import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { site } from "@/lib/site";
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter", display: "swap" });
export const metadata: Metadata = { ...(site.url ? { metadataBase: new URL(site.url) } : {}), title: { default: site.name, template: `%s | ${site.name}` }, description: site.description, openGraph: { type: "website", siteName: site.name, title: site.name, description: site.description, ...(site.url ? { url: site.url } : {}) }, twitter: { card: "summary_large_image", title: site.name, description: site.description } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { const jsonLd = { "@context": "https://schema.org", "@type": "LocalBusiness", name: site.name, telephone: site.phones, address: { "@type": "PostalAddress", name: site.pickup } }; return <html lang="en"><body className={inter.variable}><a className="skip-link" href="#main">Skip to content</a><Navbar /><main id="main">{children}</main><Footer /><FloatingWhatsApp /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} /></body></html>; }
