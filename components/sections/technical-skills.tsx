import {
  Section,
  SectionCommand,
  SectionPwd,
  SectionTerminal,
} from "@/components/ui/section";
import { technicalSkills } from "@/lib/data/technical-skills";

export function TechnicalSkills() {
  return (
    <Section>
      <SectionTerminal>
        <SectionPwd />
        <SectionCommand>cat .env</SectionCommand>

        <div className="mt-4 flex select-none flex-col gap-1 text-sm">
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
