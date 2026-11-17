# Original media

Full-size originals live here and are **not** deployed. `npm run optimize-assets` (`scripts/optimize-assets.mjs`) builds everything the site serves into `public/`. Use `--only=images` or `--only=videos` to rebuild one group.

| Output in `public/` | Source | Budget |
| --- | --- | --- |
| `images/hero/hero-blue-{828,1600}.{avif,webp}` (hero poster, landscape) | `images/rudra-boat-showcase.jpeg` | ≤ 120 KB each |
| `images/hero/hero-blue-portrait-676.{avif,webp}` (3:4 phone crop, LCP image on phones) | `images/rudra-boat-showcase.jpeg` | ≤ 120 KB each |
| `images/rudra-hero.jpeg` (gallery), `images/og.jpg` (1200×630 Open Graph / Twitter card) | `images/rudra-hero.jpeg` | ≤ 150 KB / ≤ 200 KB |
| `images/rudra-coast.jpeg` (≤ 1600px) | same name here | ≤ 150 KB |
| `images/stock/*.webp` (portrait originals cropped to 4:3) | `images/stock/` | ≤ 150 KB, WebP q≈72 |
| `brand/rudra_gokarna_main_logo_transparent.png` (380×160, 2× the footer logo), `brand/rudra-gokarn-adventures-emblem-512.png` (JSON-LD logo) | `brand/` | ≤ 60 KB each (palette PNG) |
| `app/icon.png` (192×192 favicon source) | `brand/icon.png` | ≤ 20 KB |
| `videos/rudra-boat-{01,03,04,05}.mp4` (gallery clips) | same names here | ≤ 3 MB each |
| `videos/posters/rudra-boat-{01,03,04,05}.webp` | a frame of each clip | ≤ 90 KB each |

Notes:

- **Hero:** the approved hero is a still image, so no background video is built (`HERO_VIDEO = false`). Set it to `true` and fill `hero.video` in `data/site.ts` to get a 9 s silent loop of clip 01 (720p and 540p, WebM + MP4). All supplied clips are 720p, and the script never upscales.
- The hero source is 1600×901, so the phone crop is written at its native 676px width rather than upscaled. A larger original would produce 828w and 1242w crops automatically; update `hero.poster.portraitWidths` to match what the script prints.
- The 1600w WebP needs quality 30 to fit 120 KB because the image is very detailed. It's only a fallback: every supported browser gets the AVIF.
- Clip 02 is a byte-identical copy of clip 01, so it isn't used. Clip 05 is encoded at 540×960 to stay under 3 MB.
- Windows sometimes briefly locks a just-written file (antivirus), so writes are retried.
- Photos that can't reach their budget at good quality (q≥56 for WebP, q≥68 for JPEG) are scaled down in steps instead of being crushed, so a few masters are narrower than 1600px.
- Unused originals (old logo variant, favicon without the R, the stock `place-sightseeing.webp`) stay here but aren't published. Image credits and the stock-photo verification notes live in `CREDITS.md` and `images/stock/`.
