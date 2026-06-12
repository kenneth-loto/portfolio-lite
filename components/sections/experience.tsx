import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section, SectionTitle } from "@/components/ui/section";
import { experiences } from "@/lib/data/experience";

export function Experience() {
  return (
    <Section>
      <SectionTitle>Experience</SectionTitle>

      <Accordion multiple={false} className="flex flex-col gap-8 border-t pt-4">
        {experiences.map((experience) => (
          <AccordionItem
            key={experience.period}
            value={experience.period}
            className="flex flex-col gap-2 border-none pl-4"
          >
            <ul className="list-disc" role="presentation">
              <li className="text-muted-foreground text-xs">
                {experience.period}
              </li>
            </ul>
            <div className="flex flex-wrap items-center gap-2">
              <div className="w-fit">
                <AccordionTrigger className="cursor-pointer py-0 hover:no-underline [&_svg]:hidden [&_svg]:group-aria-expanded/accordion-trigger:hidden">
                  <span className="font-medium text-foreground text-sm underline underline-offset-2">
                    {experience.title}
                  </span>
                </AccordionTrigger>
              </div>
              <span className="text-muted-foreground text-sm">
                {" — "}
                <em>{experience.company}</em>
              </span>
            </div>
            <AccordionContent>
              <ul className="flex flex-col gap-2 pt-2">
                {experience.descriptions.map((description) => (
                  <li
                    key={description}
                    className="flex shrink-0 items-start text-muted-foreground text-sm/relaxed before:mr-2 before:text-muted-foreground before:content-['▸']"
                  >
                    <span>{description}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}
