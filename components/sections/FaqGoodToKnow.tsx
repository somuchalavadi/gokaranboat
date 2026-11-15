import { Binoculars, CalendarDays, CloudSun, HeartPulse } from "lucide-react";
import { faq, goodToKnow } from "@/data/site";
import { Accordion } from "@/components/ui/Accordion";
import { Section } from "@/components/ui/Section";

const icons = { weather: CloudSun, wildlife: Binoculars, health: HeartPulse, dates: CalendarDays };

export function FaqGoodToKnow() {
  return (
    <Section id="faq" tone="sand" title="Before you book">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div data-reveal>
          <h3 className="text-h3">Good to know</h3>
          <ul className="mt-4 grid gap-2">
            {goodToKnow.map((item) => {
              const Icon = icons[item.icon];
              return (
                <li key={item.text} className="flex items-start gap-4 rounded-card bg-white px-4 py-3 ring-1 ring-line">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-sand-50 text-navy-900">
                    <Icon aria-hidden="true" />
                  </span>
                  <span className="pt-2">{item.text}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div data-reveal>
          <h3 className="text-h3">Common questions</h3>
          <Accordion name="faq" items={faq} className="mt-4" />
        </div>
      </div>
    </Section>
  );
}
