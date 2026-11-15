"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { business, nav } from "@/data/site";
import { useActiveSection, useAnyInView } from "@/lib/hooks";
import { Button } from "@/components/ui/Button";
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
        <Link href="/" className="shrink-0 rounded-md">
          <Image src={business.logo.src} alt={business.logo.alt} width={95} height={40} loading="eager" className="h-10 w-auto" />
        </Link>

        <nav aria-label="Main" className="mx-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/#${item.id}`}
                  aria-current={current === item.id ? "true" : undefined}
                  className={`inline-flex h-11 items-center rounded-full px-3 text-[15px] font-medium underline-offset-[10px] transition-colors xl:px-4 ${current === item.id ? "underline decoration-gold decoration-2" : "hover:underline hover:decoration-current/40"}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Button href="/#book" className="ml-auto px-5 lg:ml-0">
          <span className="lg:hidden">Book</span>
          <span className="hidden lg:inline">Book now</span>
        </Button>
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
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
