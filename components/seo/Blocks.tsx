import Link from "next/link";
import type { KeyFact, PageFaq } from "@/data/seo-pages";
import { outboundRel } from "@/lib/whatsapp";

// Answer-engine friendly building blocks. All render plain server HTML; nothing is collapsed or client-only.

const formatDate = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function LastUpdated({ date }: { date: string }) {
  return (
    <p>
      Last updated: <time dateTime={date}>{formatDate(date)}</time>
    </p>
  );
}

// Key facts as a description list. Rows whose value is still null (unconfirmed) are left out.
export function KeyFacts({ id, title = "Key facts", facts, tone = "sand" }: { id: string; title?: string; facts: readonly KeyFact[]; tone?: "sand" | "navy" }) {
  const shown = facts.filter((fact): fact is KeyFact & { value: string } => fact.value !== null);
  const muted = tone === "navy" ? "text-mist" : "text-muted";
  return (
    <section aria-labelledby={id} className={`rounded-card p-5 sm:p-6 ${tone === "navy" ? "bg-navy-700 text-white" : "bg-white text-ink ring-1 ring-line"}`}>
      <h2 id={id} className="text-h3">
        {title}
      </h2>
      <dl className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-[minmax(0,10rem)_1fr]">
        {shown.map((fact) => (
          <div key={fact.label} className="contents">
            <dt className={`text-sm font-semibold tracking-[0.06em] uppercase ${muted}`}>{fact.label}</dt>
            <dd className="-mt-2 sm:mt-0">
              {fact.href ? (
                <a href={fact.href} target="_blank" rel={outboundRel} className="inline-flex min-h-11 items-center underline decoration-current/40 underline-offset-4 hover:decoration-current">
                  {fact.value}
                </a>
              ) : (
                fact.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

// Questions as real headings with the answer visible underneath. Unanswered (null) questions are left out.
export function FaqList({ id, title, faqs, tone = "sand" }: { id: string; title: string; faqs: readonly PageFaq[]; tone?: "sand" | "navy" }) {
  const answered = faqs.filter((faq): faq is PageFaq & { answer: string } => faq.answer !== null);
  if (!answered.length) return null;
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="text-h2">
        {title}
      </h2>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {answered.map((faq) => (
          <div key={faq.question}>
            <h3 className="font-sans text-lg font-semibold">{faq.question}</h3>
            <p className={`mt-1 ${tone === "navy" ? "text-mist" : "text-muted"}`}>{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function RelatedPages({ id, title, links }: { id: string; title: string; links: readonly { href: string; label: string; text: string }[] }) {
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="text-h3">
        {title}
      </h2>
      <ul className="mt-4 grid gap-4 md:grid-cols-3">
        {links.map((link) => (
          <li key={link.href} className="rounded-card bg-white p-5 ring-1 ring-line">
            <Link href={link.href} className="inline-flex min-h-11 items-center text-lg font-semibold underline decoration-ink/40 underline-offset-4 hover:decoration-ink">
              {link.label}
            </Link>
            <p className="mt-1 text-sm text-muted">{link.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
