import type { Metadata } from "next";
import { GalleryWall } from "@/components/sections/GalleryWall";
import { pageMetadata } from "@/lib/metadata";
export const metadata: Metadata = pageMetadata("Gallery", "Photographs of the Rudra Gokarna boat and its coastal setting.", "/gallery");
export default function GalleryPage() { return <div className="inner-page"><section className="page-hero"><div className="container"><p className="eyebrow">Scenes from the coast</p><h1>Gallery</h1><p>Photographs of the Rudra Gokarna boat on the Gokarna coast.</p></div></section><section className="section"><div className="container"><GalleryWall /></div></section></div>; }
