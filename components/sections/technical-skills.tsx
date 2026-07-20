import {
  Section,
  SectionCommand,
  SectionPrompt,
  SectionPwd,
  SectionTerminal,
} from "@/components/ui/section";
import { technicalSkills } from "@/lib/data/technical-skills";
import { camelToConstantCase } from "@/lib/utils";

export function TechnicalSkills() {
  return (
    <Section>
      <SectionTerminal>
        <SectionPrompt>
          <SectionPwd />
          <SectionCommand label="show technical skills">
            cat .env
          </SectionCommand>
        </SectionPrompt>

        <div className="flex flex-col gap-2">
          {Object.entries(technicalSkills).map(([keys, value]) => (
            <div key={keys} className="wrap-break-word leading-relaxed">
              <span className="text-muted-foreground">
                {camelToConstantCase(keys)} =
              </span>
              <span className="text-foreground"> {value.join(", ")}</span>
            </div>
          ))}
        </div>
      </SectionTerminal>
    </Section>
  );
}
