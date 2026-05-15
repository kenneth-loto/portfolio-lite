import type { Experience } from "@/lib/types";

export const experiences: Experience[] = [
  {
    title: "Full Stack Developer",
    company: "Personal Projects",
    period: "Sep 2025 — Present",
    description:
      "Built personal projects exploring modern full-stack patterns — implementing auth with Better Auth, data layers with Neon and Drizzle ORM. Developed this portfolio in Next.js, TypeScript, and Tailwind with statically generated blog and project pages.",
  },
  {
    title: "IT Intern",
    company: "CViSNet Foundation Inc.",
    period: "Jan 2025 — Mar 2025",
    description:
      "Built CRUD systems using Laravel — starting with Blade templating then migrating to the React starter kit. Collaborated with three interns via Git and GitHub across feature branches, splitting tasks between UI and backend logic.",
  },
  {
    title: "Mobile App & Computer Vision Developer",
    company: "Undergraduate Thesis",
    period: "Aug 2024 — Nov 2024",
    description:
      "Built a Flutter Android app that classifies dog stool images into 5 health categories using an on-device TFLite model fine-tuned from MobileNetV2 — trained on 1,050 images, achieving 92% accuracy validated on 150+ real-world samples.",
  },
];
