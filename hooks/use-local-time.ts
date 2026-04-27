import { useEffect, useRef, useState } from "react";

/** @internal Builds an `Intl.DateTimeFormat` for the given IANA timezone. */
function createFormatter(timezone: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: timezone,
    timeZoneName: "shortOffset",
  });
}

/**
 * Returns the current local time as a formatted string, updated every second.
 *
 * @param timezone - IANA timezone identifier. Defaults to `"Asia/Manila"`.
 * @returns A formatted time string, e.g. `"3:04:05 PM GMT+8"`.
 *
 * @example
 * const time = useLocalTime();             // Manila time
 * const time = useLocalTime("Asia/Tokyo"); // Tokyo time
 */
export function useLocalTime(timezone = "Asia/Manila") {
  const formatter = useRef(createFormatter(timezone));
  const [time, setTime] = useState(() => formatter.current.format(new Date()));

  // Only rebuild formatter when timezone changes, not on mount.
  useEffect(() => {
    formatter.current = createFormatter(timezone);
  }, [timezone]);

  // Interval runs once on mount; always reads the latest formatter via ref
  // so timezone changes take effect without restarting the interval.
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatter.current.format(new Date()));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}
