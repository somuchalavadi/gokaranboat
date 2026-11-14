"use client";
import { FormEvent, InvalidEvent, useState } from "react";
import { packages } from "@/lib/packages";
import { whatsappUrl } from "@/lib/site";

export function ContactForm() {
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) { setError("Please check the highlighted fields and try again."); setSent(false); return; }
    const data = new FormData(form);
    const fields = ["Name", "Phone", "Experience", "Date", "Group size", "Message"].map((key, i) => `${key}: ${data.get(["name", "phone", "experience", "date", "group", "message"][i]) || "Not specified"}`);
    const subject = String(data.get("experience") || "a Gokarna experience");
    window.open(whatsappUrl(`Hello, I would like to enquire about ${subject}.\n${fields.join("\n")}`), "_blank", "noopener,noreferrer");
    setError(""); setSent(true);
  }
  const invalid = (e: InvalidEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setError(e.currentTarget.validationMessage || "Please check this field.");
  return <form className="booking-form" onSubmit={submit}><div className="form-heading"><p className="eyebrow">Enquiry form</p><h3>Plan your experience</h3><p>Share a few details and we’ll carry them into your WhatsApp enquiry.</p></div><div className="form-grid"><label>Name <span className="field-required">required</span><input name="name" required aria-required="true" autoComplete="name" placeholder="Your name" onInvalid={invalid} onInput={() => setError("")} /></label><label>Phone <span className="field-required">required</span><input name="phone" required aria-required="true" type="tel" pattern="[+0-9() -]{7,20}" autoComplete="tel" placeholder="+91" onInvalid={invalid} onInput={() => setError("")} /></label><label>Experience <span className="field-required">required</span><select name="experience" required aria-required="true" defaultValue="" onInvalid={invalid} onChange={() => setError("")}><option value="" disabled>Select a package</option>{packages.map((p) => <option key={p.name}>{p.name}</option>)}<option>Customised Events</option></select></label><label>Date <span className="field-optional">optional</span><input name="date" type="date" /></label><label>Group size <span className="field-optional">optional</span><input name="group" type="number" min="1" inputMode="numeric" placeholder="e.g. 2" /></label><label className="form-wide">Message <span className="field-optional">optional</span><textarea name="message" rows={4} placeholder="Tell us what you have in mind" /></label></div>{error && <p className="form-message form-error" role="alert">{error}</p>}{sent && <p className="form-message form-success" role="status">Your enquiry details are ready in WhatsApp.</p>}<button className="button button-light" type="submit">Send on WhatsApp</button><p className="form-note">We’ll open WhatsApp with your details filled in.</p></form>;
}
