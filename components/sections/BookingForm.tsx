"use client";

import { Check, MessageCircle, Minus, Plus } from "lucide-react";
import { useRef, useState, useSyncExternalStore, type FormEvent, type ReactNode } from "react";
import { booking, packages, places, type TripPackage } from "@/data/site";
import { buildBookingMessage, buildWhatsAppLink, isIndianMobile, outboundRel } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { track } from "@/lib/analytics";

type Trip = TripPackage["id"] | "custom";
type Field = "trip" | "date" | "guests" | "name" | "phone";
type Errors = Partial<Record<Field, string>>;

const tripOptions: { id: Trip; label: string }[] = [...packages.map((item) => ({ id: item.id, label: item.shortName })), { id: "custom", label: "Custom" }];
const steps = ["Choose a trip", "Date and guests", "Your details"];
const { min: minGuests, max: maxGuests } = booking.guests;

const inputClass =
  "mt-2 block h-12 w-full rounded-input border border-ink/25 bg-white px-4 text-base text-ink placeholder:text-muted aria-invalid:border-danger";
const chipClass =
  "inline-flex h-12 cursor-pointer items-center gap-2 rounded-full border border-ink/25 bg-white px-5 font-semibold transition-colors select-none hover:border-ink peer-checked:border-navy-900 peer-checked:bg-navy-900 peer-checked:text-white peer-focus-visible:shadow-[0_0_0_6px_var(--color-navy-900)] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold";

// Local date as YYYY-MM-DD. Read on the client only, so a static build never freezes "today".
function todayIso() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}
const subscribeNever = () => () => {};

function FieldError({ id, children }: { id: string; children?: ReactNode }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-danger">
      {children}
    </p>
  );
}

