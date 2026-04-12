import { Skeleton } from "@/components/ui/skeleton";

export function ModeToggleSkeleton() {
  return (
    <div className="flex size-9 items-center justify-center">
      <Skeleton className="size-4" />
    </div>
  );
}
