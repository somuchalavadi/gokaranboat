import type { Metadata } from "next";
import { GalleryWall } from "@/components/sections/GalleryWall";
import { VideoGallery } from "@/components/sections/VideoGallery";
import { pageMetadata } from "@/lib/metadata";
export const metadata: Metadata = pageMetadata("Gallery", "Photographs of the Rudra Gokarna boat and its coastal setting.", "/gallery");
export default function GalleryPage() { return <div className="inner-page"><section className="page-hero"><div className="container"><p className="eyebrow">Scenes from the coast</p><h1>Gallery</h1><p>Photographs and short clips of The Rudra Gokarna on the Gokarna coast.</p></div></section><section className="section"><div className="container"><GalleryWall /></div></section><VideoGallery /></div>; }
