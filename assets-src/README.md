# Original media

Full-size originals live here and are **not** deployed. `npm run optimize-assets` (`scripts/optimize-assets.mjs`) builds everything the site serves into `public/`:

| Output in `public/` | Source | Budget |
| --- | --- | --- |
| `images/hero/hero-{828,1600}.{avif,webp}` (hero poster, LCP image) | `images/rudra-hero.jpeg` | ≤ 120 KB each |
| `images/og.jpg` (1200×630 Open Graph / Twitter card) | `images/rudra-hero.jpeg` | ≤ 200 KB |
| `images/rudra-coast.jpeg`, `images/rudra-boat-showcase.jpeg` (≤ 1600px) | same names here | ≤ 250 KB each |
| `videos/hero-loop-{720,540}.{webm,mp4}` (9 s silent loop, desktop only) | `videos/rudra-boat-01.mp4` | 720p ≤ 3 MB, 540p ≤ 1.5 MB |
| `videos/rudra-boat-{03,04,05}.mp4` (gallery clips) | same names here | ≤ 3 MB each |
| `videos/posters/rudra-boat-{03,04,05}.webp` | a frame of each clip | ≤ 90 KB each |

Notes:

- All supplied clips are 720p (clips 03–05 are portrait), so the HD hero loop is 720p. The script never upscales. Give it a 1080p (or larger) landscape clip and it will produce 1080p and 720p loops automatically.
- Clip 02 is a byte-identical copy of clip 01, so it isn't used.
- To use a different hero clip or loop segment, change `HERO_SOURCE` / `HERO_LOOP` at the top of the script and the matching paths in `data/site.ts`.
- Stock and boat-render images in `public/images/stock` and `public/images/boat` are already small and are served through `next/image`.
