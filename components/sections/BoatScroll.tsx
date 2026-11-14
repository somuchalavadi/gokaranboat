"use client";

import Image from "next/image";
import { motion, MotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { whatsappEnquiry } from "@/lib/site";

const angles = [
  { src: "/images/boat/boatfrontquarter.webp", alt: "Front-quarter design render of The Rudra Gokarna boat", title: "A closer look at the boat", body: "A front-quarter view of The Rudra Gokarna, shown in the supplied design artwork.", side: "right" },
  { src: "/images/boat/boatside.webp", alt: "Side design render of The Rudra Gokarna boat", title: "Easy to spot from shore", body: "The side profile shows the boat name and navy, white and gold exterior artwork.", side: "left" },
  { src: "/images/boat/boatrearside.webp", alt: "Rear-side design render of The Rudra Gokarna boat", title: "Around the rear", body: "A rear-side view of the supplied boat design, ready for your next enquiry.", side: "right" },
  { src: "/images/boat/boatfront.webp", alt: "Front design render of The Rudra Gokarna boat", title: "From the bow", body: "The front view completes the supplied set of design angles for The Rudra Gokarna.", side: "left" },
] as const;

function BoatAngle({ angle, index, progress }: { angle: (typeof angles)[number]; index: number; progress: MotionValue<number> }) {
  const start = index / angles.length;
  const end = (index + 1) / angles.length;
  const opacity = useTransform(progress, [index === 0 ? 0 : Math.max(0, start - .08), index === 0 ? .001 : start, end - .08, end], [index === 0 ? 1 : 0, 1, 1, 0]);
  const shift = useTransform(progress, [start, end], [index % 2 ? 5 : -5, index % 2 ? -5 : 5]);
  const rotate = useTransform(progress, [start, end], [index % 2 ? 20 : -20, index % 2 ? -20 : 20]);
  const transform = useTransform([shift, rotate], ([x, r]) => `translate3d(${x}vw,0,0) rotateY(${r}deg)`);
  return <motion.div className={`boat-scroll-image boat-angle-${index}`} style={{ opacity, transform }}><Image src={angle.src} alt={angle.alt} fill sizes="(max-width: 860px) 92vw, 58vw" /></motion.div>;
}

function BoatCard({ angle, index, progress }: { angle: (typeof angles)[number]; index: number; progress: MotionValue<number> }) {
  const start = index / angles.length;
  const end = (index + 1) / angles.length;
  const opacity = useTransform(progress, [Math.max(0, start - .08), start, end - .08, end], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, end], [18, -18]);
  return <motion.article className={`boat-scroll-card ${angle.side}`} style={{ opacity, y }}><h3>{angle.title}</h3><p>{angle.body}</p><a className="button button-dark" href={whatsappEnquiry("The Rudra Gokarna boat")} target="_blank" rel="noreferrer">Enquire <ArrowUpRight size={15} /></a></motion.article>;
}

export function BoatScroll() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: .25 });
  return <section ref={ref} className="boat-scroll" aria-label="The Rudra Gokarna boat from four angles"><div className="boat-scroll-stage"><div className="boat-scroll-label"><h2>The Rudra Gokarna</h2><small>Design render</small></div><div className="boat-scroll-visual">{angles.map((angle, index) => <BoatAngle key={angle.src} angle={angle} index={index} progress={progress} />)}</div>{angles.map((angle, index) => <BoatCard key={angle.title} angle={angle} index={index} progress={progress} />)}</div></section>;
}
