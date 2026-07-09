import type { FeaturedProject } from "@/types/featured-projects";

export const featuredProjects: FeaturedProject[] = [
  {
    title: "Dog Stool Classifier",
    description:
      "A Flutter Android app using an on-device deep learning model to classify dog stool images into 5 health categories, with instant remedy suggestions, no internet required.",
    tags: ["flutter", "tensorflow", "machine learning"],
    github: "https://github.com/kenneth-loto/dog-stool-classifier",
  },
  {
    title: "Solar Shading Estimator API",
    description:
      "A backend API that estimates realistic solar panel output by combining NASA POWER irradiance data with PVWatts baseline estimates and a shading model for nearby obstructions.",
    tags: ["nestjs", "typescript", "rest-api"],
    github: "https://github.com/kenneth-loto/solar-shading-estimator-api",
  },
];
