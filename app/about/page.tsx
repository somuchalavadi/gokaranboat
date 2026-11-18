import type { Metadata } from "next";
import Link from "next/link";
import { about, aboutPage, contact, footer } from "@/data/site";
import { guideHubSlug, guidePath } from "@/data/guides";
import { pageMetadata } from "@/lib/seo";
import { Img } from "@/components/ui/Img";
import { KeyFacts } from "@/components/seo/Blocks";
import { InfoPageView } from "@/components/seo/InfoPage";

export const metadata: Metadata = pageMetadata({ title: aboutPage.title, description: aboutPage.description, path: aboutPage.path });

const linkClass = "inline-flex min-h-11 items-center font-semibold underline decoration-ink/40 underline-offset-4 hover:decoration-ink";

export default function AboutPage() {
  return (
    <InfoPageView
      page={aboutPage}
      type="AboutPage"
      aside={
        <>
          <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-navy-700">
            <Img src={about.image.src} alt={about.image.alt} fill sizes="(max-width: 1023px) 100vw, 480px" loading="eager" fetchPriority="high" className="object-cover" />
          </div>
          <KeyFacts
            id="about-key-facts"
            title="Contact details"
            facts={[
              { label: "Call or WhatsApp", value: contact.phones[0].display },
              { label: "Pick-up point", value: contact.pickup.label, href: contact.pickup.mapsUrl },
              { label: "Email", value: contact.email },
            ]}
          />
        </>
      }
    >
      <nav aria-label="More about our trips and policies">
        <ul className="flex flex-wrap gap-x-6">
          <li>
            <Link href="/packages" className={linkClass}>
              Boat trip packages
            </Link>
          </li>
          <li>
            <Link href="/adventures" className={linkClass}>
              Things to do on the water
            </Link>
          </li>
          <li>
            <Link href={guidePath(guideHubSlug)} className={linkClass}>
              Gokarna boat trip guide
            </Link>
          </li>
          {footer.legal
            .filter((link) => link.href !== aboutPage.path)
            .map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </InfoPageView>
  );
}
