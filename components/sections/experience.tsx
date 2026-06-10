import { Section, SectionTitle } from "@/components/ui/section";
import { experiences } from "@/lib/data/experience";

export function Experience() {
  return (
    <Section>
      <SectionTitle>Experience</SectionTitle>

      <div className="flex flex-col gap-8 border-t pt-4">
        {experiences.map((experience) => {
          return (
            <div key={experience.period} className="flex flex-col gap-2 pl-4">
              <ul className="list-disc" role="presentation">
                <li className="text-muted-foreground text-xs">
                  {experience.period}
                </li>
              </ul>

              <p className="font-medium text-sm">
                <span className="font-medium text-foreground">
                  {experience.title}
                </span>{" "}
                <span className="text-muted-foreground">—</span>{" "}
                <em className="text-muted-foreground">{experience.company}</em>
              </p>

              <ul className="flex flex-col gap-2">
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
