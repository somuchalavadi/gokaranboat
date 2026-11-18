import type { Metadata } from "next";
import { activities, experiencesIntro, places } from "@/data/site";
import { pageSummaries } from "@/data/pages";
import { breadcrumbJsonLd, faqJsonLd, jsonLdScript, pageMetadata, thingsToDoJsonLd, webPageJsonLd } from "@/lib/seo";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { TileGrid } from "@/components/sections/TileGrid";
import { Events } from "@/components/sections/Events";
import { FaqList, KeyFacts, LastUpdated } from "@/components/seo/Blocks";

const meta = {
  title: "Things to Do in Gokarna by Boat | Rudra Gokarna Adventures",
  description: "Kayaking, snorkelling, dolphin watching, the lighthouse, a mystery cave, the fishing harbour and mangroves, and which Gokarna boat trips include each.",
  path: "/adventures",
};
export const metadata: Metadata = pageMetadata(meta);

const summary = pageSummaries.adventures;

export default function AdventuresPage() {
  return (
    <>
      <PageHeader crumb="Things to do" title="Things to do on the water" intro={summary.answerSummary} meta={<LastUpdated date={summary.updatedAt} />}>
        <Button href="/#book">Plan & book</Button>
      </PageHeader>
      <Section id="activities" tone="sand" title="Activities" intro={<p className="text-base">{experiencesIntro.stockNote}</p>}>
        <div data-reveal className="mb-10 max-w-3xl">
          <KeyFacts id="adventures-key-facts" facts={summary.keyFacts} />
        </div>
        <TileGrid items={activities} tone="sand" priorityFirst />
      </Section>
      <Section id="places" tone="navy" title="Places">
        <TileGrid items={places} tone="navy" />
      </Section>
      <Section id="questions" tone="sand">
        <FaqList id="questions-title" title="Which trip includes what" faqs={summary.faqs} />
      </Section>
      <Events />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(webPageJsonLd({ path: meta.path, name: "Things to do on the water", description: meta.description, datePublished: summary.datePublished, dateModified: summary.updatedAt, type: "CollectionPage" }))}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(thingsToDoJsonLd())} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(faqJsonLd(summary.faqs))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd("Things to do", "/adventures"))} />
    </>
  );
}
