import { FileQuestionMark, MoveLeftIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FileQuestionMark />
        </EmptyMedia>
        <EmptyTitle className="text-base">404 - Page Not Found</EmptyTitle>
        <EmptyDescription>
          The page you're looking for doesn't exist or has been moved.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "link" }), "h-auto p-0")}
        >
          <MoveLeftIcon aria-hidden="true" />
          Back to home
        </Link>
      </EmptyContent>
    </Empty>
  );
}
