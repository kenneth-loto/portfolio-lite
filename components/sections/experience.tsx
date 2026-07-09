import {
  Section,
  SectionCommand,
  SectionPwd,
  SectionTerminal,
} from "@/components/ui/section";
import { experiences } from "@/lib/data/experience";

export function Experience() {
  return (
    <Section>
      <SectionTerminal>
        <SectionPwd />
        <SectionCommand>cat experience.log</SectionCommand>

        <div className="mt-4 flex flex-col gap-4 text-sm">
          {experiences.map((exp) => (
            <div key={exp.period} className="flex flex-col gap-1">
              <div className="flex items-center gap-x-2">
                <span className="text-foreground">|</span>
                <h2 className="font-medium text-foreground text-sm">
                  -- {exp.title}
                </h2>
              </div>

              {/* Company & Range Row */}
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center">
                  <span className="text-foreground">|</span>
                  <span className="pl-4 text-foreground leading-relaxed">
                    {exp.company}
                  </span>
                </div>
                <span className="whitespace-nowrap text-muted-foreground text-xs">
                  {exp.period}
                </span>
              </div>

              <div className="flex items-start">
                <span className="text-foreground">|</span>
                <span className="pl-4 text-muted-foreground leading-relaxed">
                  {exp.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </SectionTerminal>
    </Section>
  );
}
