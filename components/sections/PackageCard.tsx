"use client";

import Image from "next/image";
import { Check, Clock } from "lucide-react";
import { useState } from "react";
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

export function PackageCard({ item, headingLevel = "h3" }: { item: TripPackage; headingLevel?: "h2" | "h3" }) {
  const [expanded, setExpanded] = useState(false);
  const top = item.highlights.slice(0, 3);
  const rest = item.highlights.slice(3);
  const moreId = `${item.id}-more`;
  const Heading = headingLevel;

  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-card bg-white text-ink shadow-[0_12px_32px_-18px_rgb(15_23_42/0.35)] transition-transform duration-250 ease-out hover:-translate-y-1 ${item.featured ? "ring-2 ring-gold" : "ring-1 ring-line"}`}
    >
      <div className="relative aspect-[16/10] bg-navy-700">
        <Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 767px) 85vw, (max-width: 1023px) 45vw, 280px" className="object-cover" />
        <span className="glass-dark absolute top-3 left-3 inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-white">
          <Clock aria-hidden="true" className="size-4!" />
          {item.durationHours} hrs
        </span>
        {item.badge && (
          <span className="absolute top-3 right-3 inline-flex h-8 items-center rounded-full bg-gold px-3 text-sm font-semibold text-navy-900">{item.badge}</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <Heading className="text-h3">{item.name}</Heading>
        <ul className="mt-3 grid gap-1.5">
          {top.map((id) => (
            <HighlightItem key={id} id={id} />
          ))}
        </ul>
        {rest.length > 0 && (
          <>
            <ul id={moreId} hidden={!expanded} className="mt-1.5 grid gap-1.5">
              {rest.map((id) => (
                <HighlightItem key={id} id={id} />
              ))}
            </ul>
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={moreId}
              onClick={() => setExpanded((open) => !open)}
              className="mt-1 inline-flex h-11 items-center self-start text-sm font-semibold underline decoration-ink/40 underline-offset-4 hover:decoration-ink"
            >
              {expanded ? "Show fewer" : `+${rest.length} more`}
              <span className="sr-only"> in the {item.name}</span>
            </button>
          </>
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
