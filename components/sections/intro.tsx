import {
  Section,
  SectionCommand,
  SectionOutput,
  SectionPwd,
  SectionTerminal,
} from "@/components/ui/section";

export function Intro() {
  return (
    <Section>
      <SectionTerminal>
        <SectionPwd />
        <SectionCommand>ls -ap</SectionCommand>

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
