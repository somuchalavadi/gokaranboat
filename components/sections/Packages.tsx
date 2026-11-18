import { packages, packagesIntro } from "@/data/site";
import { Section } from "@/components/ui/Section";
import { PackageCard } from "@/components/sections/PackageCard";
import { PackageCarousel } from "@/components/sections/PackageCarousel";
import { ComparePackages } from "@/components/sections/ComparePackages";
import { PackagesTable } from "@/components/sections/PackagesTable";

const numberWords = ["Zero", "One", "Two", "Three", "Four", "Five", "Six"];

export function packagesSummary() {
  const hours = packages.map((item) => item.durationHours);
  const count = numberWords[packages.length] ?? String(packages.length);
  return `${count} trips from Gokarna Beach, ${Math.min(...hours)} to ${Math.max(...hours)} hours each.`;
}

export function Packages() {
  return (
    <Section id="packages" tone="sand" title={packagesIntro.title} intro={<p>{packagesSummary()}</p>}>
      <PackageCarousel labels={packages.map((item) => item.name)}>
        {packages.map((item) => (
          <PackageCard key={item.id} item={item} />
        ))}
      </PackageCarousel>
      <PackagesTable />
      <ComparePackages detailsHref={packagesIntro.details} />
    </Section>
  );
}
