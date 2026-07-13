"use client";

import {
  Section,
  SectionCommand,
  SectionPrompt,
  SectionPwd,
  SectionTerminal,
} from "@/components/ui/section";
import { useSectionView } from "@/hooks/use-section-view";
import { connect } from "@/lib/data/connect";
import { trackClick } from "@/lib/track-click";

export function Connect() {
  const ref = useSectionView("reached_connect_section");

  const contactInfo = {
    title: connect.title,
    desc: connect.desc,
    links: [
      { label: "email", url: `mailto:${connect.email}` },
      { label: "linkedin", url: connect.linkedin },
      { label: "github", url: connect.github },
    ],
  };

  return (
    <Section ref={ref}>
      <SectionTerminal>
        <SectionPrompt>
          <SectionPwd />
          <SectionCommand>cat contact.json</SectionCommand>
        </SectionPrompt>

        <div className="flex flex-col gap-4 text-sm">
          <div className="flex flex-col gap-2">
            <h2 className="text-foreground">{contactInfo.title}</h2>

            <div className="flex items-start text-muted-foreground leading-relaxed">
              <span className="shrink-0">&ndash;&nbsp;</span>
              <span>{contactInfo.desc}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-4">
            <span className="text-muted-foreground">links:</span>
            {contactInfo.links.map((link) => {
              const isMailto = link.url.startsWith("mailto:");

              return (
                <a
                  key={link.label}
                  href={link.url}
                  target={isMailto ? undefined : "_blank"}
                  rel={isMailto ? undefined : "noopener noreferrer"}
                  aria-label={
                    isMailto ? undefined : `${link.label} (opens in new tab)`
                  }
                  onClick={() => trackClick(link.label, link.url)}
                  className="w-fit text-foreground underline underline-offset-2"
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      </SectionTerminal>
    </Section>
  );
}
