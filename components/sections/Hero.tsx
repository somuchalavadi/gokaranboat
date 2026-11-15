import Image from "next/image";
import { hero } from "@/data/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroVideo } from "@/components/sections/HeroVideo";

export function Hero() {
  return (
    <section data-hero aria-labelledby="hero-title" className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden bg-navy-900 text-white">
      {/* Phones show the photo in the top two-thirds so the boat stays clear of the text. */}
      <div className="absolute inset-x-0 top-0 h-[68%] md:h-full">
        <Image
          src={hero.poster.src}
          alt={hero.poster.alt}
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="object-cover object-[58%_50%]"
        />
        <HeroVideo video={hero.video} />
      </div>

      {/* The gradient sits behind the text block only, so the sea above stays clear. */}
      <div className="relative bg-linear-to-t from-navy-900 from-35% via-navy-900/80 via-70% to-transparent pt-28 pb-12 md:pb-16 lg:pt-40">
        <Container>
          <p className="text-sm font-semibold tracking-[0.14em] text-mist uppercase">{hero.eyebrow}</p>
          <h1 id="hero-title" className="mt-3 max-w-[13ch] text-h1">
            {hero.title}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-mist">{hero.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/#packages">See trips</Button>
            <Button href={buildWhatsAppLink(hero.message)} variant="secondary" tone="dark">
              WhatsApp us
            </Button>
          </div>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Trip basics">
            {hero.chips.map((chip) => (
              <li key={chip} className="glass-dark inline-flex h-10 items-center rounded-full px-4 text-sm">
                {chip}
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
