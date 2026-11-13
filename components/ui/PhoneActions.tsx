"use client";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { phoneHref } from "@/lib/site";

export function PhoneActions({ phone, label = "Call" }: { phone: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() { await navigator.clipboard?.writeText(phone); setCopied(true); window.setTimeout(() => setCopied(false), 1600); }
  return <div className="phone-action"><a href={phoneHref(phone)}>{label}: {phone}</a><button type="button" className="copy-number" onClick={copy} aria-label={`Copy ${phone}`}>{copied ? <Check size={14} /> : <Copy size={14} />}{copied ? "Copied" : "Copy number"}</button></div>;
}
