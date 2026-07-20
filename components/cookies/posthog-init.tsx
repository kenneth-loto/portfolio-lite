"use client";

import posthog from "posthog-js";
import { useEffect } from "react";
import { clientEnv } from "@/env";
import { useConsent } from "./consent-provider";

export function PosthogInit() {
  const { consent } = useConsent();

  useEffect(() => {
    if (consent !== "granted") return;

    try {
      posthog.init(clientEnv.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN, {
        api_host: "/ingest",
        ui_host: clientEnv.NEXT_PUBLIC_POSTHOG_HOST,
        defaults: "2026-05-30",
        capture_pageview: true,
      });
    } catch {}
  }, [consent]);

  return null;
}
