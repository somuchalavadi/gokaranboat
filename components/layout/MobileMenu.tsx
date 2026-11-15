"use client";

import { Phone } from "lucide-react";
import { contact, nav } from "@/data/site";
import { telLink } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";

const primaryPhone = contact.phones.find((phone) => phone.primary) ?? contact.phones[0];

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div id="mobile-menu">
      <Dialog open={open} onClose={onClose} label="Menu" variant="fullscreen" className="glass-dark">
        <div className="flex h-full flex-col px-6 pt-20 pb-[calc(env(safe-area-inset-bottom)+32px)]">
          <nav aria-label="Mobile">
            <ul className="flex flex-col gap-1">
              {nav.map((item) => (
                <li key={item.id}>
                  <a href={`/#${item.id}`} onClick={onClose} className="flex h-12 items-center font-display text-h3">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto grid gap-3">
            <Button href="/#book" onClick={onClose}>
              Book now
            </Button>
            <Button href={telLink(primaryPhone.tel)} variant="secondary" tone="dark">
              <Phone aria-hidden="true" />
              Call {primaryPhone.display}
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
