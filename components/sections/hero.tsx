import { Section } from "@/components/ui/section";
import { author } from "@/lib/data/author";

export function Hero() {
  return (
    <Section className="mt-4">
      <hgroup>
        <h1 className="font-semibold text-base">{author.name}</h1>
        <p className="text-muted-foreground text-sm">{author.role}</p>
      </hgroup>

      <p className="text-muted-foreground text-sm/read">{author.bio}</p>
    </Section>
  );
}
