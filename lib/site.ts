export const site = {
  name: "Rudra Gokarna Adventures",
  description: "Explore the Gokarna coastline through boat adventures and water experiences.",
  phones: ["+91 95915 56869", "+91 70223 44675"],
  primaryWhatsApp: "919591556869",
  pickup: "Gokarna Beach, Gokarna, Karnataka",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "",
  socials: { instagram: "", facebook: "" },
};
// TODO(owner): add only confirmed safety and life-jacket information.
// TODO(owner): add confirmed passenger capacity, cancellation policy, season/monsoon note, bioluminescence timing note and business email.
export function whatsappUrl(message = "Hello, I would like to enquire about a Gokarna boat experience.") {
  return `https://wa.me/${site.primaryWhatsApp}?text=${encodeURIComponent(message)}`;
}
export function whatsappEnquiry(subject: string) {
  return whatsappUrl(`Hello, I would like to enquire about ${subject}.`);
}
export function packageWhatsapp(name: string, duration: string, guests: number) {
  return whatsappUrl(`Hi Rudra Gokarna Adventures, I would like to enquire about the ${name} package (${duration}) for ${guests} guest(s). Please share the price and available dates.`);
}
export function phoneHref(phone: string) { return `tel:${phone.replace(/[\s()-]/g, "")}`; }
