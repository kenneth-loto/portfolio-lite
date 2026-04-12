"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { ModeToggleSkeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useMounted();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (!mounted) return <ModeToggleSkeleton />;

  return (
    <Button
      variant="ghost"
      size="icon"
      className="cursor-pointer"
      onClick={toggleTheme}
    >
      {resolvedTheme === "dark" ? <Sun /> : <Moon />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
