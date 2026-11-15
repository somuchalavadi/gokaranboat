// Reproducible asset pipeline. Originals live in assets-src/ (never deployed); outputs are written to public/.
// Re-run any time an original changes:  npm run optimize-assets
// Needs the sharp and ffmpeg-static devDependencies (set FFMPEG_PATH to use a system ffmpeg instead).
import sharp from "sharp";
import ffmpegStatic from "ffmpeg-static";
import { execFile } from "node:child_process";
import { mkdir, readdir, rename, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

const exec = promisify(execFile);
const ffmpeg = process.env.FFMPEG_PATH || ffmpegStatic;
const KB = 1024;
const MB = 1024 * KB;
const report = [];

// ---- What gets built --------------------------------------------------------------------------

// Hero poster: the owner-approved image (the boat on blue water). The calm-water photo stays as a gallery photo
// and the Open Graph card.
const HERO_POSTER_SOURCE = "assets-src/images/rudra-boat-showcase.jpeg";
// Horizontal centre of the subject in the hero poster (0–1), used for the 3:4 phone crop.
const HERO_FOCUS_X = 0.55;

// The approved hero is a still image, so no background loop is built. Set to true (and fill hero.video in
// data/site.ts) to bring it back: a 9 s loop cut from clip 01, the only landscape clip.
const HERO_VIDEO = false;
const HERO_SOURCE = "assets-src/videos/rudra-boat-01.mp4";
const HERO_LOOP = { start: 3.3, duration: 9, crossfade: 1 }; // seconds; ends on the boat at sea, fades back to the cove

// Gallery clips. Clip 02 is a byte-identical copy of clip 01 and is skipped. While the hero has no video,
// clip 01 isn't a duplicate of anything, so it's in the gallery.
const GALLERY_CLIPS = [
  { id: "01", posterAt: 11.5 },
  { id: "03", posterAt: 13 },
  { id: "04", posterAt: 10 },
  { id: "05", posterAt: 1.5 },
];

// Crop anchors for portrait stock photos where the automatic (saliency) crop misses the subject.
const STOCK_CROP = { "river-trips.webp": "north" };

const LIMITS = {
  heroPoster: 120 * KB,
  heroPhone: 50 * KB, // the phone crop is the LCP image on phones, so it gets a tighter budget than the 120 KB cap
  photo: 250 * KB,
  stock: 400 * KB, // masters for next/image (never sent as-is), so quality matters more than bytes
  og: 200 * KB,
  videoPoster: 90 * KB,
  heroHd: 3 * MB,
  heroSd: 1.5 * MB,
  clip: 3 * MB,
};

// ---- Helpers ----------------------------------------------------------------------------------

function record(file, bytes, limit, note = "") {
  report.push({ file, bytes, limit, ok: bytes <= limit, note });
}

async function bytes(file) {
  return (await stat(file)).size;
}

const startQuality = { avif: 62, webp: 82, jpeg: 84 };
// WebP may go lower than AVIF: it is only the fallback for browsers without AVIF (none in browserslist).
const minQuality = { avif: 30, webp: 30, jpeg: 50 };

// Encodes at falling quality until the file fits its byte budget. `extract` crops before resizing.
async function imageWithin(input, output, { extract, resize, format, limit }) {
  let buffer;
  let quality = startQuality[format];
  for (; quality >= minQuality[format]; quality -= 4) {
    let pipeline = sharp(input).rotate();
    if (extract) pipeline = sharp(await pipeline.extract(extract).toBuffer());
    pipeline = pipeline.resize({ withoutEnlargement: true, ...resize });
    if (format === "avif") pipeline = pipeline.avif({ quality, effort: 6 });
    else if (format === "webp") pipeline = pipeline.webp({ quality, effort: 6 });
    else pipeline = pipeline.jpeg({ quality, mozjpeg: true, progressive: true });
    buffer = await pipeline.toBuffer();
    if (buffer.length <= limit) break;
  }
  await withRetry(() => writeFile(output, buffer));
  const meta = await sharp(buffer).metadata();
  record(output, buffer.length, limit, `${meta.width}×${meta.height} q${Math.max(quality, minQuality[format])}`);
}

async function probe(file) {
  // `ffmpeg -i` with no output exits non-zero but prints the stream info we need on stderr.
  const { stderr } = await exec(ffmpeg, ["-hide_banner", "-i", file]).catch((error) => error);
  const [, h, m, s] = stderr.match(/Duration: (\d+):(\d+):([\d.]+)/);
  const [, width, height] = stderr.match(/Video: .*?, (\d{2,5})x(\d{2,5})/);
  const rotated = /rotation of -?90/.test(stderr);
  return { duration: +h * 3600 + +m * 60 + +s, width: rotated ? +height : +width, height: rotated ? +width : +height };
}

// Retries a file operation that Windows can briefly refuse while another process (e.g. a virus scan of a
// just-written video) holds the file.
async function withRetry(operation) {
  for (let tries = 1; ; tries++) {
    try {
      return await operation();
    } catch (error) {
      if (tries >= 10) throw error;
      await new Promise((resolve) => setTimeout(resolve, 500 * tries));
    }
  }
}

// Tries settings from best to smallest until the output fits its byte budget. Each attempt writes its own
// temporary file, so an attempt never has to overwrite a file that's still locked from the previous one.
async function videoWithin(output, limit, attempts, argsFor, label = (attempt) => `crf ${attempt}`) {
  const extension = path.extname(output);
  const written = [];
  let chosen;
  for (const [index, attempt] of attempts.entries()) {
    const temp = `${output.slice(0, -extension.length)}.attempt-${index}${extension}`;
    written.push(temp);
    await withRetry(() => exec(ffmpeg, ["-hide_banner", "-loglevel", "error", "-y", ...argsFor(attempt), temp], { maxBuffer: 64 * MB }));
    chosen = { attempt, temp, size: await bytes(temp) };
    if (chosen.size <= limit) break;
  }
  await withRetry(() => rename(chosen.temp, output));
  for (const file of written) if (file !== chosen.temp) await withRetry(() => rm(file, { force: true }));
  record(output, chosen.size, limit, label(chosen.attempt));
}

const h264 = (crf) => ["-c:v", "libx264", "-preset", "slow", "-crf", String(crf), "-profile:v", "high", "-pix_fmt", "yuv420p", "-movflags", "+faststart"];
const vp9 = (crf) => ["-c:v", "libvpx-vp9", "-crf", String(crf), "-b:v", "0", "-row-mt", "1", "-deadline", "good", "-cpu-used", "2"];

// ---- Images -----------------------------------------------------------------------------------

async function images() {
  await mkdir("public/images/hero", { recursive: true });
  const { width: sourceWidth, height: sourceHeight } = await sharp(HERO_POSTER_SOURCE).metadata();
  const landscapeWidths = [828, 1600].filter((width) => width <= sourceWidth);
  for (const width of landscapeWidths) {
    for (const format of ["avif", "webp"]) {
      await imageWithin(HERO_POSTER_SOURCE, `public/images/hero/hero-blue-${width}.${format}`, { resize: { width }, format, limit: LIMITS.heroPoster });
    }
  }
  // Phones show the hero in a tall box, so they get a 3:4 crop around the subject instead of a landscape image
  // rendered at twice the screen width. Never upscaled: if the crop is narrower than 828px it's written at its
  // own width. Keep hero.poster.portraitWidths in data/site.ts in step with what this prints.
  const cropWidth = Math.round(sourceHeight * 0.75);
  const left = Math.min(Math.max(Math.round(sourceWidth * HERO_FOCUS_X - cropWidth / 2), 0), sourceWidth - cropWidth);
  const portraitWidths = [828, 1242].filter((width) => width <= cropWidth);
  if (!portraitWidths.length) portraitWidths.push(cropWidth);
  for (const width of portraitWidths) {
    for (const format of ["avif", "webp"]) {
      await imageWithin(HERO_POSTER_SOURCE, `public/images/hero/hero-blue-portrait-${width}.${format}`, {
        extract: { left, top: 0, width: cropWidth, height: sourceHeight },
        resize: { width },
        format,
        limit: format === "avif" ? LIMITS.heroPhone : LIMITS.heroPoster,
      });
    }
  }
  console.log(`Hero poster widths: landscape ${landscapeWidths.join(", ")}; portrait ${portraitWidths.join(", ")}`);
  // The calm-water photo keeps its original URL; it's a gallery photo now.
  await imageWithin("assets-src/images/rudra-hero.jpeg", "public/images/rudra-hero.jpeg", { resize: { width: 1600, height: 1600, fit: "inside" }, format: "jpeg", limit: LIMITS.photo });
  for (const name of ["rudra-coast", "rudra-boat-showcase"]) {
    await imageWithin(`assets-src/images/${name}.jpeg`, `public/images/${name}.jpeg`, { resize: { width: 1600, height: 1600, fit: "inside" }, format: "jpeg", limit: LIMITS.photo });
  }
  // Open Graph / Twitter card: a true 1200×630 crop of the hero photo.
  await imageWithin("assets-src/images/rudra-hero.jpeg", "public/images/og.jpg", { resize: { width: 1200, height: 630, fit: "cover", position: "centre" }, format: "jpeg", limit: LIMITS.og });

  // Stock photos fill landscape cards and tiles. next/image resizes by width only, so a portrait original would
  // be downloaded at full height and mostly cropped away; crop anything taller than 4:3 to 4:3 around its subject.
  await mkdir("public/images/stock", { recursive: true });
  for (const file of await readdir("assets-src/images/stock")) {
    if (!file.endsWith(".webp")) continue;
    const input = `assets-src/images/stock/${file}`;
    const { width, height } = await sharp(input).metadata();
    const position = STOCK_CROP[file] ?? sharp.strategy.attention;
    const resize = height / width > 0.75 ? { width: 1600, height: 1200, fit: "cover", position } : { width: 1600, fit: "inside" };
    await imageWithin(input, `public/images/stock/${file}`, { resize, format: "webp", limit: LIMITS.stock });
  }
}

// ---- Videos -----------------------------------------------------------------------------------

async function heroLoop() {
  const source = await probe(HERO_SOURCE);
  // Never upscale: the HD loop is 1080p only when the source is at least 1080p tall.
  const hd = Math.min(1080, source.height);
  const sd = hd >= 1080 ? 720 : 540;
  const { start, duration, crossfade } = HERO_LOOP;
  for (const [height, limit] of [
    [hd, LIMITS.heroHd],
    [sd, LIMITS.heroSd],
  ]) {
    // Take duration + crossfade seconds, play from `crossfade` onwards, and dissolve the last second into the
    // first one, so the final frame matches the first and the loop has no visible seam.
    const filter =
      `[0:v]trim=start=${start}:duration=${duration + crossfade},setpts=PTS-STARTPTS,scale=-2:${height}:flags=lanczos,fps=30,format=yuv420p,split[a][b];` +
      `[a]trim=start=${crossfade},setpts=PTS-STARTPTS[main];[b]trim=duration=${crossfade},setpts=PTS-STARTPTS[head];` +
      `[main][head]xfade=transition=fade:duration=${crossfade}:offset=${duration - crossfade},format=yuv420p[v]`;
    const input = ["-i", HERO_SOURCE, "-filter_complex", filter, "-map", "[v]", "-an"];
    await videoWithin(`public/videos/hero-loop-${height}.mp4`, limit, [23, 25, 27, 29, 31, 33], (crf) => [...input, ...h264(crf)]);
    await videoWithin(`public/videos/hero-loop-${height}.webm`, limit, [32, 35, 38, 41, 44], (crf) => [...input, ...vp9(crf)]);
  }
  return { hd, sd };
}

async function galleryClips() {
  await mkdir("public/videos/posters", { recursive: true });
  const clips = [];
  for (const clip of GALLERY_CLIPS) {
    const source = `assets-src/videos/rudra-boat-${clip.id}.mp4`;
    const info = await probe(source);
    // Native size first; a clip that still won't fit by CRF 29 drops to a 960px long side rather than
    // being crushed by a very high CRF (busy footage such as glittering water barely compresses).
    const longSide = Math.max(info.width, info.height);
    const attempts = [
      ...[25, 27, 29].map((crf) => ({ crf, long: longSide })),
      ...[27, 29, 31, 33].map((crf) => ({ crf, long: Math.min(960, longSide) })),
    ];
    await videoWithin(
      `public/videos/rudra-boat-${clip.id}.mp4`,
      LIMITS.clip,
      attempts,
      ({ crf, long }) => [
        "-i",
        source,
        ...(long < longSide ? ["-vf", info.height >= info.width ? `scale=-2:${long}` : `scale=${long}:-2`] : []),
        ...h264(crf),
        "-c:a",
        "aac",
        "-b:a",
        "64k",
      ],
      ({ crf, long }) => `${long}px long side, crf ${crf}`,
    );
    const { stdout: frame } = await exec(ffmpeg, ["-hide_banner", "-loglevel", "error", "-ss", String(clip.posterAt), "-i", source, "-frames:v", "1", "-f", "image2pipe", "-vcodec", "png", "-"], {
      encoding: "buffer",
      maxBuffer: 64 * MB,
    });
    await imageWithin(frame, `public/videos/posters/rudra-boat-${clip.id}.webp`, { resize: { width: 720, height: 1280, fit: "inside" }, format: "webp", limit: LIMITS.videoPoster });
    clips.push({ id: clip.id, width: info.width, height: info.height, seconds: +info.duration.toFixed(1) });
  }
  return clips;
}

// ---- Run --------------------------------------------------------------------------------------
// `--only=images` or `--only=videos` rebuilds one group (videos take a few minutes).

const only = process.argv.find((arg) => arg.startsWith("--only="))?.split("=")[1];

if (!only || only === "images") {
  // Clear previous outputs so a removed source never leaves a stale file behind.
  await rm("public/images/hero", { recursive: true, force: true });
  await images();
}
if (!only || only === "videos") {
  await rm("public/videos", { recursive: true, force: true });
  await mkdir("public/videos", { recursive: true });
  if (HERO_VIDEO) {
    const hero = await heroLoop();
    console.log(`\nHero loop: ${hero.hd}p and ${hero.sd}p from ${HERO_SOURCE}`);
  }
  const clips = await galleryClips();
  console.log("Gallery clips:", clips.map((clip) => `${clip.id} ${clip.width}×${clip.height} ${clip.seconds}s`).join(", "));
}
console.log("\nfile".padEnd(48), "size".padStart(10), "limit".padStart(10), " ");
for (const row of report) {
  console.log(row.file.padEnd(48), `${(row.bytes / KB).toFixed(0)} KB`.padStart(10), `${(row.limit / KB).toFixed(0)} KB`.padStart(10), row.ok ? " ok" : " OVER", row.note);
}
if (report.some((row) => !row.ok)) process.exitCode = 1;
