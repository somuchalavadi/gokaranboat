import type { Metadata } from "next";
import { GalleryWall } from "@/components/sections/GalleryWall";
export const metadata: Metadata = { title: "Gallery", description: "A visual guide to the Rudra Gokarna boat and coastal experiences in Gokarna.", alternates: { canonical: "/gallery" } };
export default function GalleryPage() { return <div className="inner-page"><section className="page-hero"><div className="container"><p className="eyebrow">Scenes from the coast</p><h1>Gallery</h1><p>Photographs of the boat and places to explore will be added here.</p></div></section><section className="section"><div className="container"><GalleryWall /></div></section></div>; }
