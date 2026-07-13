"use client";

import {
  Section,
  SectionCommand,
  SectionOutput,
  SectionPrompt,
  SectionPwd,
  SectionTerminal,
} from "@/components/ui/section";
import { featuredProjects } from "@/lib/data/featured-projects";
import { trackClick } from "@/lib/track-click";

export function FeaturedProjects() {
  return (
    <Section className="gap-8">
      <SectionTerminal>
        <SectionPrompt>
          <SectionPwd />
          <SectionCommand>ls -ap featured-projects</SectionCommand>
        </SectionPrompt>

        <SectionOutput
          items={[
            "./",
            "../",
            "dog-stool-classifier.md",
            "solar-shading-estimator-api.md",
          ]}
        />
      </SectionTerminal>

      <SectionTerminal>
        <SectionPrompt>
          <SectionPwd />
          <SectionCommand>
            cat dog-stool-classifier.md solar-shading-estimator-api.md
          </SectionCommand>
        </SectionPrompt>

        <div className="flex flex-col gap-4">
          {featuredProjects.map((project) => (
            <div key={project.title} className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} (opens in new tab)`}
                  onClick={() => trackClick(project.title, project.github)}
                  className="w-fit text-foreground underline underline-offset-2"
                >
                  {project.title}
                </a>

                <div className="flex items-start text-muted-foreground">
                  <span className="shrink-0">&ndash;&nbsp;</span>
                  <span className="leading-relaxed">{project.description}</span>
                </div>
              </div>

              <div className="pl-4">
                <span className="text-muted-foreground">tags: </span>
                <span className="text-foreground lowercase">
                  {project.tags.join(", ")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </SectionTerminal>
    </Section>
  );
}
