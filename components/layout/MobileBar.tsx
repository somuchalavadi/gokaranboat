"use client";

import { MessageCircle, Phone } from "lucide-react";
import { contact } from "@/data/site";
import { useAnyInView } from "@/lib/hooks";
import { buildWhatsAppLink, telLink } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";

const primaryPhone = contact.phones.find((phone) => phone.primary) ?? contact.phones[0];

// Phones only. Appears once the hero has scrolled away and hides while the booking form or footer is on screen.
export function MobileBar() {
  const heroInView = useAnyInView("[data-hero]", "0px", true);
  const hideZoneInView = useAnyInView("#book, #site-footer");
  const show = !heroInView && !hideZoneInView;

  return (
    <div
      role="region"
      aria-label="Quick contact"
      className={`glass-dark fixed inset-x-0 bottom-0 z-40 border-x-0! border-b-0! px-4 pb-[env(safe-area-inset-bottom)] transition-[translate,visibility] duration-250 ease-out md:hidden ${show ? "visible translate-y-0" : "invisible translate-y-full"}`}
    >
      <div className="grid h-14 grid-cols-2 items-center gap-3">
        <Button href={telLink(primaryPhone.tel)} variant="secondary" tone="dark" className="px-3">
          <Phone aria-hidden="true" />
          Call
        </Button>
        <Button href={buildWhatsAppLink("Hi, I'd like to book a boat trip in Gokarna.")} className="px-3">
          <MessageCircle aria-hidden="true" />
          WhatsApp
        </Button>
      </div>
    </div>
  );
}
