import { AboutMe } from "@/components/sections/about-me";
import { Connect } from "@/components/sections/connect";
import { Experience } from "@/components/sections/experience";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Intro } from "@/components/sections/intro";
import { TechnicalSkills } from "@/components/sections/technical-skills";
import { Whoami } from "@/components/sections/whoami";

export default function HomePage() {
  return (
    <>
      <Whoami />
      <Intro />
      <AboutMe />
      <TechnicalSkills />
      <Experience />
      <FeaturedProjects />
      <Connect />
    </>
  );
}
