"use client";

import { Img } from "@/components/ui/Img";
import Link from "next/link";
import { MapPin, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { business, contact, header, nav } from "@/data/site";
import { outboundRel } from "@/lib/whatsapp";
import { useActiveSection, useAnyInView } from "@/lib/hooks";
import { Button, buttonClass } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";

const sectionIds = nav.map((item) => item.id);

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  // Dark glass while the navbar sits over the hero (the top band of the viewport), light glass after it.
  const overHero = useAnyInView("[data-hero]", "0px 0px -92% 0px", true);
  const active = useActiveSection(sectionIds);
  const current = pathname === "/" ? active : null;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-16 border-x-0! border-t-0! transition-colors duration-200 ${overHero ? "glass-dark text-white" : "glass-light border-b-line! text-ink"}`}
    >
      <div className="mx-auto flex h-full max-w-[1248px] items-center gap-3 px-4 sm:px-6">
        <Link href="/" prefetch={false} className="inline-flex h-11 shrink-0 items-center rounded-md">
          <Img src={business.logo.src} alt={business.logo.alt} width={95} height={40} loading="eager" className="h-10 w-auto" />
        </Link>

        <nav aria-label="Main" className="mx-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`/#${item.id}`}
                  aria-current={current === item.id ? "true" : undefined}
                  className={`inline-flex h-11 min-w-11 items-center justify-center rounded-full px-3 text-[15px] font-medium underline-offset-[10px] transition-colors xl:px-4 ${current === item.id ? "underline decoration-gold decoration-2" : "hover:underline hover:decoration-current/40"}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <Button href="/#book" data-enquire="header" className="ml-auto px-5 lg:ml-0">
          <span className="lg:hidden">{header.bookShort}</span>
          <span className="hidden lg:inline">{header.book}</span>
        </Button>
        {/* Icon-only (44×44) below 1024px, an outline pill with a label from 1024px. */}
        <a
          href={contact.pickup.mapsUrl}
          target="_blank"
          rel={outboundRel}
          aria-label={header.pickupLabel}
          data-ga-source="header"
          className={`${buttonClass("secondary", overHero ? "dark" : "light")} h-11! w-11! px-0! lg:h-12! lg:w-auto! lg:px-5!`}
        >
          <MapPin aria-hidden="true" />
          <span className="hidden lg:inline">{header.pickup}</span>
        </a>
        <button
          type="button"
          onClick={(event) => {
            event.currentTarget.focus();
            setMenuOpen(true);
          }}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="inline-flex size-12 items-center justify-center rounded-full lg:hidden"
        >
          <Menu aria-hidden="true" />
        </button>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
