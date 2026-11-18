"use client";

import { ChevronDown, MessageCircle, Minus, Plus } from "lucide-react";
import { useId, useState } from "react";
import { enquiry, type EnquiryTypeId } from "@/data/site";
import { track } from "@/lib/analytics";
import { buildEnquiryMessage, buildWhatsAppLink, outboundRel } from "@/lib/whatsapp";
import { buttonClass } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";

const storageKey = "rga-enquiry-type";
const { min: minGuests, max: maxGuests } = enquiry.guests;

function storedType(): EnquiryTypeId | null {
  try {
    const value = window.sessionStorage.getItem(storageKey);
    return enquiry.types.find((type) => type.id === value)?.id ?? null;
  } catch {
    return null;
  }
}

function localToday() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

const stepperClass = "inline-flex size-11 items-center justify-center rounded-full border border-ink/25 bg-white transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-40";

export function EnquiryDialog({ open, preset, onClose }: { open: boolean; preset: EnquiryTypeId | null; onClose: () => void }) {
  const [type, setType] = useState<EnquiryTypeId | null>(() => preset ?? storedType());
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState<number | null>(null);
  const [today] = useState(localToday);
  const id = useId();

  const chosen = enquiry.types.find((item) => item.id === type);
  // Past or malformed dates are left out of the message rather than sent.
  const validDate = /^\d{4}-\d{2}-\d{2}$/.test(date) && date >= today ? date : null;
  const href = chosen ? buildWhatsAppLink(buildEnquiryMessage({ phrase: chosen.phrase, date: validDate, guests })) : null;

  function choose(next: EnquiryTypeId) {
    setType(next);
    try {
      window.sessionStorage.setItem(storageKey, next);
    } catch {
      // Storage can be unavailable (private mode, blocked); remembering the choice is optional.
    }
    track("enquiry_type_selected", { type: next });
  }

  const optionClass =
    "flex min-h-12 w-full cursor-pointer items-center rounded-input border border-ink/20 bg-white px-4 py-2 font-semibold transition-colors select-none hover:border-ink peer-checked:border-navy-900 peer-checked:bg-navy-900 peer-checked:text-white peer-focus-visible:shadow-[0_0_0_6px_var(--color-navy-900)] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold";

  return (
    <Dialog open={open} onClose={onClose} label={enquiry.title} variant="compact" className="glass-light bg-white/90!">
      <div className="p-5 pt-6 sm:p-6">
        <h2 id={`${id}-title`} className="pr-12 text-h3">
          {enquiry.title}
        </h2>

        <fieldset className="mt-4">
          <legend className="sr-only">{enquiry.typesLegend}</legend>
          <div className="grid gap-2">
            {enquiry.types.map((item) => (
              <label key={item.id} className="block">
                <input type="radio" name={`${id}-type`} value={item.id} checked={type === item.id} onChange={() => choose(item.id)} className="peer sr-only" />
                <span className={optionClass}>{item.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <details className="group mt-4">
          <summary className="inline-flex h-11 cursor-pointer list-none items-center gap-1 font-semibold underline decoration-ink/40 underline-offset-4 hover:decoration-ink [&::-webkit-details-marker]:hidden">
            {enquiry.optionalToggle}
            <ChevronDown aria-hidden="true" className="size-4! transition-transform group-open:rotate-180" />
          </summary>
          <div className="mt-2 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={`${id}-date`} className="text-sm font-semibold">
                {enquiry.dateLabel}
              </label>
              <input
                id={`${id}-date`}
                type="date"
                min={today}
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="mt-1 block h-12 w-full rounded-input border border-ink/25 bg-white px-3 text-base text-ink"
              />
            </div>
            <div>
              <span id={`${id}-guests`} className="text-sm font-semibold">
                {enquiry.guestsLabel}
              </span>
              <div role="group" aria-labelledby={`${id}-guests`} className="mt-1 flex h-12 items-center gap-3">
                <button
                  type="button"
                  aria-label={enquiry.fewerGuests}
                  disabled={guests === null}
                  onClick={() => setGuests((value) => (value === null || value <= minGuests ? null : value - 1))}
                  className={stepperClass}
                >
                  <Minus aria-hidden="true" />
                </button>
                <output aria-live="polite" className="min-w-16 text-center font-semibold">
                  {guests ?? enquiry.guestsUnset}
                </output>
                <button
                  type="button"
                  aria-label={enquiry.moreGuests}
                  disabled={guests === maxGuests}
                  onClick={() => setGuests((value) => (value === null ? minGuests : Math.min(maxGuests, value + 1)))}
                  className={stepperClass}
                >
                  <Plus aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </details>

        <div className="mt-5">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel={outboundRel}
              data-ga-source="popup"
              data-ga-type={type ?? undefined}
              onClick={() => window.setTimeout(onClose, 0)}
              className={buttonClass("primary", "light", "w-full")}
            >
              <MessageCircle aria-hidden="true" />
              {enquiry.submit}
            </a>
          ) : (
            <button type="button" disabled className={buttonClass("primary", "light", "w-full cursor-not-allowed opacity-50 hover:translate-y-0")}>
              <MessageCircle aria-hidden="true" />
              {enquiry.submit}
            </button>
          )}
          <p className="mt-2 text-center text-sm text-muted">{enquiry.note}</p>
        </div>
      </div>
    </Dialog>
  );
}
