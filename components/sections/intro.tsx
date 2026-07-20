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
          <SectionCommand label="list all files">ls -ap</SectionCommand>
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
