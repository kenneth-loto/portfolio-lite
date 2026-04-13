import { Section, SectionTitle } from "@/components/ui/section";
import { workExperiences } from "@/lib/data/work-experience";
import { Badge } from "../ui/badge";

export function Experience() {
  return (
    <Section className="space-y-8">
      <SectionTitle>Experience</SectionTitle>
      <ul className="space-y-4">
        {workExperiences.map((experience, index) => {
          const key = `${index}-${experience.period}`;

          return (
            <li key={key} className="flex items-start justify-between gap-4">
              <hgroup>
                <h3 className="font-medium text-sm">{experience.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {experience.company}
                </p>
              </hgroup>
              <div className="shrink-0 text-right">
                <p className="text-muted-foreground text-xs">
                  {experience.period}
                </p>
                {experience.current && <Badge variant="ghost">Current</Badge>}
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
