import type { Metadata } from "next";
import { HomeContent } from "@/components/sections/HomeSections";
import { pageMetadata } from "@/lib/metadata";
export const metadata: Metadata = pageMetadata("Gokarna boat adventures", "Boat rides, water activities and coastal exploration from Gokarna Beach with Rudra Gokarna Adventures.", "/");
export default function Home() { return <HomeContent />; }
