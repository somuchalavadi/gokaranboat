"use client";
import { FormEvent, useState } from "react";
import { packages } from "@/lib/packages";
import { whatsappUrl } from "@/lib/site";
export function ContactForm() {
 const [error, setError] = useState("");
 function submit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); const form = e.currentTarget; if (!form.reportValidity()) return; const data = new FormData(form); const fields = ["Name", "Phone", "Experience", "Date", "Group size", "Message"].map((key, i) => `${key}: ${data.get(["name", "phone", "experience", "date", "group", "message"][i]) || "Not specified"}`); window.open(whatsappUrl(`Hello, I would like to enquire about a Gokarna experience.\n${fields.join("\n")}`), "_blank", "noopener,noreferrer"); setError(""); }
 return <form className="booking-form" onSubmit={submit}><h3>Plan your experience</h3><div className="form-grid"><label>Name<input name="name" required autoComplete="name" /></label><label>Phone<input name="phone" required type="tel" pattern="[+0-9() -]{7,20}" autoComplete="tel" /></label><label>Experience<select name="experience" required defaultValue=""><option value="" disabled>Select an experience</option>{packages.map(p => <option key={p.name}>{p.name}</option>)}<option>Customised Events</option><option>Other experience</option></select></label><label>Date<input name="date" type="date" /></label><label>Group size<input name="group" type="number" min="1" /></label><label className="form-wide">Message<textarea name="message" rows={3} /></label></div>{error && <p role="alert">{error}</p>}<button className="button button-light" type="submit">Send enquiry on WhatsApp</button><p className="form-note">Submitting opens WhatsApp with your enquiry details.</p></form>;
}
