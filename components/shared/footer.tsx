import { ModeToggle } from "@/components/mode-toggle";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex w-full items-center justify-between gap-4 border-t py-4">
      <span className="text-muted-foreground text-xs">
        &copy; {currentYear} Kenneth Loto. All rights reserved.
      </span>

      <ModeToggle />
    </footer>
  );
}
