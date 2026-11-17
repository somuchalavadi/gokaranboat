import { Img } from "@/components/ui/Img";
import { MapPin, Phone } from "lucide-react";
import { booking, contact } from "@/data/site";
import { outboundRel, telLink } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { BookingForm } from "@/components/sections/BookingForm";

const primaryPhone = contact.phones.find((phone) => phone.primary) ?? contact.phones[0];
const termClass = "text-sm font-semibold tracking-[0.12em] text-muted uppercase";
const linkClass = "inline-flex min-h-11 items-center gap-2 text-lg font-semibold underline-offset-4 hover:underline";

export function Book() {
  return (
    <Section id="book" tone="sand" title={booking.title} intro={<p>{booking.intro}</p>}>
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div data-reveal className="relative lg:col-span-7 lg:p-6">
          {/* Desktop only: a photo behind the glass card, so the blur has something to show. */}
          <div className="absolute inset-0 hidden overflow-hidden rounded-card lg:block">
            <Img src={booking.photo.src} alt={booking.photo.alt} fill sizes="680px" className="object-cover" />
          </div>
          <div className="glass-light relative rounded-card p-5 shadow-[0_24px_48px_-24px_rgb(15_23_42/0.45)] ring-1 ring-line sm:p-8">
            <BookingForm />
          </div>
        </div>

        <aside aria-label="Contact details" className="hidden lg:col-span-5 lg:block">
          <dl className="grid gap-8">
            <div>
              <dt className={termClass}>Pick-up point</dt>
              <dd className="mt-1">
                <a href={contact.pickup.mapsUrl} target="_blank" rel={outboundRel} className={linkClass}>
                  <MapPin aria-hidden="true" />
                  {contact.pickup.label}
                </a>
              </dd>
            </div>
            <div>
              <dt className={termClass}>Call or WhatsApp</dt>
              <dd className="mt-1">
                <ul>
                  {contact.phones.map((phone) => (
                    <li key={phone.tel} className="flex flex-wrap items-center gap-x-3">
                      <a href={telLink(phone.tel)} className={linkClass}>
                        <Phone aria-hidden="true" />
                        {phone.display}
                      </a>
                      {/* With a single number the label would only repeat the "Call or WhatsApp" heading. */}
                      {contact.phones.length > 1 && <span className="text-sm text-muted">{phone.label}</span>}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            {contact.replyTime && (
              <div>
                <dt className={termClass}>Replies</dt>
                <dd className="mt-1 text-lg">{contact.replyTime}</dd>
              </div>
            )}
          </dl>
        </aside>

        <Button href={telLink(primaryPhone.tel)} variant="text" className="justify-self-start lg:hidden">
          <Phone aria-hidden="true" />
          Prefer to call? {primaryPhone.display}
        </Button>
      </div>
    </Section>
  );
}
