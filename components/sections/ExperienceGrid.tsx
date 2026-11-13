import { ArrowUpRight } from "lucide-react";
import { experiences } from "@/lib/experiences";
import { whatsappUrl } from "@/lib/site";
import { Media } from "@/components/ui/Media";
export function ExperienceGrid({ limit }: { limit?: number }) { const list = limit ? experiences.slice(0, limit) : experiences; return <div className="experience-grid">{list.map((x, i) => <article className={`experience-card ${i === 0 ? "experience-feature" : ""}`} key={x.slug}><div className="experience-media"><Media slot={x.image as keyof typeof import("@/lib/images").imageSlots} /></div><div className="experience-copy"><p className="eyebrow">{x.group}</p><h3>{x.name}</h3><p>{x.description}</p><a href={whatsappUrl(`Hello, I would like to enquire about ${x.name} in Gokarna.`)} target="_blank" rel="noreferrer" className="text-link">Enquire <ArrowUpRight size={16} /></a></div></article>)}</div>; }
