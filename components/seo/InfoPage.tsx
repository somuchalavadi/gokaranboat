import type { ReactNode } from "react";
import type { InfoPage } from "@/data/site";
import { breadcrumbJsonLd, jsonLdScript, webPageJsonLd } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { LastUpdated } from "@/components/seo/Blocks";

// Template for the trust pages (/about, /privacy-policy, /terms): answer-first summary under the H1, then sections
// with stable ids. Paragraphs that depend on unconfirmed facts are null and left out, as are empty sections.
export function InfoPageView({ page, type = "WebPage", aside, children }: { page: InfoPage; type?: "WebPage" | "AboutPage"; aside?: ReactNode; children?: ReactNode }) {
  const sections = page.sections
    .map((section) => ({ ...section, paragraphs: section.paragraphs.filter((paragraph): paragraph is string => paragraph !== null) }))
    .filter((section) => section.paragraphs.length > 0 || (section.list?.length ?? 0) > 0);

  return (
    <>
      <PageHeader crumb={page.crumb} title={page.h1} intro={page.answerSummary} meta={<LastUpdated date={page.updatedAt} />} />
      <div className="bg-sand-50 py-16 text-ink lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <article className="grid content-start gap-10 lg:col-span-7">
            {sections.map((section) => (
              <section key={section.id} aria-labelledby={section.id}>
                <h2 id={section.id} className="text-h3">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-3 text-lg text-muted">
                    {paragraph}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-3 grid list-disc gap-2 pl-5 text-lg text-muted">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            {children}
          </article>
          {aside && <aside className="grid content-start gap-6 lg:col-span-5">{aside}</aside>}
        </Container>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(webPageJsonLd({ path: page.path, name: page.h1, description: page.description, datePublished: page.datePublished, dateModified: page.updatedAt, type }))}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd(page.crumb, page.path))} />
    </>
  );
}
