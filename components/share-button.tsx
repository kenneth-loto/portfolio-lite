"use client";

import { Button } from "@/components/ui/button";
import { useShare } from "@/hooks/use-share";
import { announce } from "@/lib/announce";

interface ShareButtonProps {
  title: string;
}

export function ShareButton({ title }: ShareButtonProps) {
  const { share, copied } = useShare();

  return (
    <Button
      onClick={() => {
        share(title);
        announce("Link copied to clipboard");
      }}
      variant="link"
      className="h-auto cursor-pointer gap-0.5 p-0"
    >
      {copied ? "Link copied!" : "Share"}
    </Button>
  );
}
