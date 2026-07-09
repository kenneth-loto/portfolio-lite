import { Fragment } from "react";
import {
  Section,
  SectionCommand,
  SectionPwd,
  SectionTerminal,
} from "@/components/ui/section";
import { aboutMe } from "@/lib/data/about-me";

export function AboutMe() {
  const profileDetails = [
    { label: "role", value: aboutMe.title },
    { label: "location", value: aboutMe.location },
    { label: "bio", value: aboutMe.bio },
  ];

  return (
    <Section>
      <SectionTerminal>
        <SectionPwd />
        <SectionCommand>cat about-me.txt</SectionCommand>

        <div className="mt-4 flex flex-col gap-2">
          <h2 className="font-medium text-sm">
            &#64;
            {aboutMe.name}
          </h2>

          <dl className="grid grid-cols-[auto_1fr] gap-1 gap-x-4 text-sm">
            {profileDetails.map(({ label, value }) => (
              <Fragment key={label}>
                <dt className="whitespace-nowrap text-foreground">{label}:</dt>
                <dd className="text-muted-foreground leading-relaxed">
                  {value}
                </dd>
              </Fragment>
            ))}
          </dl>
        </div>
      </SectionTerminal>
    </Section>
  );
}
