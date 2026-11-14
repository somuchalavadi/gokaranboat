"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { faqItems } from "@/lib/faq";

export function Accordion({ limit }: { limit?: number }) { const [open, setOpen] = useState<number | null>(null); return <div className="accordion">{faqItems.slice(0, limit).map((item, index) => { const answerId = `faq-answer-${index}`; return <div className="accordion-item" key={item.question}><button type="button" aria-expanded={open === index} aria-controls={answerId} onClick={() => setOpen(open === index ? null : index)}><span>{item.question}</span><ChevronDown size={18} /></button><p id={answerId} hidden={open !== index}>{item.answer}</p></div>; })}</div>; }
