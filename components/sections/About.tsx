import { about } from "@/data/site";
import { pageSummaries } from "@/data/pages";
import { Button } from "@/components/ui/Button";
import { Img } from "@/components/ui/Img";
import { Section } from "@/components/ui/Section";
import { KeyFacts, LastUpdated } from "@/components/seo/Blocks";

const summary = pageSummaries.home;

// Text and key facts on the left; from 1024px the photo stretches to the height of that column.
export function About() {
  return (
    <Section id="about" tone="sand">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div data-reveal className="lg:col-span-6">
          <h2 id="about-title" className="text-h2">
            {about.title}
          </h2>
          <p data-answer-summary className="mt-4 text-lg">
            {summary.answerSummary}
          </p>
          <div className="mt-3 grid gap-3 text-lg text-muted">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <Button href={about.cta.href} variant="text" className="mt-4">
            {about.cta.label}
          </Button>
          <div className="mt-6">
            <KeyFacts id="home-key-facts" facts={summary.keyFacts} />
            <div className="mt-3 text-sm text-muted">
              <LastUpdated date={summary.updatedAt} />
            </div>
          </div>
        </div>
        <div data-reveal className="relative aspect-[4/3] overflow-hidden rounded-card bg-navy-700 lg:col-span-6 lg:aspect-auto">
          <Img src={about.image.src} alt={about.image.alt} fill sizes="(max-width: 1023px) 100vw, 580px" className="object-cover" />
        </div>
      </div>
    </Section>
  );
}
