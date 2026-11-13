import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/site";
export function FloatingWhatsApp() { return <a className="whatsapp-float glass-dark" href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="Enquire on WhatsApp"><MessageCircle size={21} /><span>WhatsApp</span></a>; }
