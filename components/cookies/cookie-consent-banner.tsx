"use client";

import Link from "next/link";
import { trackClick } from "@/lib/track-click";
import { useConsent } from "./consent-provider";

export function CookieConsentBanner() {
  const { consent, setConsent } = useConsent();

  if (consent !== "unknown") return null;

  return (
    <section
      aria-label="Cookie consent"
      data-cookie-banner
      className="sticky bottom-0 z-50 mx-auto w-full max-w-2xl bg-muted/80 px-6 py-4 text-sm backdrop-blur-md"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <p className="text-muted-foreground leading-relaxed">
          This site uses analytics to understand how it's used.{" "}
          <Link
            href="/privacy-policy"
            aria-label="Privacy Policy"
            onClick={() => trackClick("Privacy Policy", "/privacy-policy")}
            className="w-fit py-1 text-foreground underline underline-offset-2"
          >
            Learn More<span className="sr-only"> about our Privacy Policy</span>
          </Link>
          {"."}
        </p>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={() => setConsent("denied")}
            className="border border-input bg-background px-3 py-1.5 text-foreground hover:bg-input/20"
          >
            Reject
          </button>

          <button
            type="button"
            onClick={() => setConsent("granted")}
            className="bg-primary px-3 py-1.5 text-primary-foreground hover:bg-primary/80"
          >
            Accept
          </button>
        </div>
      </div>
    </section>
  );
}
