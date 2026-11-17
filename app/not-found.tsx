import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Rudra Gokarna Adventures" },
  description: "This page doesn't exist. Find boat trip packages and things to do on the water from Gokarna Beach.",
};

export default function NotFound() {
  return (
    <>
      <PageHeader crumb="Page not found" title={notFound.title} intro={notFound.text} />
      <section aria-labelledby="not-found-links" className="bg-sand-50 py-16 lg:py-24">
        <Container>
          <h2 id="not-found-links" className="text-h3">
            Where to next
          </h2>
          <ul className="mt-4 grid gap-1">
            {notFound.links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="inline-flex min-h-11 items-center text-lg font-semibold underline decoration-ink/40 underline-offset-4 hover:decoration-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
