import type { Metadata } from "next";
import { HomeContent } from "@/components/sections/HomeSections";
import { pageMetadata } from "@/lib/metadata";
export const metadata: Metadata = pageMetadata("Boat Tours & Water Activities in Gokarna", "Boat tours, water activities and coastal experiences from Gokarna Beach with Rudra Gokarna Adventures.", "/");
export default function Home() { return <HomeContent />; }
