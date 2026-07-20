import {
  Section,
  SectionCommand,
  SectionPrompt,
  SectionPwd,
  SectionTerminal,
} from "@/components/ui/section";
import { experiences } from "@/lib/data/experience";

export function Experience() {
  return (
    <Section>
      <SectionTerminal>
        <SectionPrompt>
          <SectionPwd />
          <SectionCommand label="show work experience">
            cat experience.log
          </SectionCommand>
        </SectionPrompt>

        <div className="flex flex-col gap-4">
          {experiences.map((exp) => (
            <div
              key={`${exp.company}-${exp.title}`}
              className="flex flex-col gap-2"
            >
              <h2 className="text-foreground">{exp.title}</h2>

              <div className="flex w-full flex-col items-start gap-2 text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                <span className="italic leading-relaxed">{exp.company}</span>

                <span className="whitespace-nowrap text-xs">{exp.period}</span>
              </div>

              <span className="text-muted-foreground leading-relaxed">
                &ndash; {exp.description}
              </span>
            </div>
          ))}
        </div>
      </SectionTerminal>
    </Section>
  );
}
