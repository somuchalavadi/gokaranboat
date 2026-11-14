import { ArrowUpRight, Compass } from "lucide-react";
import { experiences, type Experience } from "@/lib/experiences";
import { whatsappEnquiry } from "@/lib/site";
import { Media } from "@/components/ui/Media";
export function ExperienceGrid({ limit, items, featureFirst = true }: { limit?: number; items?: readonly Experience[]; featureFirst?: boolean }) {
  const list = (items ?? experiences).slice(0, limit);
  return <div className="experience-grid">{list.map((x, i) => <article className={`experience-card ${x.image ? "has-image" : "text-only"} ${featureFirst && i === 0 ? "experience-feature" : ""}`} key={x.slug}>
    {x.image ? <div className="experience-media"><Media slot={x.image} /></div> : <div className="experience-neutral" aria-hidden="true"><Compass size={28} /></div>}
    <div className="experience-copy"><h3>{x.name}</h3><p>{x.description}</p><a href={whatsappEnquiry(x.name)} target="_blank" rel="noreferrer" className="text-link">Enquire <ArrowUpRight size={16} /></a></div>
  </article>)}</div>;
}
