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
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-1 py-2 text-sm text-mist">
          {items.map((item) => {
            const Icon = icons[item.icon];
            const content = (
              <>
                <Icon aria-hidden="true" className="text-white" />
                {item.label}
              </>
            );
            return (
              <li key={item.id} className="inline-flex min-h-11 items-center gap-2">
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-2 rounded-sm hover:underline hover:underline-offset-4">
                    {content}
                  </a>
                ) : (
                  content
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </div>
  );
}
