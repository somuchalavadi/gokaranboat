import { boat } from "@/data/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { BoatViewer } from "@/components/sections/BoatViewer";

export function Boat() {
  return (
    <Section id="boat" tone="sand">
      <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div data-reveal className="lg:order-2 lg:col-span-5">
          <h2 id="boat-title" className="text-h2">
            {boat.title}
          </h2>
          <p className="mt-4 text-lg text-muted">{boat.copy}</p>
          <Button href={buildWhatsAppLink(boat.message)} className="mt-6">
            Ask about the boat
          </Button>
        </div>
        <div className="lg:order-1 lg:col-span-7">
          <BoatViewer />
        </div>
      </div>
    </Section>
  );
}
