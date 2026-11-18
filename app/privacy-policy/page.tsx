import type { Metadata } from "next";
import { privacyPage } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { InfoPageView } from "@/components/seo/InfoPage";

export const metadata: Metadata = pageMetadata({ title: privacyPage.title, description: privacyPage.description, path: privacyPage.path });

export default function PrivacyPolicyPage() {
  return <InfoPageView page={privacyPage} />;
}
