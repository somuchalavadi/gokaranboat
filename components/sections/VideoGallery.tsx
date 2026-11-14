const videos = [
  "/videos/rudra-boat-01.mp4",
  "/videos/rudra-boat-02.mp4",
  "/videos/rudra-boat-03.mp4",
  "/videos/rudra-boat-04.mp4",
  "/videos/rudra-boat-05.mp4",
] as const;

export function VideoGallery() {
  return <section className="video-section"><div className="container"><div className="section-heading"><p className="eyebrow">Boat in motion</p><h2>See The Rudra Gokarna on the water</h2><p className="section-copy">Owner-supplied videos from boat experiences around Gokarna.</p></div><div className="video-grid">{videos.map((src, index) => <figure className={`video-card ${index === 0 ? "video-card-feature" : ""}`} key={src}><video controls playsInline preload="metadata" poster="/images/rudra-hero.jpeg" aria-label={`The Rudra Gokarna on the water, video ${index + 1}`} src={src} /><figcaption>Boat on the Gokarna coast · {String(index + 1).padStart(2, "0")}</figcaption></figure>)}</div></div></section>;
}
