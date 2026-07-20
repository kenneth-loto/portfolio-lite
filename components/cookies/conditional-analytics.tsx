"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useConsent } from "./consent-provider";

export function ConditionalAnalytics() {
  const { consent } = useConsent();

  if (consent !== "granted") return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
