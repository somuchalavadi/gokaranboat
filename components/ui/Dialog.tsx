"use client";

import { X } from "lucide-react";
import { useEffect, useRef, type KeyboardEvent, type ReactNode } from "react";

type Variant = "sheet" | "fullscreen";

const variants: Record<Variant, string> = {
  // Bottom sheet on phones, centred card from 768px.
  sheet:
    "mx-0 mt-auto mb-0 max-h-[85dvh] w-full max-w-none overflow-y-auto rounded-t-card bg-white text-ink md:m-auto md:w-[min(640px,calc(100%-48px))] md:rounded-card",
  fullscreen: "m-0 h-dvh max-h-none w-full max-w-none text-white backdrop:bg-transparent",
};

const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, video[controls], [tabindex]:not([tabindex="-1"])';

// Native <dialog> opened with showModal(): the rest of the page is inert, Esc closes it, Tab is
// trapped inside, and focus returns to whatever opened it.
export function Dialog({
  open,
  onClose,
  label,
  variant = "sheet",
  className = "",
  showClose = true,
  children,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  variant?: Variant;
  className?: string;
  showClose?: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const handleClose = () => {
      onCloseRef.current();
      // The close event arrives asynchronously, after the browser's own focus restore; only step in if focus was
      // actually lost, so a late event can't pull focus back after the user has moved on.
      const active = document.activeElement;
      if (!active || active === document.body || dialog.contains(active)) opener.current?.focus({ preventScroll: true });
    };
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, []);

  function trapTab(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab" || !ref.current) return;
    const items = Array.from(ref.current.querySelectorAll<HTMLElement>(focusableSelector)).filter((el) => el.offsetParent !== null);
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onKeyDown={trapTab}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
      className={`${variants[variant]} ${className}`}
    >
      {open && (
        <>
          {showClose && (
            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label="Close"
              className={`absolute top-3 right-3 z-10 inline-flex size-11 items-center justify-center rounded-full ${variant === "fullscreen" ? "glass-dark text-white" : "bg-sand-50 text-ink hover:bg-line"}`}
            >
              <X aria-hidden="true" />
            </button>
          )}
          {children}
        </>
      )}
    </dialog>
  );
}
