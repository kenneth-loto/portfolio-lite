import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";
import "./env/server";
import "./env/client";

const isDev = process.env.NODE_ENV === "development";

const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
const sentryOrigin = sentryDsn ? new URL(sentryDsn).origin : "";

const cspDirectives = [
  "default-src 'self'",
  `script-src 'self' ${isDev ? "'unsafe-inline' 'unsafe-eval'" : ""} https://va.vercel-scripts.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
];

const connectSrc = [
  "'self'",
  "https://vitals.vercel-insights.com",
  "https://va.vercel-scripts.com",
];

if (sentryOrigin) connectSrc.push(sentryOrigin);
cspDirectives.push(`connect-src ${connectSrc.join(" ")}`);

const cspHeader = cspDirectives.join("; ");

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: true,
  typedRoutes: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: cspHeader },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  org: "kenzu-org",
  project: "portfolio-lite",
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: !process.env.CI,
  widenClientFileUpload: true,
  sourcemaps: {
    deleteSourcemapsAfterUpload: true,
  },
  bundleSizeOptimizations: {
    excludeDebugStatements: true,
    excludeTracing: true,
  },
});
