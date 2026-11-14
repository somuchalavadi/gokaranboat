import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { guides } from "@/lib/guides";

export const metadata: Metadata = pageMetadata("Gokarna guides", "Original planning guides for Gokarna boat experiences, kept unpublished until owner review.", "/guides");
export default function GuidesPage() { const published = guides.filter((guide) => guide.published); return <div className="inner-page"><section className="page-hero"><div className="container"><p className="eyebrow">Guides</p><h1>Plan your time on the Gokarna coast</h1><p>Short, cautious notes for choosing a package and shaping an enquiry.</p></div></section><section className="section guides-section"><div className="container"><div className="guide-grid">{published.length ? published.map((guide) => <article className="guide-card" key={guide.slug}><h2>{guide.title}</h2><p>{guide.intro}</p></article>) : <p>Planning guides are currently kept off-site while owner review is in progress.</p>}</div></div></section></div>; }
