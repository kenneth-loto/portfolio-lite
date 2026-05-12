"use client";

import { Button } from "@/components/ui/button";
import { useShare } from "@/hooks/use-share";

interface ShareButtonProps {
  title: string;
}

export function ShareButton({ title }: ShareButtonProps) {
  const { share, copied } = useShare();

  return (
    <Button
      onClick={() => share(title)}
      variant="link"
      className="h-auto gap-0.5 p-0"
    >
      {copied ? "Link copied!" : "Share"}
    </Button>
  );
}
