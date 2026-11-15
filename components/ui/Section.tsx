import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

type Tone = "navy" | "sand";

export const toneClass: Record<Tone, string> = {
  navy: "bg-navy-900 text-white",
  sand: "bg-sand-50 text-ink",
};

export const mutedText: Record<Tone, string> = {
  navy: "text-mist",
  sand: "text-muted",
};

// Every section gets exactly one H2. Pass `title` to render the standard header, or omit it and
// render an element with id `${id}-title` yourself.
export function Section({
  id,
  tone,
  title,
  intro,
  action,
  className = "",
  children,
}: {
  id: string;
  tone: Tone;
  title?: string;
  intro?: ReactNode;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`${toneClass[tone]} py-16 lg:py-28 ${className}`}>
      <Container>
        {title && (
          <header data-reveal className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between lg:mb-12">
            <div className="max-w-2xl">
              <h2 id={`${id}-title`} className="text-h2">
                {title}
              </h2>
              {intro && <div className={`mt-3 text-lg ${mutedText[tone]}`}>{intro}</div>}
            </div>
            {action}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
