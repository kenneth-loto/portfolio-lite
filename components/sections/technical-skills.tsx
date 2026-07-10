import {
  Section,
  SectionCommand,
  SectionPrompt,
  SectionPwd,
  SectionTerminal,
} from "@/components/ui/section";
import { technicalSkills } from "@/lib/data/technical-skills";

export function TechnicalSkills() {
  return (
    <Section>
      <SectionTerminal>
        <SectionPrompt>
          <SectionPwd />
          <SectionCommand>cat .env</SectionCommand>
        </SectionPrompt>

        <div className="flex select-none flex-col gap-2 text-sm">
          {Object.entries(technicalSkills).map(([keys, value]) => (
            <div key={keys} className="wrap-break-word leading-relaxed">
              <span className="font-medium text-foreground uppercase">
                {keys} =
              </span>
              <span className="text-muted-foreground"> {value.join(", ")}</span>
            </div>
          ))}
        </div>
      </SectionTerminal>
    </Section>
  );
}
