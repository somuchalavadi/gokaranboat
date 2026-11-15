import type { Metadata } from "next";
import { activities, experiencesIntro, places } from "@/data/site";
import { breadcrumbJsonLd, jsonLdScript, pageMetadata, thingsToDoJsonLd } from "@/lib/seo";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { TileGrid } from "@/components/sections/TileGrid";
import { Events } from "@/components/sections/Events";

export const metadata: Metadata = pageMetadata({
  title: "Things to Do in Gokarna by Boat | Rudra Gokarna Adventures",
  description: "Kayaking, snorkelling, dolphin watching, the lighthouse, a mystery cave, the fishing harbour and mangroves, and which Gokarna boat trips include each.",
  path: "/adventures",
});

export default function AdventuresPage() {
  return (
    <>
      <PageHeader crumb="Things to do" title="Things to do on the water" intro="Every activity and place on our Gokarna trips, and which packages include each one.">
        <Button href="/#book">Plan & book</Button>
      </PageHeader>
      <Section id="activities" tone="sand" title="Activities" intro={<p className="text-base">{experiencesIntro.stockNote}</p>}>
        <TileGrid items={activities} tone="sand" priorityFirst />
      </Section>
      <Section id="places" tone="navy" title="Places">
        <TileGrid items={places} tone="navy" />
      </Section>
      <Events />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(thingsToDoJsonLd())} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd("Things to do", "/adventures"))} />
    </>
  );
}
