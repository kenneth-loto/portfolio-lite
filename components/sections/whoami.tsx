import {
  Section,
  SectionCommand,
  SectionPwd,
  SectionTerminal,
} from "@/components/ui/section";
import { aboutMe } from "@/lib/data/about-me";

export function Whoami() {
  return (
    <Section>
      <SectionTerminal>
        <SectionPwd />
        <SectionCommand>whoami</SectionCommand>

        <h1 className="mt-4 font-medium text-sm">
          {aboutMe.name} &ndash; {aboutMe.title}
        </h1>
      </SectionTerminal>
    </Section>
  );
}