export function BookingForm() {
  const [step, setStep] = useState(0);
  const [trip, setTrip] = useState<Trip | null>(null);
  const [chosenPlaces, setChosenPlaces] = useState<string[]>([]);
  const [hours, setHours] = useState<number>(booking.customDurations[1]);
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [link, setLink] = useState<string | null>(null);
  const minDate = useSyncExternalStore(subscribeNever, todayIso, () => undefined);
  const formRef = useRef<HTMLFormElement>(null);
  const stepHeading = useRef<HTMLHeadingElement>(null);

  function validate(current: number): Errors {
    const found: Errors = {};
    if (current === 0 && !trip) found.trip = "Choose a trip to continue.";
    if (current === 1) {
      if (!date) found.date = "Choose a date.";
      else if (minDate && date < minDate) found.date = "Choose today or a later date.";
      if (!Number.isInteger(guests) || guests < minGuests || guests > maxGuests) found.guests = `Enter between ${minGuests} and ${maxGuests} guests.`;
    }
    if (current === 2) {
      if (!name.trim()) found.name = "Enter your name.";
      if (!phone.trim()) found.phone = "Enter your phone number.";
      else if (!isIndianMobile(phone)) found.phone = "Enter a 10-digit Indian mobile number, for example 98765 43210.";
    }
    return found;
  }

  function check(current: number) {
    const found = validate(current);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus();
    return !first;
  }

  function goTo(next: number) {
    setStep(next);
    setLink(null);
    requestAnimationFrame(() => stepHeading.current?.focus());
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!check(step)) return;
    if (step < steps.length - 1) {
      goTo(step + 1);
      return;
    }
    const chosen = packages.find((item) => item.id === trip);
    const message = buildBookingMessage({
      trip: chosen ? `${chosen.name} (${chosen.durationHours} hours)` : "Custom trip",
      places: trip === "custom" ? chosenPlaces : [],
      hours: trip === "custom" ? hours : null,
      date,
      guests,
      name,
      phone,
    });
    const url = buildWhatsAppLink(message);
    setLink(url);
    // Trip type and group size only: no name, phone or date leaves the page.
    track("booking_form_submit", { trip: trip ?? "none", guests });
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const describedBy = (field: Field) => (errors[field] ? `book-${field}-error` : undefined);

  return (
    <form ref={formRef} onSubmit={submit} noValidate aria-labelledby="book-step-title">
      <div className="flex items-baseline justify-between gap-4">
        <h3 id="book-step-title" ref={stepHeading} tabIndex={-1} className="text-h3">
          {steps[step]}
        </h3>
        <p className="shrink-0 text-sm text-muted">
          Step {step + 1} of {steps.length}
        </p>
      </div>
      <div aria-hidden="true" className="mt-3 grid grid-cols-3 gap-2">
        {steps.map((label, index) => (
          <span key={label} className={`h-1.5 rounded-full transition-colors ${index <= step ? "bg-navy-900" : "bg-ink/15"}`} />
        ))}
      </div>

      <div className="mt-6">
        {step === 0 && (
          <>
            <fieldset aria-describedby={describedBy("trip")}>
              <legend className="font-semibold">Which trip would you like?</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {tripOptions.map((option, index) => (
                  <label key={option.id} className="relative">
                    <input
                      type="radio"
                      name="trip"
                      value={option.id}
                      checked={trip === option.id}
                      onChange={() => {
                        setTrip(option.id);
                        setErrors({});
                      }}
                      data-field={index === 0 ? "trip" : undefined}
                      className="peer sr-only"
                    />
                    <span className={chipClass}>{option.label}</span>
                  </label>
                ))}
              </div>
              <FieldError id="book-trip-error">{errors.trip}</FieldError>
            </fieldset>

            {trip === "custom" && (
              <>
                <fieldset className="mt-6">
                  <legend className="font-semibold">
                    Places you&apos;d like to see <span className="font-normal text-muted">(optional)</span>
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {places.map((place) => {
                      const checked = chosenPlaces.includes(place.title);
                      return (
                        <label key={place.id} className="relative">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => setChosenPlaces((current) => (checked ? current.filter((item) => item !== place.title) : [...current, place.title]))}
                            className="peer sr-only"
                          />
                          <span className={chipClass}>
                            {checked && <Check aria-hidden="true" />}
                            {place.title}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
                <fieldset className="mt-6">
                  <legend className="font-semibold">Trip length</legend>
                  <div className="mt-3 inline-grid grid-cols-3 rounded-full bg-sand-50 p-1 ring-1 ring-line">
                    {booking.customDurations.map((value) => (
                      <label key={value} className="relative">
                        <input type="radio" name="hours" value={value} checked={hours === value} onChange={() => setHours(value)} className="peer sr-only" />
                        <span className="inline-flex h-11 min-w-20 cursor-pointer items-center justify-center rounded-full px-4 font-semibold transition-colors peer-checked:bg-navy-900 peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold">
                          {value} hrs
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </>
            )}
          </>
        )}

        {step === 1 && (
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="book-date" className="font-semibold">
                Date
              </label>
              <input
                id="book-date"
                data-field="date"
                type="date"
                min={minDate}
                value={date}
                onChange={(event) => setDate(event.target.value)}
                aria-invalid={errors.date ? true : undefined}
                aria-describedby={describedBy("date")}
                className={inputClass}
              />
              <FieldError id="book-date-error">{errors.date}</FieldError>
            </div>
            <div>
              <label htmlFor="book-guests" className="font-semibold">
                Guests
              </label>
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setGuests((value) => Math.max(minGuests, value - 1))}
                  disabled={guests <= minGuests}
                  aria-label="Remove a guest"
                  className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-ink/25 hover:ring-ink disabled:opacity-40"
                >
                  <Minus aria-hidden="true" />
                  <span className="sr-only">Remove a guest</span>
                </button>
                <input
                  id="book-guests"
                  data-field="guests"
                  type="number"
                  inputMode="numeric"
                  min={minGuests}
                  max={maxGuests}
                  value={Number.isNaN(guests) ? "" : guests}
                  onChange={(event) => setGuests(event.target.valueAsNumber)}
                  aria-invalid={errors.guests ? true : undefined}
                  aria-describedby={describedBy("guests")}
                  className="h-12 w-20 rounded-input border border-ink/25 bg-white text-center text-base aria-invalid:border-danger"
                />
                <button
                  type="button"
                  onClick={() => setGuests((value) => Math.min(maxGuests, (Number.isNaN(value) ? minGuests - 1 : value) + 1))}
                  disabled={guests >= maxGuests}
                  aria-label="Add a guest"
                  className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-ink/25 hover:ring-ink disabled:opacity-40"
                >
                  <Plus aria-hidden="true" />
                  <span className="sr-only">Add a guest</span>
                </button>
              </div>
              <FieldError id="book-guests-error">{errors.guests}</FieldError>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="book-name" className="font-semibold">
                Name
              </label>
              <input
                id="book-name"
                data-field="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={describedBy("name")}
                className={inputClass}
              />
              <FieldError id="book-name-error">{errors.name}</FieldError>
            </div>
            <div>
              <label htmlFor="book-phone" className="font-semibold">
                Phone
              </label>
              <input
                id="book-phone"
                data-field="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="98765 43210"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                aria-invalid={errors.phone ? true : undefined}
                aria-describedby={describedBy("phone")}
                className={inputClass}
              />
              <FieldError id="book-phone-error">{errors.phone}</FieldError>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 0 ? (
          <Button variant="text" onClick={() => goTo(step - 1)}>
            Back
          </Button>
        ) : (
          <span />
        )}
        <Button type="submit">
          {step < steps.length - 1 ? (
            "Next"
          ) : (
            <>
              <MessageCircle aria-hidden="true" />
              Send on WhatsApp
            </>
          )}
        </Button>
      </div>

      <p role="status" aria-live="polite" className="mt-4 text-sm empty:hidden">
        {link && (
          <>
            Opening WhatsApp… If it didn&apos;t open,{" "}
            <a href={link} target="_blank" rel={outboundRel} className="font-semibold underline underline-offset-4">
              open WhatsApp again
            </a>
            .
          </>
        )}
      </p>
    </form>
  );
}
