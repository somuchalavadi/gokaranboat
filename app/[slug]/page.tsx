import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { contact } from "@/data/site";
import { getSeoPage, linkLabel, seoPages } from "@/data/seo-pages";
import { breadcrumbJsonLd, faqJsonLd, jsonLdScript, pageMetadata } from "@/lib/seo";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Img } from "@/components/ui/Img";
import { FaqList, KeyFacts, LastUpdated, RelatedPages } from "@/components/seo/Blocks";

// One static page per entry in data/seo-pages.ts; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return seoPages.map((page) => ({ slug: page.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getSeoPage((await params).slug);
  return page ? pageMetadata({ title: page.title, description: page.description, path: `/${page.slug}` }) : {};
}

const parents = [{ label: "Things to do", href: "/adventures" }];

export default async function LandingPage({ params }: Props) {
  const page = getSeoPage((await params).slug);
  if (!page) notFound();

  // Paragraphs that depend on unconfirmed facts are null; a section with nothing left is skipped.
  const sections = page.sections
    .map((section) => ({ ...section, paragraphs: section.paragraphs.filter((paragraph): paragraph is string => paragraph !== null) }))
    .filter((section) => section.paragraphs.length > 0 || (section.list?.length ?? 0) > 0);
  const related = page.relatedSlugs.map((slug) => ({ href: `/${slug}`, label: linkLabel(slug), text: getSeoPage(slug)?.description ?? "" }));

  return (
    <>
      <PageHeader crumb={page.h1} parents={parents} title={page.h1} intro={page.answerSummary} meta={<LastUpdated date={page.updatedAt} />}>
        <Button href={buildWhatsAppLink(page.whatsappMessage)}>Enquire on WhatsApp</Button>
        <Button href={contact.pickup.mapsUrl} variant="text" tone="dark">
          <MapPin aria-hidden="true" />
          Pick-up point on Google Maps
        </Button>
      </PageHeader>

      <div className="bg-sand-50 py-16 text-ink lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <aside className="grid content-start gap-6 lg:order-2 lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-navy-700">
              <Img src={page.heroImage.src} alt={page.heroImage.alt} fill sizes="(max-width: 1023px) 100vw, 480px" loading="eager" fetchPriority="high" className="object-cover" />
            </div>
            <KeyFacts id="key-facts" facts={page.keyFacts} />
            {page.gallery.map((image) => (
              <div key={image.src} className="relative aspect-[4/3] overflow-hidden rounded-card bg-navy-700">
                <Img src={image.src} alt={image.alt} fill sizes="(max-width: 1023px) 100vw, 480px" className="object-cover" />
              </div>
            ))}
          </aside>
          <article className="grid content-start gap-10 lg:order-1 lg:col-span-7">
            {sections.map((section) => (
              <section key={section.id} aria-labelledby={`section-${section.id}`}>
                <h2 id={`section-${section.id}`} className="text-h3">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-3 text-lg text-muted">
                    {paragraph}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-3 grid list-disc gap-1 pl-5 text-lg text-muted">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </article>
        </Container>
      </div>

      <div className="bg-navy-900 py-16 text-white lg:py-24">
        <Container>
          <FaqList id="faq" title={`Questions about ${page.h1.charAt(0).toLowerCase()}${page.h1.slice(1)}`} faqs={page.faqs} tone="navy" />
        </Container>
      </div>

      <div className="bg-sand-50 py-16 text-ink lg:py-24">
        <Container>
          <RelatedPages id="related" title="Related trips" links={related} />
        </Container>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(faqJsonLd(page.faqs))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd(page.h1, `/${page.slug}`, parents))} />
    </>
  );
}
