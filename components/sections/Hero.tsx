import { getImageProps } from "next/image";
import { preload } from "react-dom";
import { hero } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroVideo } from "@/components/sections/HeroVideo";

// Phones (< 768px) get the 3:4 crop, which fills the tall hero box at about 100vw. Elsewhere the 4:3 image covers
// its box: about 1.8× the viewport width on portrait tablets, the full width on landscape screens.
const phone = "(max-width: 767px)";
const posterSizes = "(orientation: portrait) 180vw, 100vw";

function srcSet(base: string, widths: readonly number[], format: "avif" | "webp") {
  return widths.map((width) => `${base}-${width}.${format} ${width}w`).join(", ");
}

export function Hero() {
  // The LCP image is served straight from the pre-sized files (see scripts/optimize-assets.mjs), so its bytes
  // are fixed and CDN-cached rather than resized on demand. getImageProps gives next/image's <img> attributes.
  const { props: poster } = getImageProps({
    src: `${hero.poster.base}-${hero.poster.width}.webp`,
    alt: hero.poster.alt,
    fill: true,
    unoptimized: true,
    loading: "eager",
    fetchPriority: "high",
    className: "object-cover object-center md:object-[58%_50%]",
  });
  const { base, widths, portraitBase, portraitWidths } = hero.poster;
  // Start the LCP image from <head>, before the parser reaches it (what next/image's `preload` does).
  // AVIF only: every browser this site supports (see browserslist) decodes it.
  preload(`${portraitBase}-${portraitWidths[0]}.avif`, { as: "image", type: "image/avif", fetchPriority: "high", media: phone, imageSrcSet: srcSet(portraitBase, portraitWidths, "avif"), imageSizes: "100vw" });
  preload(`${base}-${widths[widths.length - 1]}.avif`, { as: "image", type: "image/avif", fetchPriority: "high", media: "(min-width: 768px)", imageSrcSet: srcSet(base, widths, "avif"), imageSizes: posterSizes });

  return (
    <section data-hero aria-labelledby="hero-title" className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden bg-navy-900 text-white">
      {/* Phones show the photo in the top two-thirds so the boat stays clear of the text. */}
      <div className="absolute inset-x-0 top-0 h-[68%] md:h-full">
        <picture>
          <source media={phone} type="image/avif" srcSet={srcSet(portraitBase, portraitWidths, "avif")} sizes="100vw" />
          <source media={phone} type="image/webp" srcSet={srcSet(portraitBase, portraitWidths, "webp")} sizes="100vw" />
          <source type="image/avif" srcSet={srcSet(base, widths, "avif")} sizes={posterSizes} />
          <source type="image/webp" srcSet={srcSet(base, widths, "webp")} sizes={posterSizes} />
          <img {...poster} alt={hero.poster.alt} />
        </picture>
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
            <Button href="/#packages">{hero.ctaTrips}</Button>
            <Button href="/#book" data-enquire="hero" variant="secondary" tone="dark">
              {hero.ctaWhatsApp}
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
