import { highlights, packages, packagesIntro } from "@/data/site";
import { priceLine } from "@/components/sections/PackageCard";

// A compact, always-visible comparison of the packages: one row per package, with scoped header cells, so the
// facts can be read (and quoted) without opening the carousel or the compare sheet.
export function PackagesTable() {
  const { caption, head } = packagesIntro.table;
  return (
    // Focusable, labelled scroll region: on phones the table scrolls sideways, so keyboard users must be able to reach it.
    <div data-reveal role="region" aria-labelledby="packages-table-caption" tabIndex={0} className="mt-10 overflow-x-auto rounded-card bg-white ring-1 ring-line">
      <table className="w-full min-w-[34rem] text-left text-sm sm:text-base">
        <caption id="packages-table-caption" className="px-4 pt-4 text-left font-display text-lg font-semibold">
          {caption}
        </caption>
        <thead className="text-xs font-semibold tracking-[0.06em] text-muted uppercase">
          <tr>
            {head.map((cell) => (
              <th key={cell} scope="col" className="px-4 py-3">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {packages.map((item) => (
            <tr key={item.id} className="border-t border-line align-top">
              <th scope="row" className="px-4 py-3 font-semibold whitespace-nowrap">
                {item.name}
              </th>
              <td className="px-4 py-3 whitespace-nowrap">{item.durationHours} hours</td>
              <td className="px-4 py-3">{item.highlights.map((id) => highlights[id]).join(", ")}</td>
              <td className="px-4 py-3 whitespace-nowrap">{priceLine(item.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
