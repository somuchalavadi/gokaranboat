import type { Metadata } from "next";
import { packages } from "@/data/site";
import { pageSummaries } from "@/data/pages";
import { breadcrumbJsonLd, faqJsonLd, jsonLdScript, pageMetadata, touristTripsJsonLd, webPageJsonLd } from "@/lib/seo";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { PackageCard } from "@/components/sections/PackageCard";
import { CompareTable } from "@/components/sections/CompareTable";
import { FaqGoodToKnow } from "@/components/sections/FaqGoodToKnow";
import { Events } from "@/components/sections/Events";
import { KeyFacts, LastUpdated } from "@/components/seo/Blocks";

const meta = {
  title: "Gokarna Boat Trip Packages | Rudra Gokarna Adventures",
  description: "Compare 2–4 hour boat packages from Gokarna Beach: sightseeing, kayaking, snorkelling, dolphin watching, fishing, bioluminescence and mangrove trips.",
  path: "/packages",
};
export const metadata: Metadata = pageMetadata(meta);

const summary = pageSummaries.packages;

export default function PackagesPage() {
  return (
    <>
      <PageHeader crumb="Packages" title="Gokarna boat packages" intro={summary.answerSummary} meta={<LastUpdated date={summary.updatedAt} />}>
        <Button href="/#book">Plan & book</Button>
      </PageHeader>
      <Section id="all-packages" tone="sand" title="Every package in full">
        <div data-reveal className="mb-10 max-w-3xl">
          <KeyFacts id="packages-key-facts" facts={summary.keyFacts} />
        </div>
        <ul data-reveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {packages.map((item, index) => (
            <li key={item.id}>
              <PackageCard item={item} showAll priority={index === 0} sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 280px" />
            </li>
          ))}
        </ul>
      </Section>
      <Section id="compare" tone="navy" title="Compare all packages" intro={<p>Every activity and stop, side by side.</p>}>
        <div data-reveal>
          <CompareTable />
        </div>
      </Section>
      <FaqGoodToKnow />
      <Events />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(webPageJsonLd({ path: meta.path, name: "Gokarna boat packages", description: meta.description, datePublished: summary.datePublished, dateModified: summary.updatedAt, type: "CollectionPage" }))}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(touristTripsJsonLd())} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(faqJsonLd())} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd("Packages", "/packages"))} />
    </>
  );
}
