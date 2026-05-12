"use client";

import { TerminalIcon } from "lucide-react";
import Link from "next/link";
import { useScrollTop } from "@/hooks/use-scroll-to-top";

export function LogoLink() {
  const handleScrollTop = useScrollTop();

  return (
    <Link href="/" onClick={handleScrollTop} aria-label="Home">
      <TerminalIcon className="size-4" aria-hidden="true" />
    </Link>
  );
}
