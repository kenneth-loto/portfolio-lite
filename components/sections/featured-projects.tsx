import {
  Section,
  SectionCommand,
  SectionOutput,
  SectionPwd,
  SectionTerminal,
} from "@/components/ui/section";
import { featuredProjects } from "@/lib/data/featured-projects";

export function FeaturedProjects() {
  return (
    <Section>
      <SectionTerminal>
        <SectionPwd />
        <SectionCommand>ls -ap featured-projects</SectionCommand>

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
        <SectionPwd />
        <SectionCommand>
          cat dog-stool-classifier.md solar-shading-estimator-api.md
        </SectionCommand>

        <div className="mt-4 flex select-none flex-col gap-4 text-sm">
          {featuredProjects.map((project) => (
            <div key={project.title} className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.title} (opens in new tab)`}
                  className="w-fit font-medium text-foreground transition-colors duration-200 ease-in-out hover:underline hover:underline-offset-2"
                >
                  {project.title}
                </a>

                <div className="flex items-start text-muted-foreground">
                  <span className="shrink-0">&ndash;&nbsp;</span>
                  <span className="leading-relaxed">{project.description}</span>
                </div>
              </div>

              <div className="pl-4">
                <span className="text-foreground">tags: </span>
                <span className="text-muted-foreground lowercase">
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
