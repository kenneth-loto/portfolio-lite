import { Section } from "@/components/ui/section";
import { aboutMe } from "@/lib/data/about-me";
import { parseBold } from "@/lib/utils";

export function Hero() {
  return (
    <Section className="space-y-8">
      <hgroup>
        <h1 className="font-bold text-base">{aboutMe.name}</h1>
        <p className="text-muted-foreground text-sm">{aboutMe.role}</p>
      </hgroup>
      <p className="text-muted-foreground text-sm/relaxed">
        {parseBold(aboutMe.bio).map((part, index) => {
          const key = `${index}-${part.text}`;

          return part.bold ? (
            <span key={key} className="font-medium text-foreground">
              {part.text}
            </span>
          ) : (
            <span key={key}>{part.text}</span>
          );
        })}
      </p>
    </Section>
  );
}
