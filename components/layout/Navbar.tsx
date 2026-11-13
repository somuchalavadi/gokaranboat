"use client";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { whatsappUrl } from "@/lib/site";
const links = [["Home", "/"], ["Adventures", "/adventures"], ["Packages", "/packages"], ["Gallery", "/gallery"], ["About", "/about"], ["Contact", "/contact"]];
export function Navbar() {
  const [open, setOpen] = useState(false); const [scrolled, setScrolled] = useState(false); const path = usePathname(); const toggleRef = useRef<HTMLButtonElement>(null); const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 24); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  useEffect(() => { if (!open) return; menuRef.current?.querySelector<HTMLElement>("a")?.focus(); function key(e: KeyboardEvent) { if (e.key === "Escape") { setOpen(false); toggleRef.current?.focus(); } else if (e.key === "Tab") { const items = menuRef.current?.querySelectorAll<HTMLElement>("a"); if (!items?.length) return; if (e.shiftKey && document.activeElement === items[0]) { e.preventDefault(); items[items.length - 1].focus(); } else if (!e.shiftKey && document.activeElement === items[items.length - 1]) { e.preventDefault(); items[0].focus(); } } } window.addEventListener("keydown", key); return () => window.removeEventListener("keydown", key); }, [open]);
  return <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}><Link href="/" className="brand brand-logo" aria-label="Rudra Gokarna Adventures" onClick={() => setOpen(false)}><Image src="/brand/rudra_gokarna_main_logo_transparent.png" alt="Rudra Gokarna Adventures" width={1164} height={491} priority className="brand-logo-image" /></Link><nav className="desktop-nav" aria-label="Main navigation">{links.map(([label, href]) => <Link key={href} href={href} aria-current={path === href ? "page" : undefined}>{label}</Link>)}</nav><a className="button button-light nav-book" href={whatsappUrl("Hello, I would like to book a Gokarna boat experience.")} target="_blank" rel="noreferrer">Book Now</a><button ref={toggleRef} className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>{open && <div id="mobile-navigation" ref={menuRef} className="mobile-menu glass-dark"><nav aria-label="Mobile navigation">{links.map(([label, href]) => <Link key={href} href={href} aria-current={path === href ? "page" : undefined}>{label}</Link>)}<a className="button button-light" href={whatsappUrl()} target="_blank" rel="noreferrer">Book Your Experience</a></nav></div>}</header>;
}
