import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { contact } from "@/data/site";
import { getGuide, guideHubSlug, guidePath, guides, guideUi, type GuideSection } from "@/data/guides";
import { sightings } from "@/data/sightings";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, jsonLdScript, pageMetadata, sightingsDatasetJsonLd, webPageJsonLd } from "@/lib/seo";
import { buildWhatsAppLink, isOutboundBookingLink, outboundRel } from "@/lib/whatsapp";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Img } from "@/components/ui/Img";
import { FaqList, KeyFacts, LastUpdated, RelatedPages } from "@/components/seo/Blocks";

// One static page per entry in data/guides.ts; any other slug (including guides still waiting for data) is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = getGuide((await params).slug);
  return guide ? pageMetadata({ title: guide.title, description: guide.description, path: guidePath(guide.slug) }) : {};
}

const linkClass = "inline-flex min-h-11 items-center font-semibold underline decoration-ink/40 underline-offset-4 hover:decoration-ink";

function SectionLink({ href, label }: { href: string; label: string }) {
  if (href.startsWith("https://")) {
    return (
      <a href={href} target="_blank" rel={isOutboundBookingLink(href) ? outboundRel : "noopener noreferrer"} className={linkClass}>
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={linkClass}>
      {label}
    </Link>
  );
}

function GuideBody({ section }: { section: GuideSection & { paragraphs: string[] } }) {
  return (
    <section aria-labelledby={`section-${section.id}`}>
      <h2 id={`section-${section.id}`} className="text-h3">
        {section.heading}
      </h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph} className="mt-3 text-lg text-muted">
          {paragraph}
        </p>
      ))}
      {section.list &&
        (section.ordered ? (
          <ol className="mt-3 grid list-decimal gap-1 pl-6 text-lg text-muted">
            {section.list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        ) : (
          <ul className="mt-3 grid list-disc gap-1 pl-5 text-lg text-muted">
            {section.list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ))}
      {section.table && section.table.rows.length > 0 && (
        <div role="region" aria-label={section.table.caption} tabIndex={0} className="mt-4 overflow-x-auto rounded-card bg-white ring-1 ring-line">
          <table className="w-full text-left">
            <caption className="sr-only">{section.table.caption}</caption>
            <thead className="text-sm tracking-[0.06em] text-muted uppercase">
              <tr>
                {section.table.head.map((cell) => (
                  <th key={cell} scope="col" className="px-4 py-3 font-semibold">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row) => (
                <tr key={row.join("|")} className="border-t border-line">
                  {row.map((cell, index) =>
                    index === 0 ? (
                      <th key={index} scope="row" className="px-4 py-3 font-semibold">
                        {cell}
                      </th>
                    ) : (
                      <td key={index} className="px-4 py-3">
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {section.links && section.links.length > 0 && (
        <ul className="mt-2 flex flex-wrap gap-x-6">
          {section.links.map((link) => (
            <li key={link.href}>
              <SectionLink {...link} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default async function GuidePage({ params }: Props) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();

  const hub = getGuide(guideHubSlug);
  const isHub = guide.slug === guideHubSlug;
  const parents = isHub || !hub ? [] : [{ label: hub.linkLabel, href: guidePath(hub.slug) }];
  const path = guidePath(guide.slug);
  // Paragraphs that depend on unconfirmed facts are null; a section with nothing left to show is skipped.
  const sections = guide.sections
    .map((section) => ({ ...section, paragraphs: section.paragraphs.filter((paragraph): paragraph is string => paragraph !== null) }))
    .filter((section) => section.paragraphs.length > 0 || (section.list?.length ?? 0) > 0 || (section.table?.rows.length ?? 0) > 0);
  const others = guides.filter((other) => other.slug !== guide.slug).map((other) => ({ href: guidePath(other.slug), label: other.linkLabel, text: other.description }));
  const hasFaq = guide.faqs.some((faq) => faq.answer !== null);

  return (
    <>
      <PageHeader crumb={guide.h1} parents={parents} title={guide.h1} intro={guide.answerSummary} meta={<LastUpdated date={guide.updatedAt} />}>
        <Button href={buildWhatsAppLink(`Hi, I read your guide "${guide.h1}" and I'd like to ask about a boat trip.`)}>Ask on WhatsApp</Button>
        <Button href={contact.pickup.mapsUrl} variant="text" tone="dark">
          <MapPin aria-hidden="true" />
          Pick-up point on Google Maps
        </Button>
      </PageHeader>

      <div className="bg-sand-50 py-16 text-ink lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <aside className="grid content-start gap-6 lg:order-2 lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-navy-700">
              <Img src={guide.image.src} alt={guide.image.alt} fill sizes="(max-width: 1023px) 100vw, 480px" loading="eager" fetchPriority="high" className="object-cover" />
            </div>
            <KeyFacts id="key-facts" facts={guide.keyFacts} />
          </aside>
          <article className="grid content-start gap-10 lg:order-1 lg:col-span-7">
            {sections.length >= guideUi.tocMinSections && (
              <nav aria-label={guideUi.toc} className="rounded-card bg-white p-5 ring-1 ring-line">
                <p className="text-sm font-semibold tracking-[0.06em] text-muted uppercase">{guideUi.toc}</p>
                <ol className="mt-2 grid gap-x-6 sm:grid-cols-2">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a href={`#section-${section.id}`} className="inline-flex min-h-11 items-center underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            {sections.map((section) => (
              <GuideBody key={section.id} section={section} />
            ))}
          </article>
        </Container>
      </div>

      {hasFaq && (
        <div className="bg-navy-900 py-16 text-white lg:py-24">
          <Container>
            <FaqList id="faq" title="Quick answers" faqs={guide.faqs} tone="navy" />
          </Container>
        </div>
      )}

      <div className="bg-sand-50 py-16 text-ink lg:py-24">
        <Container>
          <RelatedPages id="related" title={isHub ? "Guides" : "More guides"} links={others} />
        </Container>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(webPageJsonLd({ path, name: guide.h1, description: guide.description, datePublished: guide.datePublished, dateModified: guide.updatedAt, authored: true, image: guide.image.src }))}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(articleJsonLd({ ...guide, path }))} />
      {guide.slug === "dolphin-sighting-log" && <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(sightingsDatasetJsonLd({ ...guide, path }, sightings))} />}
      {hasFaq && <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(faqJsonLd(guide.faqs))} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd(guide.h1, path, parents))} />
    </>
  );
}
