import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { whatsappEnquiry } from "@/lib/site";

export const metadata: Metadata = pageMetadata("New Year and special occasions", "Plan a New Year celebration or special occasion on a Gokarna boat by enquiry.", "/new-year");
export default function NewYearPage() { return <div className="inner-page"><section className="page-hero"><div className="container"><p className="eyebrow">Customised Events</p><h1>Make New Year or a special occasion your own</h1><p>Tell us what you have in mind for a group experience on the Gokarna coast. Planning is enquiry-only.</p><a className="button button-light" href={whatsappEnquiry("a New Year or special occasion experience")} target="_blank" rel="noreferrer">Plan your experience <ArrowRight size={16} /></a></div></section></div>; }
