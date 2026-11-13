import Image from "next/image";
import { imageSlots } from "@/lib/images";
export function Media({ slot, className = "", priority = false, fallbackSlot, sizes = "(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 640px" }: { slot: keyof typeof imageSlots; className?: string; priority?: boolean; fallbackSlot?: keyof typeof imageSlots; sizes?: string }) {
  const intended = imageSlots[slot];
  const fallback = fallbackSlot ? imageSlots[fallbackSlot] : undefined;
  const image = intended.src ? intended : fallback?.src ? fallback : intended;
  return image.src ? <Image src={image.src} alt={image.alt} fill priority={priority} loading={priority ? "eager" : "lazy"} sizes={sizes} className={`object-cover ${className}`} /> : <div className={`image-placeholder ${className}`} role="img" aria-label={`${image.alt}. Photo placeholder` }><span>{image.alt}</span></div>;
}
