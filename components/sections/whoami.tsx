import {
  Section,
  SectionCommand,
  SectionPrompt,
  SectionPwd,
  SectionTerminal,
} from "@/components/ui/section";
import { aboutMe } from "@/lib/data/about-me";

export function Whoami() {
  return (
    <Section>
      <SectionTerminal>
        <SectionPrompt>
          <SectionPwd />
          <SectionCommand label="who am I command">whoami</SectionCommand>
        </SectionPrompt>

        <h1>
          {aboutMe.name} &ndash; {aboutMe.title}
        </h1>
      </SectionTerminal>
    </Section>
  );
}
