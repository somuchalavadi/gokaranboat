import { getImageProps, type ImageProps } from "next/image";

// next/image's <Image> is a client component, so every instance hydrates. For images that need nothing on the
// client, getImageProps gives the same optimised srcset, sizes and lazy loading on a plain <img> that doesn't.
export function Img(props: ImageProps & { alt: string }) {
  const { props: img } = getImageProps(props);
  // eslint-disable-next-line @next/next/no-img-element -- this is next/image output (getImageProps)
  return <img {...img} alt={props.alt} />;
}
