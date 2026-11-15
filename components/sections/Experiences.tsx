import { experiencesIntro } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { ExperienceTabs } from "@/components/sections/ExperienceTabs";

export function Experiences() {
  return (
    <Section
      id="experiences"
      tone="navy"
      title={experiencesIntro.title}
      intro={
        <>
          <p>{experiencesIntro.intro}</p>
          <p className="mt-1 text-sm">{experiencesIntro.stockNote}</p>
        </>
      }
      action={
        <Button href={experiencesIntro.details} variant="text" tone="dark">
          View all activities & places
        </Button>
      }
    >
      <ExperienceTabs />
    </Section>
  );
}
