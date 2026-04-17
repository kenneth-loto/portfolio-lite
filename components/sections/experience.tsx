import { Section, SectionTitle } from "@/components/ui/section";
import { workExperiences } from "@/lib/data/work-experience";

export function Experience() {
  return (
    <Section>
      <SectionTitle>Experience</SectionTitle>

      <div className="space-y-8 border-t pt-4">
        {workExperiences.map((experience, index) => {
          const key = `${index}-${experience.period}`;

          return (
            <div key={key} className="space-y-2 pl-4">
              <ul className="list-disc">
                <li className="text-muted-foreground text-xs">
                  {experience.period}
                </li>
              </ul>

              <hgroup>
                <h3 className="font-medium text-foreground text-read">
                  {experience.title}
                </h3>
                <p className="text-muted-foreground text-read">
                  {experience.company}
                </p>
              </hgroup>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
