import { Img } from "@/components/ui/Img";
import { Check, ChevronDown, Clock } from "lucide-react";
import { highlights, type HighlightId, type TripPackage } from "@/data/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";

function HighlightItem({ id }: { id: HighlightId }) {
  return (
    <li className="flex gap-2">
      <Check aria-hidden="true" className="mt-0.5 text-navy-700" />
      {highlights[id]}
    </li>
  );
}

export function priceLine(price: number | null) {
  return price === null ? "Price on enquiry" : `From ₹${price.toLocaleString("en-IN")}`;
}

// Image widths: carousel cards are min(85vw, 360px) on phones and 44vw on tablets; 4 columns (~280px) from 1024px.
const carouselSizes = "(max-width: 423px) 85vw, (max-width: 767px) 360px, (max-width: 1023px) 44vw, 280px";

// A server component: the "+N more" toggle is a native <details>, so the cards ship no JavaScript.
// `showAll` lists every highlight with no toggle (used on the /packages page). `priority` marks the one card image
// that is above the fold (the first card on /packages), so it loads eagerly at high priority instead of lazily.
export function PackageCard({ item, showAll = false, sizes = carouselSizes, priority = false }: { item: TripPackage; showAll?: boolean; sizes?: string; priority?: boolean }) {
  const top = showAll ? item.highlights : item.highlights.slice(0, 3);
  const rest = showAll ? [] : item.highlights.slice(3);

  return (
    <article
      id={item.id}
      className={`flex h-full scroll-mt-24 flex-col overflow-hidden rounded-card bg-white text-ink shadow-[0_12px_32px_-18px_rgb(15_23_42/0.35)] transition-transform duration-250 ease-out hover:-translate-y-1 ${item.featured ? "ring-2 ring-gold" : "ring-1 ring-line"}`}
    >
      <div className="relative aspect-[16/10] bg-navy-700">
        <Img src={item.image.src} alt={item.image.alt} fill sizes={sizes} className="object-cover" {...(priority ? { loading: "eager", fetchPriority: "high" } : {})} />
        <span className="glass-dark absolute top-3 left-3 inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-white">
          <Clock aria-hidden="true" className="size-4!" />
          {item.durationHours} hrs
        </span>
        {item.badge && (
          <span className="absolute top-3 right-3 inline-flex h-8 items-center rounded-full bg-gold px-3 text-sm font-semibold text-navy-900">{item.badge}</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-h3">{item.name}</h3>
        <p className="mt-2 text-muted">{item.description}</p>
        <p className="mt-2 text-sm">
          <span className="font-semibold">Best for:</span> {item.bestFor}
        </p>
        <ul className="mt-3 grid gap-1.5">
          {top.map((id) => (
            <HighlightItem key={id} id={id} />
          ))}
        </ul>
        {rest.length > 0 && (
          <details className="group">
            <summary className="mt-1 inline-flex h-11 cursor-pointer list-none items-center gap-1 text-sm font-semibold underline decoration-ink/40 underline-offset-4 hover:decoration-ink [&::-webkit-details-marker]:hidden">
              <span className="group-open:hidden">+{rest.length} more</span>
              <span className="hidden group-open:inline">Show fewer</span>
              <span className="sr-only"> highlights in the {item.name}</span>
              <ChevronDown aria-hidden="true" className="size-4! transition-transform group-open:rotate-180" />
            </summary>
            <ul className="mt-1 grid gap-1.5">
              {rest.map((id) => (
                <HighlightItem key={id} id={id} />
              ))}
            </ul>
          </details>
        )}
        <div className="mt-auto pt-4">
          <p className="text-sm text-muted">{priceLine(item.price)}</p>
          {item.maxGuests !== null && <p className="text-sm text-muted">Up to {item.maxGuests} guests</p>}
          <Button href={buildWhatsAppLink(item.message)} variant={item.featured ? "primary" : "secondary"} className="mt-3 w-full">
            Enquire<span className="sr-only"> about the {item.name}</span>
          </Button>
        </div>
      </div>
    </article>
  );
}
