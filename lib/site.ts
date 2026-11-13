export const site = {
  name: "Rudra Gokarna Adventures",
  description: "Explore the Gokarna coastline through boat adventures and water experiences.",
  phones: ["+91 95915 56869", "+91 70223 44675"],
  primaryWhatsApp: "919591556869",
  pickup: "Gokarna Beach, Gokarna, Karnataka",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "",
  socials: { instagram: "", facebook: "" },
};
export function whatsappUrl(message = "Hello, I would like to enquire about a Gokarna boat experience.") {
  return `https://wa.me/${site.primaryWhatsApp}?text=${encodeURIComponent(message)}`;
}
export function whatsappEnquiry(subject: string) {
  return whatsappUrl(`Hello, I would like to enquire about ${subject}.`);
}
export function phoneHref(phone: string) { return `tel:${phone.replace(/[\s()-]/g, "")}`; }
