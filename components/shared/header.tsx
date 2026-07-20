import Link from "next/link";
import { cn } from "@/lib/utils";

const dots = [
  { color: "text-terminal-identity", label: "identity" },
  { color: "text-terminal-env", label: "env" },
  { color: "text-terminal-path", label: "path" },
  { color: "text-terminal-git", label: "git" },
];

export function Header() {
  return (
    <Link
      href="/"
      aria-label="Home"
      className="mt-12 flex w-fit items-center gap-0.5 px-6"
    >
      {dots.map((dot) => (
        <span
          key={dot.label}
          className={cn(dot.color, "text-2xl")}
          aria-hidden="true"
        >
          &bull;
        </span>
      ))}
    </Link>
  );
}
