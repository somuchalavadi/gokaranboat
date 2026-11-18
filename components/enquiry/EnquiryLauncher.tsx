"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { enquiry, type EnquiryTypeId } from "@/data/site";
import { track } from "@/lib/analytics";

// Opens the enquiry popup from any link marked data-enquire="<source>" (optionally data-enquire-type="<type>").
// Those links point at /#book, so without JavaScript they still reach the booking section. The popup's code is
// loaded on first use (and warmed when a trigger is hovered or focused), so pages ship only this small listener.
const loadDialog = () => import("@/components/enquiry/EnquiryDialog");
const EnquiryDialog = dynamic(() => loadDialog().then((mod) => mod.EnquiryDialog), { ssr: false });

type Request = { id: number; source: string; preset: EnquiryTypeId | null };

const isType = (value: string | undefined): value is EnquiryTypeId => enquiry.types.some((type) => type.id === value);

export function EnquiryLauncher() {
  const [request, setRequest] = useState<Request | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const trigger = (target: EventTarget | null) => (target instanceof Element ? target.closest<HTMLElement>("a[data-enquire]") : null);

    function onClick(event: MouseEvent) {
      const link = trigger(event.target);
      // Let modified clicks (new tab, etc.) behave like normal links.
      if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      link.focus({ preventScroll: true }); // Safari doesn't focus links on click; focus returns here on close.
      const source = link.dataset.enquire ?? "page";
      const preset = link.dataset.enquireType;
      setRequest({ id: Date.now(), source, preset: isType(preset) ? preset : null });
      setOpen(true);
      track("booking_popup_open", { source });
    }
    function warm(event: Event) {
      if (trigger(event.target)) void loadDialog();
    }
    document.addEventListener("click", onClick);
    document.addEventListener("pointerover", warm, { passive: true });
    document.addEventListener("focusin", warm);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("pointerover", warm);
      document.removeEventListener("focusin", warm);
    };
  }, []);

  if (!request) return null;
  // A fresh key per opening resets the form; the last chosen type comes back from sessionStorage.
  return <EnquiryDialog key={request.id} open={open} preset={request.preset} onClose={() => setOpen(false)} />;
}
