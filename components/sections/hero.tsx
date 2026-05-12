import { Section } from "@/components/ui/section";
import { aboutMe } from "@/lib/data/about-me";

export function Hero() {
  return (
    <Section className="mt-4">
      <hgroup>
        <h1 className="font-semibold text-base">{aboutMe.name}</h1>
        <p className="text-muted-foreground text-sm">{aboutMe.title}</p>
      </hgroup>

      <p className="text-muted-foreground text-sm/read">{aboutMe.bio}</p>
    </Section>
  );
}
