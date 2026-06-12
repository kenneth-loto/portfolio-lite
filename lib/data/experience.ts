import type { Experience } from "@/lib/types";

export const experiences: Experience[] = [
  {
    title: "Full-Stack Developer",
    company: "Independent  Projects",
    period: "Sep 2025 — Present",
    descriptions: [
      "Built a production-ready Next.js portfolio using TypeScript and Tailwind CSS, with MDX-powered content, dynamic OG image generation via Edge runtime, RSS feed, and PWA support, demonstrating end-to-end ownership from development to Vercel deployment.",
      "Implemented authentication and data layers across personal projects using Better Auth, Neon, and Drizzle ORM, expanding full-stack expertise beyond internship and academic constraints into modern production tooling.",
    ],
  },
  {
    title: "IT Intern",
    company: "CViSNet Foundation Inc.",
    period: "Jan 2025 — Mar 2025",
    descriptions: [
      "Built a full-stack Event Management System in Laravel and React with MySQL, implementing role based access control using Gates and Policies to support distinct permission sets across Admin and Faculty/Student Organization roles.",
      "Coordinated with a 4-person intern team using Git feature branch workflows, managing pull requests and resolving merge conflicts to deliver a functional system within the internship period.",
    ],
  },
  {
    title: "Mobile App & Computer Vision Developer",
    company: "Undergraduate Thesis",
    period: "Aug 2024 — Nov 2024",
    descriptions: [
      "Fine-tuned a MobileNetV2 model using TensorFlow/Keras on 1,050 images across 5 health categories, achieving 92% classification accuracy on 150+ real-world samples.",
      "Integrated on-device TFLite inference into a Flutter Android app, enabling fully offline classification with confidence scores and remedy recommendations to support dog owners when veterinary access is unavailable.",
    ],
  },
];
