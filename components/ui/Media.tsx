import Image from "next/image";
import { imageSlots } from "@/lib/images";
export function Media({ slot, className = "", priority = false, fallbackSlot }: { slot: keyof typeof imageSlots; className?: string; priority?: boolean; fallbackSlot?: keyof typeof imageSlots }) {
  const intended = imageSlots[slot];
  const fallback = fallbackSlot ? imageSlots[fallbackSlot] : undefined;
  const image = intended.src ? intended : fallback?.src ? fallback : intended;
  return image.src ? <Image src={image.src} alt={image.alt} fill priority={priority} loading={priority ? "eager" : "lazy"} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className={`object-cover ${className}`} /> : <div className={`image-placeholder ${className}`} role="img" aria-label={`${image.alt}. Photo placeholder` }><span>{image.alt}</span></div>;
}
