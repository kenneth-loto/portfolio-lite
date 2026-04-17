import { Section } from "@/components/ui/section";
import { author } from "@/lib/data/author";
import { parseBold } from "@/lib/utils";

export function Hero() {
  return (
    <Section className="mt-4">
      <hgroup>
        <h1 className="font-semibold text-lg tracking-tight">{author.name}</h1>
        <p className="text-muted-foreground text-read">{author.role}</p>
      </hgroup>

      <p className="text-muted-foreground text-read/read">
        {parseBold(author.bio).map((part, index) => {
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
