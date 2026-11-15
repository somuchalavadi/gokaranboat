"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { VideoSource } from "@/data/site";

type Props = { video: { hd: VideoSource[]; sd: VideoSource[] } | null };

// Desktop-only background loop. Phones, reduced motion and Save-Data keep the poster image.
// The video is only added after the page has loaded, so it never competes with the poster (the LCP image).
export function HeroVideo({ video }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [sources, setSources] = useState<VideoSource[] | null>(null);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!video) return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const allowed =
      window.matchMedia("(min-width: 768px)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches && !connection?.saveData;
    if (!allowed) return;
    let timer = 0;
    const start = () => {
      timer = window.setTimeout(() => setSources(window.innerWidth >= 1280 ? video.hd : video.sd), 300);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      window.clearTimeout(timer);
    };
  }, [video]);

  if (!sources) return null;

  function toggle() {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      void el.play();
      setPaused(false);
    } else {
      el.pause();
      setPaused(true);
    }
  }

  return (
    <>
      <video
        ref={ref}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        onPlaying={() => setPlaying(true)}
        className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${playing ? "opacity-100" : "opacity-0"}`}
      >
        {sources.map((source) => (
          <source key={source.src} src={source.src} type={source.type} />
        ))}
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={paused ? "Play background video" : "Pause background video"}
        className="glass-dark absolute right-6 bottom-6 z-20 inline-flex size-11 items-center justify-center rounded-full text-white"
      >
        {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
      </button>
    </>
  );
}
