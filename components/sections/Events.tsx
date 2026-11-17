import { events } from "@/data/site";
import { linkLabel } from "@/data/seo-pages";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export function Events() {
  return (
    <Section id="events" tone="navy">
      <div data-reveal className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <h2 id="events-title" className="text-h2">
            {events.title}
          </h2>
          <p className="mt-3 text-lg text-mist">{events.copy}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {events.pills.map((pill) => (
              <li key={pill} className="inline-flex h-10 items-center rounded-full bg-navy-700 px-4 text-sm font-medium">
                {pill}
              </li>
            ))}
          </ul>
          <Button href="/private-boat-gokarna" variant="text" tone="dark" className="mt-3">
            {linkLabel("private-boat-gokarna")}
          </Button>
        </div>
        <Button href={buildWhatsAppLink(events.message)} className="self-start lg:self-center">
          {events.cta}
        </Button>
      </div>
    </Section>
  );
}
