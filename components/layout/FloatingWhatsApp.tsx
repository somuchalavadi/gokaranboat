import { MessageCircle } from "lucide-react";
import { whatsappEnquiry } from "@/lib/site";
export function FloatingWhatsApp() { return <a className="whatsapp-float glass-dark" href={whatsappEnquiry("a Gokarna boat experience")} target="_blank" rel="noreferrer" aria-label="Enquire on WhatsApp"><MessageCircle size={21} /><span>Enquire on WhatsApp</span></a>; }
