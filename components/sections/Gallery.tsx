import { Img } from "@/components/ui/Img";
import { Play } from "lucide-react";
import { gallery, galleryIntro } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { GalleryLightbox } from "@/components/sections/GalleryLightbox";

const gridCount = 6;

// Server-rendered grid; the buttons carry `data-gallery-open` and GalleryLightbox handles the clicks.
export function Gallery() {
  return (
    <Section
      id="gallery"
      tone="navy"
      title={galleryIntro.title}
      intro={<p>{galleryIntro.intro}</p>}
      action={
        <Button variant="secondary" tone="dark" aria-haspopup="dialog" data-gallery-open={0}>
          View all
        </Button>
      }
    >
      <ul data-reveal className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
        {gallery.slice(0, gridCount).map((item, index) => (
          <li key={item.id}>
            <button
              type="button"
              data-gallery-open={index}
              aria-haspopup="dialog"
              className="group relative block aspect-square w-full overflow-hidden rounded-card bg-navy-700 transition-transform duration-250 ease-out hover:-translate-y-1 lg:aspect-video"
            >
              {/* The button's name is this prefix plus the image's alt text. */}
              <span className="sr-only">{item.kind === "video" ? "Play video: " : "View photo: "}</span>
              <Img
                src={item.kind === "video" ? item.poster : item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 1023px) 50vw, 400px"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
              {item.kind === "video" && (
                <span className="glass-dark absolute inset-0 m-auto inline-flex size-14 items-center justify-center rounded-full text-white">
                  <Play aria-hidden="true" className="ml-0.5" />
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
      <GalleryLightbox />
    </Section>
  );
}
