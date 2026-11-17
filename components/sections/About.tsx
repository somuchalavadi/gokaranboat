import { about } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Img } from "@/components/ui/Img";
import { Section } from "@/components/ui/Section";

export function About() {
  return (
    <Section id="about" tone="sand">
      <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div data-reveal className="lg:col-span-6">
          <h2 id="about-title" className="text-h2">
            {about.title}
          </h2>
          <div className="mt-4 grid gap-3 text-lg text-muted">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <Button href={about.cta.href} variant="text" className="mt-4">
            {about.cta.label}
          </Button>
        </div>
        <div data-reveal className="relative aspect-[4/3] overflow-hidden rounded-card bg-navy-700 lg:col-span-6">
          <Img src={about.image.src} alt={about.image.alt} fill sizes="(max-width: 1023px) 100vw, 580px" className="object-cover" />
        </div>
      </div>
    </Section>
  );
}
