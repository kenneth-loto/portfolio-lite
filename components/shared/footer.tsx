import { ModeToggle } from "@/components/mode-toggle";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex w-full items-center justify-between border-t px-4 py-4 pt-4 md:px-0">
      <span className="text-muted-foreground text-xs">
        &copy; {currentYear} Kenneth Loto. All rights reserved.
      </span>

      <ModeToggle />
    </footer>
  );
}
