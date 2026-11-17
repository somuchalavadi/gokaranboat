import { Img } from "@/components/ui/Img";
import Link from "next/link";
import { packagesFor, type Tile } from "@/data/site";
import { landingForHighlight, linkLabel } from "@/data/seo-pages";

// Text-first cards for the "Things to do" page: everything the home tiles keep behind a sheet, in plain view.
// `priorityFirst` loads the first image eagerly at high priority (it's above the fold on phones).
export function TileGrid({ items, tone, priorityFirst = false }: { items: readonly Tile[]; tone: "navy" | "sand"; priorityFirst?: boolean }) {
  return (
    <ul data-reveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => {
        const included = packagesFor(item.highlightIds);
        const landing = item.highlightIds.map((id) => landingForHighlight[id]).find(Boolean);
        return (
          <li key={item.id}>
            <article className={`h-full overflow-hidden rounded-card ${tone === "navy" ? "bg-navy-700 text-white" : "bg-white text-ink ring-1 ring-line"}`}>
              <div className="relative aspect-[16/10]">
                <Img src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 384px" className="object-cover" {...(priorityFirst && index === 0 ? { loading: "eager", fetchPriority: "high" } : {})} />
              </div>
              <div className="p-5">
                <h3 className="text-h3">{item.title}</h3>
                <p className="mt-2">{item.description}</p>
                {item.note && <p className={`mt-1 text-sm font-semibold ${tone === "navy" ? "text-mist" : "text-muted"}`}>{item.note}</p>}
                {included.length > 0 && (
                  <p className={`mt-3 text-sm ${tone === "navy" ? "text-mist" : "text-muted"}`}>
                    <span className="font-semibold">Included in:</span> {included.map((pkg) => pkg.name).join(", ")}
                  </p>
                )}
                {landing && (
                  <Link href={`/${landing}`} className="mt-2 inline-flex min-h-11 items-center font-semibold underline decoration-current/40 underline-offset-4 hover:decoration-current">
                    {linkLabel(landing)}
                  </Link>
                )}
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
