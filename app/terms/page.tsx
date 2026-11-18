import type { Metadata } from "next";
import { termsPage } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { InfoPageView } from "@/components/seo/InfoPage";

export const metadata: Metadata = pageMetadata({ title: termsPage.title, description: termsPage.description, path: termsPage.path });

export default function TermsPage() {
  return <InfoPageView page={termsPage} />;
}
