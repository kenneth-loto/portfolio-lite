import type { Experience } from "@/lib/types";

export const experiences: Experience[] = [
  {
    title: "Full-Stack Developer",
    company: "Independent  Projects",
    period: "Sep 2025 — Present",
    descriptions: [
      "Built a Next.js portfolio with TypeScript and Tailwind CSS, featuring MDX-powered blog and project pages, dynamic OG image generation via Edge runtime, RSS feed, and PWA support.",
      "Implemented authentication and data layers across personal projects using Better Auth, Neon, and Drizzle ORM, applying full-stack patterns in isolation outside of team or course constraints.",
    ],
  },
  {
    title: "IT Intern",
    company: "CViSNet Foundation Inc.",
    period: "Jan 2025 — Mar 2025",
    descriptions: [
      "Developed a full-stack CRUD application in Laravel and React with role-based access control via Gates and Policies across multiple user roles.",
      "Collaborated with a 4-person intern team using Git feature branch workflows, owning backend logic while coordinating with frontend responsibilities to deliver a functional system.",
    ],
  },
  {
    title: "Mobile App & Computer Vision Developer",
    company: "Undergraduate Thesis",
    period: "Aug 2024 — Nov 2024",
    descriptions: [
      "Fine-tuned a MobileNetV2 model using TensorFlow/Keras on 1,050 images across 5 health categories, achieving 92% classification accuracy on 150+ real-world samples.",
      "Integrated on-device TFLite inference into a Flutter Android app, eliminating network dependency and displaying confidence scores, health descriptions, and remedy recommendations per classification.",
    ],
  },
];
