import { Img } from "@/components/ui/Img";
import Link from "next/link";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { business, contact, footer, nav } from "@/data/site";
import { buildWhatsAppLink, telLink } from "@/lib/whatsapp";
import { Container } from "@/components/ui/Container";

const linkClass = "inline-flex min-h-11 min-w-11 items-center gap-2 hover:underline hover:underline-offset-4";
const headingClass = "font-sans text-sm font-semibold tracking-[0.12em] text-mist uppercase";

export function Footer() {
  return (
    <footer id="site-footer" className="bg-navy-900 text-white">
      <Container className="grid gap-10 py-16 md:grid-cols-[1fr_1.2fr_1.3fr]">
        <div>
          <Link href="/" prefetch={false} className="inline-block rounded-md">
            <Img src={business.logo.src} alt={business.logo.alt} width={190} height={80} className="h-20 w-auto" />
          </Link>
          <p className="mt-4 max-w-xs text-mist">{business.tagline}</p>
          {business.socials && (
            <ul className="mt-4 flex flex-wrap gap-x-4">
              {business.socials.map((social) => (
                <li key={social.url}>
                  <a href={social.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-labelledby="footer-explore">
          <h2 id="footer-explore" className={headingClass}>
            Explore
          </h2>
          <ul className="mt-3 grid grid-cols-2 gap-x-6">
            {nav.map((item) => (
              <li key={item.id}>
                <a href={`/#${item.id}`} className={linkClass}>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <Link href="/packages" className={linkClass}>
                Package details
              </Link>
            </li>
            <li>
              <Link href="/adventures" className={linkClass}>
                Things to do
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className={headingClass}>Contact</h2>
          <ul className="mt-3 grid gap-1">
            {contact.phones.map((phone) => (
              <li key={phone.tel}>
                <span className="block text-sm text-mist">{phone.label}</span>
                <span className="flex flex-wrap gap-x-5">
                  <a href={telLink(phone.tel)} className={linkClass}>
                    <Phone aria-hidden="true" />
                    {phone.display}
                  </a>
                  {phone.primary && (
                    <a href={buildWhatsAppLink("Hi, I'd like to ask about a boat trip.")} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      <MessageCircle aria-hidden="true" />
                      WhatsApp
                    </a>
                  )}
                </span>
              </li>
            ))}
            <li>
              <span className="block text-sm text-mist">Pick-up point</span>
              <a href={contact.pickup.mapsUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <MapPin aria-hidden="true" />
                {contact.pickup.label}
              </a>
            </li>
            {contact.email && (
              <li>
                <a href={`mailto:${contact.email}`} className={linkClass}>
                  {contact.email}
                </a>
              </li>
            )}
          </ul>
        </div>
      </Container>
      <div className="border-t border-line-dark">
        <Container className="flex flex-col gap-2 py-6 text-sm text-mist md:flex-row md:items-center md:justify-between">
          <span>{footer.copyright}</span>
          <span>
            {footer.credit.label}{" "}
            <a
              href={footer.credit.url}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-11 items-center px-2 text-sm text-mist hover:underline hover:underline-offset-4"
            >
              {footer.credit.name}
            </a>
          </span>
        </Container>
      </div>
    </footer>
  );
}
