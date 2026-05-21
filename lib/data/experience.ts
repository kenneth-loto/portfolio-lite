import type { Experience } from "@/lib/types";

export const experiences: Experience[] = [
  {
    title: "Full-Stack Developer",
    company: "Independent  Projects",
    period: "Sep 2025 — Present",
    descriptions: [
      "Developed  personal projects exploring modern full-stack patterns, implementing authentication with Better Auth and data layers with Neon and Drizzle ORM.",
      "Built this portfolio in Next.js, TypeScript, and Tailwind with MDX-powered blog and project pages, dynamic OG image generation, RSS feed, and PWA support.",
    ],
  },
  {
    title: "IT Intern",
    company: "CViSNet Foundation Inc.",
    period: "Jan 2025 — Mar 2025",
    descriptions: [
      "Collaborated with 4 interns to build a full-stack CRUD application in Laravel and React, implementing role-based access control via Gates and Policies with Laravel's built-in validation.",
      "Managed feature branch workflows via Git and GitHub, dividing responsibilities between backend logic and UI development",
    ],
  },
  {
    title: "Mobile App & Computer Vision Developer",
    company: "Undergraduate Thesis",
    period: "Aug 2024 — Nov 2024",
    descriptions: [
      "Fine-tuned a MobileNetV2 model in TensorFlow/Keras on 1,050 images to classify dog stool into 5 health categories, achieving 92% accuracy validated on 150+ real-world samples.",
      "Built a Flutter Android app with on-device TFLite inference, displaying confidence scores, health descriptions, and remedy recommendations per classification result.",
    ],
  },
];
