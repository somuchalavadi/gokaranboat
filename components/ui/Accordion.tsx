import { ChevronDown } from "lucide-react";

// Native <details> with a shared name: one open at a time, keyboard support built in, answers stay in the HTML.
export function Accordion({ name, items, className = "" }: { name: string; items: readonly { question: string; answer: string }[]; className?: string }) {
  return (
    <div className={`divide-y divide-line rounded-card bg-white ring-1 ring-line ${className}`}>
      {items.map((item) => (
        <details key={item.question} name={name} className="group px-5">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 font-semibold [&::-webkit-details-marker]:hidden">
            {item.question}
            <ChevronDown aria-hidden="true" className="transition-transform duration-200 group-open:rotate-180" />
          </summary>
          <p className="pb-5 text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
