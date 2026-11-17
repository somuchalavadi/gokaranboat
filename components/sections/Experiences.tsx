import Link from "next/link";
import { activities, experiencesIntro, places } from "@/data/site";
import { landingForHighlight, linkLabel, seoPages } from "@/data/seo-pages";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { ExperienceTabs } from "@/components/sections/ExperienceTabs";

// Tile id → its landing page, worked out here on the server so the page copy isn't bundled into client JS.
const tileLinks = Object.fromEntries(
  [...activities, ...places].flatMap((tile) => {
    const slug = tile.highlightIds.map((id) => landingForHighlight[id]).find(Boolean);
    return slug ? [[tile.id, { href: `/${slug}`, label: linkLabel(slug) }]] : [];
  }),
);

export function Experiences() {
  return (
    <Section
      id="experiences"
      tone="navy"
      title={experiencesIntro.title}
      intro={
        <>
          <p>{experiencesIntro.intro}</p>
          <p className="mt-1 text-sm">{experiencesIntro.stockNote}</p>
        </>
      }
      action={
        <Button href={experiencesIntro.details} variant="text" tone="dark">
          View all activities & places
        </Button>
      }
    >
      <ExperienceTabs links={tileLinks} />
      <nav aria-labelledby="activity-guides" className="mt-8">
        <h3 id="activity-guides" className="font-sans text-sm font-semibold tracking-[0.12em] text-mist uppercase">
          Read more about
        </h3>
        <ul className="mt-2 flex flex-wrap gap-x-6">
          {seoPages.map((page) => (
            <li key={page.slug}>
              <Link href={`/${page.slug}`} className="inline-flex min-h-11 items-center underline decoration-white/40 underline-offset-4 hover:decoration-white">
                {page.linkLabel}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Section>
  );
}
