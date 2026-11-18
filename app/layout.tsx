import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { business, seo } from "@/data/site";
import { jsonLdScript, localBusinessJsonLd } from "@/lib/seo";
import { siteUrl } from "@/lib/url";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBar } from "@/components/layout/MobileBar";
import { RevealObserver } from "@/components/ui/Reveal";
import { Analytics } from "@/components/analytics/Analytics";
import { EnquiryLauncher } from "@/components/enquiry/EnquiryLauncher";
import { gaId } from "@/lib/analytics";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
// Headings only ever use 600, so a single static weight is lighter than the variable font.
const fraunces = Fraunces({ subsets: ["latin"], weight: "600", variable: "--font-fraunces", display: "swap" });

// Defaults; each page sets its own title, description, canonical and social cards via pageMetadata().
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: seo.title,
  description: seo.description,
  applicationName: business.name,
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#0b1b2b",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
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
        <EnquiryLauncher />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(localBusinessJsonLd())} />
        {gaId && <Analytics />}
      </body>
    </html>
  );
}
