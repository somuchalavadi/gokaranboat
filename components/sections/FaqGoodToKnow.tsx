import { Binoculars, CalendarDays, CloudSun, HeartPulse } from "lucide-react";
import { faq, faqIntro, goodToKnow } from "@/data/site";
import { Section } from "@/components/ui/Section";

const icons = { weather: CloudSun, wildlife: Binoculars, health: HeartPulse, dates: CalendarDays };

// Every question is a visible H3 with its answer underneath (no accordion), so crawlers and answer engines read
// the same text visitors see. Unanswered (null) questions are left out.
export function FaqGoodToKnow() {
  const answered = faq.filter((item): item is { question: string; answer: string } => item.answer !== null);
  return (
    <Section id="faq" tone="sand" title={faqIntro.title}>
      <div data-reveal>
        <h3 className="text-h3">{faqIntro.goodToKnowTitle}</h3>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
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
      <div data-reveal className="mt-12">
        <p className="text-sm font-semibold tracking-[0.12em] text-muted uppercase">{faqIntro.questionsTitle}</p>
        <div className="mt-4 grid gap-x-12 gap-y-6 md:grid-cols-2">
          {answered.map((item) => (
            <div key={item.question}>
              <h3 className="font-sans text-lg font-semibold">{item.question}</h3>
              <p className="mt-1 text-muted">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
