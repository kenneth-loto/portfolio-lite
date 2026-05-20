import { check, sleep } from "k6";
import http from "k6/http";
import { Rate, Trend } from "k6/metrics";

// Keep in sync with baseUrl in app/sitemap.ts
const BASE_URL = "https://www.kennethloto.dev";

// Custom metrics to track rss-specific performance
const rssDuration = new Trend("rss_response_time");
const rssFailRate = new Rate("rss_fail_rate");

export const options = {
  scenarios: {
    rss_load: {
      executor: "ramping-vus",
      startVUs: 0,
      stages: [
        { duration: "10s", target: 5 }, // warm up
        { duration: "20s", target: 20 }, // ramp up
        { duration: "20s", target: 20 }, // hold
        { duration: "10s", target: 0 }, // ramp down
      ],
    },
  },
};

export default function () {
  // RSS only has one endpoint — no param variations
  const response = http.get(`${BASE_URL}/rss`);

  rssDuration.add(response.timings.duration);
  rssFailRate.add(response.status !== 200);

  check(response, {
    "status 200": (res) => res.status === 200,
    "is xml": (res) => res.headers["Content-Type"]?.includes("text/xml"),
    "under 2s": (res) => res.timings.duration < 2000, // stricter than og since no image rendering
  });

  sleep(1);
}
