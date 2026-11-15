import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

// Navy header for the secondary pages. `data-hero` keeps the navbar on dark glass over it.
export function PageHeader({ crumb, title, intro, children }: { crumb: string; title: string; intro: string; children?: ReactNode }) {
  return (
    <section data-hero aria-labelledby="page-title" className="bg-navy-900 pt-24 pb-14 text-white lg:pt-32 lg:pb-20">
      <Container>
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-mist">
            <li>
              <Link href="/" className="inline-flex min-h-11 min-w-11 items-center underline-offset-4 hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="inline-flex min-h-11 items-center">
              {crumb}
            </li>
          </ol>
        </nav>
        <h1 id="page-title" className="mt-2 max-w-3xl text-h1">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-mist">{intro}</p>
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </Container>
    </section>
  );
}
