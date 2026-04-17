import { Connect } from "@/components/sections/connect";
import { Experience } from "@/components/sections/experience";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Hero } from "@/components/sections/hero";
import { LatestPost } from "@/components/sections/latest-post";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <Experience />
      <LatestPost />
      <Connect />
    </>
  );
}
