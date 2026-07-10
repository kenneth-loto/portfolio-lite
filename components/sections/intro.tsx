import {
  Section,
  SectionCommand,
  SectionOutput,
  SectionPrompt,
  SectionPwd,
  SectionTerminal,
} from "@/components/ui/section";

export function Intro() {
  return (
    <Section>
      <SectionTerminal>
        <SectionPrompt>
          <SectionPwd />
          <SectionCommand>ls -ap</SectionCommand>
        </SectionPrompt>

        <SectionOutput
          items={[
            "./",
            "../",
            "about-me.txt",
            "connect.json",
            ".env",
            "experience.log",
            "featured-projects/",
          ]}
        />
      </SectionTerminal>
    </Section>
  );
}
