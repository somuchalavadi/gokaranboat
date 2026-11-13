import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";
import { pageMetadata } from "@/lib/metadata";
export const metadata: Metadata = pageMetadata("Contact", "Contact Rudra Gokarna Adventures to enquire about boat tours and water experiences in Gokarna.", "/contact");
export default function ContactPage() { return <div className="inner-page"><section className="page-hero"><div className="container"><p className="eyebrow">Contact and booking</p><h1>Let’s plan your time in Gokarna</h1><p>Call or send an enquiry on WhatsApp to ask about your experience.</p></div></section><ContactSection /></div>; }
