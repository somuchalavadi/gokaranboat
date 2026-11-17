import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

export type Crumb = { label: string; href: string };

// Navy header for the secondary pages. `data-hero` keeps the navbar on dark glass over it.
// `intro` sits directly under the H1: on landing pages and guides it's the 40–60 word answer summary.
export function PageHeader({
  crumb,
  parents = [],
  title,
  intro,
  meta,
  children,
}: {
  crumb: string;
  parents?: readonly Crumb[];
  title: string;
  intro: string;
  meta?: ReactNode;
  children?: ReactNode;
}) {
  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...parents];
  return (
    <section data-hero aria-labelledby="page-title" className="bg-navy-900 pt-24 pb-14 text-white lg:pt-32 lg:pb-20">
      <Container>
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2 text-sm text-mist">
            {trail.map((item) => (
              <li key={item.href} className="inline-flex items-center gap-2">
                <Link href={item.href} className="inline-flex min-h-11 min-w-11 items-center underline-offset-4 hover:underline">
                  {item.label}
                </Link>
                <span aria-hidden="true">›</span>
              </li>
            ))}
            <li aria-current="page" className="inline-flex min-h-11 items-center">
              {crumb}
            </li>
          </ol>
        </nav>
        <h1 id="page-title" className="mt-2 max-w-3xl text-h1">
          {title}
        </h1>
        <p data-answer-summary className="mt-4 max-w-2xl text-lg text-mist">
          {intro}
        </p>
        {meta && <div className="mt-3 text-sm text-mist">{meta}</div>}
        {children && <div className="mt-8 flex flex-wrap items-center gap-3">{children}</div>}
      </Container>
    </section>
  );
}
