import { Check } from "lucide-react";
import { highlights, packages } from "@/data/site";

const rows = Array.from(new Set(packages.flatMap((item) => item.highlights)));

// Scrolls horizontally inside its own wrapper; the activity column stays put.
export function CompareTable() {
  return (
    <div role="region" aria-label="Package comparison" tabIndex={0} className="relative overflow-x-auto rounded-card bg-white text-ink ring-1 ring-line">
      <table className="w-full min-w-[560px] border-collapse text-left">
        <caption className="sr-only">What each package includes</caption>
        <thead>
          <tr>
            <th scope="col" className="sticky left-0 z-10 bg-white p-4 text-sm font-semibold text-muted">
              Included
            </th>
            {packages.map((item) => (
              <th key={item.id} scope="col" className="p-4 text-center">
                <span className="block font-display text-lg font-semibold">{item.shortName}</span>
                <span className="block text-sm font-normal text-muted">{item.durationHours} hrs</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row} className="border-t border-line">
              <th scope="row" className="sticky left-0 z-10 bg-white p-4 font-medium">
                {highlights[row]}
              </th>
              {packages.map((item) => (
                <td key={item.id} className="p-4 text-center">
                  {item.highlights.includes(row) ? (
                    <>
                      <Check aria-hidden="true" className="mx-auto text-navy-900" />
                      <span className="sr-only">Included</span>
                    </>
                  ) : (
                    <>
                      <span aria-hidden="true" className="text-muted">
                        —
                      </span>
                      <span className="sr-only">Not included</span>
                    </>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
