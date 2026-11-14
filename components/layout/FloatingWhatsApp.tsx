import { MessageCircle } from "lucide-react";
import { bookingWhatsapp } from "@/lib/site";
export function FloatingWhatsApp() { return <a className="whatsapp-float glass-dark" href={bookingWhatsapp()} target="_blank" rel="noreferrer" aria-label="Book on WhatsApp"><MessageCircle size={21} /><span>Book on WhatsApp</span></a>; }
