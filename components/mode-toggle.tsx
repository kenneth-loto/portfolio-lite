"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { ModeToggleSkeleton } from "@/components/skeletons/mode-toggle-skeleton";
import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useMounted();
  const isDark = resolvedTheme === "dark";

  const nextTheme = isDark ? "light" : "dark";

  if (!mounted) return <ModeToggleSkeleton />;

  return (
    <Button
      variant="ghost"
      size="icon"
      className="cursor-pointer"
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${nextTheme} theme`}
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
}
