import * as Sentry from "@sentry/nextjs";
import posthog from "posthog-js";
import { requireEnv } from "./lib/env";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
});

try {
  posthog.init(requireEnv("NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN"), {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    defaults: "2026-05-30",
    capture_pageview: true,
  });
} catch (error) {
  Sentry.captureException(error);
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
