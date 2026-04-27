"use client";

import { LocalTimeSkeleton } from "@/components/skeletons/local-time-skeleton";
import { useLocalTime } from "@/hooks/use-local-time";
import { useMounted } from "@/hooks/use-mounted";

export function LocalTime() {
  const mounted = useMounted();
  const time = useLocalTime();

  if (!mounted) return <LocalTimeSkeleton />;

  return <time dateTime={new Date().toISOString()}>{time}</time>;
}
