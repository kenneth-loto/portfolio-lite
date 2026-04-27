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

              <p className="text-sm/read">
                <span className="font-medium text-foreground">
                  {experience.title}
                </span>{" "}
                <span className="text-muted-foreground">—</span>{" "}
                <em className="text-muted-foreground">{experience.company}</em>
              </p>

              <p className="text-muted-foreground text-sm/read">
                {experience.description}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
