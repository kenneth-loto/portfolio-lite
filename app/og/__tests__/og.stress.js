import { check, sleep } from "k6";
import http from "k6/http";
import { Rate, Trend } from "k6/metrics";

// Keep in sync with baseUrl in app/sitemap.ts
const BASE_URL = "https://www.kennethloto.dev";

// Custom metrics to track og-specific performance under stress
const ogDuration = new Trend("og_response_time");
const ogFailRate = new Rate("og_fail_rate");

export const options = {
  scenarios: {
    og_stress: {
      executor: "ramping-vus",
      startVUs: 0,
      stages: [
        { duration: "10s", target: 20 }, // start at load test peak
        { duration: "30s", target: 50 }, // push beyond normal
        { duration: "30s", target: 100 }, // heavy stress
        { duration: "30s", target: 200 }, // find the breaking point
        { duration: "30s", target: 0 }, // ramp down
      ],
    },
  },
};

export default function () {
  // Real OG URLs matching actual usage in the app
  const cases = [
    // Home page
    `/og?title=Full-Stack%20Developer&description=Building%20web%20applications%20that%20are%20well-structured%2C%20maintainable%2C%20and%20built%20to%20last.&type=Home`,

    // Blog index
    `/og?title=Writing%20Thoughts&description=Writing%20about%20software%20engineering%2C%20web%20development%2C%20and%20problems%20I've%20actually%20run%20into.&type=Blog`,

    // Projects index
    `/og?title=Things%20I've%20Built&description=Full-stack%20web%20apps%2C%20geospatial%20systems%2C%20and%20machine%20learning.&type=Projects`,

    // Individual blog posts
    `/og?title=Building%20a%20Dog%20Stool%20Classifier%3A%20My%20Dataset%20Struggles&description=What%20I%20learned%20training%20a%20MobileNetV2%20model%20on%201%2C050%20images%20%E2%80%94%20dataset%20problems%2C%20model%20selection%2C%20and%20the%20fifth%20class%20I%20never%20wanted%20to%20add.&type=Blog%20Post`,

    `/og?title=Rebuilding%20GIS4Health%3A%20PHP%2FLeaflet%20to%20Laravel%20%2B%20React&description=A%20before-and-after%20on%20rewriting%20a%20health%20mapping%20GIS%20%E2%80%94%20architecture%20decisions%2C%20mapping%20in%20React%2C%20and%20when%20a%20rewrite%20is%20actually%20worth%20it.&type=Blog%20Post`,

    // Individual projects
    `/og?title=Dog%20Stool%20Classifier&description=Android%20app%20that%20classifies%20dog%20stool%20into%205%20health%20categories%20with%20confidence%20scores%2C%20health%20descriptions%2C%20and%20remedy%20recommendations.&type=Project`,

    `/og?title=Heat%20Mapping%20of%20Various%20Health%20Cases%20in%20Biliran%20Province&description=Web-based%20GIS%20for%20monitoring%20disease%20patterns%20in%20Biliran%20Province%20with%20heatmaps%2C%20choropleth%20maps%2C%20and%20threshold-based%20alerts.&type=Project`,

    // Edge case — empty params
    `/og`,
  ];

  const url = `${BASE_URL}${cases[Math.floor(Math.random() * cases.length)]}`;
  const response = http.get(url);

  ogDuration.add(response.timings.duration);
  ogFailRate.add(response.status !== 200);

  check(response, {
    "status 200": (res) => res.status === 200,
    "is image/png": (res) => res.headers["Content-Type"]?.includes("image/png"),
    "under 5s": (res) => res.timings.duration < 5000,
  });

  sleep(1);
}
