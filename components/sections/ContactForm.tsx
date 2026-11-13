"use client";
import { FormEvent, useState } from "react";
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
    window.open(whatsappUrl(`Hello, I would like to enquire about a Gokarna experience.\n${fields.join("\n")}`), "_blank", "noopener,noreferrer");
    setError(""); setSent(true);
  }
  return <form className="booking-form" onSubmit={submit}><div className="form-heading"><p className="eyebrow">Enquiry form</p><h3>Plan your experience</h3><p>Share a few details and we’ll carry them into your WhatsApp enquiry.</p></div><div className="form-grid"><label>Name<input name="name" required autoComplete="name" placeholder="Your name" /></label><label>Phone<input name="phone" required type="tel" pattern="[+0-9() -]{7,20}" autoComplete="tel" placeholder="+91" /></label><label>Experience<select name="experience" required defaultValue=""><option value="" disabled>Select an experience</option>{packages.map((p) => <option key={p.name}>{p.name}</option>)}<option>Customised Events</option><option>Other experience</option></select></label><label>Date<input name="date" type="date" /></label><label>Group size<input name="group" type="number" min="1" inputMode="numeric" placeholder="e.g. 2" /></label><label className="form-wide">Message<textarea name="message" rows={4} placeholder="Tell us what you have in mind" /></label></div>{error && <p className="form-message form-error" role="alert">{error}</p>}{sent && <p className="form-message form-success" role="status">Your enquiry details are ready in WhatsApp.</p>}<button className="button button-light" type="submit">Send enquiry on WhatsApp</button><p className="form-note">All form fields are included in the WhatsApp message.</p></form>;
}
