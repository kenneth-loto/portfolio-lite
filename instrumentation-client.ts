import * as Sentry from "@sentry/nextjs";
import { clientEnv } from "./env";

try {
  Sentry.init({
    dsn: clientEnv.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: 0.1,
    tunnel: "/api/sentry",
  });
} catch {}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
