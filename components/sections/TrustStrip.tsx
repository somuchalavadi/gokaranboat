import { LifeBuoy, MapPin, Star, Users } from "lucide-react";
import { trust } from "@/data/site";
import { Container } from "@/components/ui/Container";

const icons = { pin: MapPin, star: Star, safety: LifeBuoy, crew: Users };

// Shows only the items the owner has confirmed (non-null labels).
export function TrustStrip() {
  const items = trust.filter((item) => item.label !== null);
  if (!items.length) return null;
  return (
    <div className="border-t border-line-dark bg-navy-900 text-white">
      <Container>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-4 text-sm text-mist">
          {items.map((item) => {
            const Icon = icons[item.icon];
            return (
              <li key={item.id} className="inline-flex items-center gap-2">
                <Icon aria-hidden="true" className="text-white" />
                {item.label}
              </li>
            );
          })}
        </ul>
      </Container>
    </div>
  );
}
