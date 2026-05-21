import { Section, SectionTitle } from "@/components/ui/section";
import { experiences } from "@/lib/data/experience";

export function Experience() {
  return (
    <Section>
      <SectionTitle>Experience</SectionTitle>

      <div className="space-y-8 border-t pt-4">
        {experiences.map((experience) => {
          return (
            <div key={experience.period} className="space-y-2 pl-4">
              <p className="list-item list-disc text-muted-foreground text-xs">
                {experience.period}
              </p>

              <p className="text-sm/read">
                <span className="font-medium text-foreground">
                  {experience.title}
                </span>{" "}
                <span className="text-muted-foreground">—</span>{" "}
                <em className="text-muted-foreground">{experience.company}</em>
              </p>

              <ul className="space-y-2">
                {experience.descriptions.map((description) => (
                  <li
                    key={description}
                    className="flex shrink-0 items-start text-muted-foreground text-sm/read before:mr-2 before:text-muted-foreground before:content-['—']"
                  >
                    <span>{description}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
