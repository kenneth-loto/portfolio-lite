import posthog from "posthog-js";

export function trackClick(label: string, url: string) {
  posthog.capture("outbound_click", { link: label, url });
}
