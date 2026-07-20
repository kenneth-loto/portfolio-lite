import {
  Section,
  SectionCommand,
  SectionPrompt,
  SectionPwd,
  SectionTerminal,
} from "@/components/ui/section";
import { aboutMe } from "@/lib/data/about-me";

export function AboutMe() {
  const profileDetails = [
    { label: "name", value: aboutMe.name },
    { label: "role", value: aboutMe.title },
    { label: "location", value: aboutMe.location },
    { label: "bio", value: aboutMe.bio },
  ];

  return (
    <Section>
      <SectionTerminal>
        <SectionPrompt>
          <SectionPwd />
          <SectionCommand label="show about me">
            cat about-me.txt
          </SectionCommand>
        </SectionPrompt>

        <dl className="flex flex-col gap-4 sm:gap-2">
          {profileDetails.map(({ label, value }) => (
            <div
              key={label}
              className="flex flex-col gap-2 sm:flex-row sm:gap-4"
            >
              <dt className="whitespace-nowrap text-muted-foreground sm:w-20 sm:shrink-0">
                {label}:
              </dt>
              <dd className="text-foreground leading-relaxed">{value}</dd>
            </div>
          ))}
        </dl>
      </SectionTerminal>
    </Section>
  );
}
