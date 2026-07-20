import {
  Section,
  SectionCommand,
  SectionPrompt,
  SectionPwd,
  SectionTerminal,
} from "@/components/ui/section";
import { privacyPolicy } from "@/lib/data/privacy-policy";

export default function PrivacyPolicyPage() {
  return (
    <Section>
      <SectionTerminal>
        <SectionPrompt>
          <SectionPwd />
          <SectionCommand label="show privacy policy">
            cat privacy-policy.md
          </SectionCommand>
        </SectionPrompt>

        <div className="flex flex-col gap-8 text-sm">
          <p className="text-muted-foreground leading-relaxed">
            <em className="text-xs">
              Last Updated: {privacyPolicy.lastUpdated}
            </em>
          </p>

          {privacyPolicy.sections.map((section, index) => (
            <div key={section.title} className="flex flex-col gap-2">
              <h2 className="text-foreground">
                {index + 1}. {section.title}
              </h2>

              {section.content && (
                <p className="text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              )}

              {"items" in section && section.items && (
                <ul className="flex list-none flex-col gap-1 pl-0">
                  {section.items.map((item) => {
                    if (typeof item === "string") {
                      return (
                        <li
                          key={item}
                          className="text-muted-foreground leading-relaxed"
                        >
                          &ndash; {item}
                        </li>
                      );
                    }
                    return (
                      <li
                        key={item.label}
                        className="text-muted-foreground leading-relaxed"
                      >
                        <span className="text-foreground">{item.label}:</span>{" "}
                        {item.value}
                      </li>
                    );
                  })}
                </ul>
              )}

              {"summary" in section && section.summary && (
                <p className="text-muted-foreground leading-relaxed">
                  {section.summary}
                </p>
              )}

              {"email" in section && section.email && (
                <a
                  href={`mailto:${section.email}`}
                  className="w-fit text-foreground underline underline-offset-2"
                >
                  {section.email}
                </a>
              )}
            </div>
          ))}
        </div>
      </SectionTerminal>
    </Section>
  );
}
