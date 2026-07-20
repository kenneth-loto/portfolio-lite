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
      className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-2xl bg-muted/80 px-6 py-4 backdrop-blur-md"
    >
      <div className="flex flex-col gap-4 sm:gap-2">
        <p className="text-foreground">Cookies</p>
        <p className="text-muted-foreground leading-relaxed">
          This site uses basic analytics to track performance and usage. No
          personal data is sold or shared, and declining won't affect your
          experience.{" "}
          <Link
            href="/privacy-policy"
            aria-label="Privacy Policy"
            onClick={() => trackClick("Privacy Policy", "/privacy-policy")}
            className="w-fit text-foreground underline underline-offset-2"
          >
            Learn More<span className="sr-only"> about our Privacy Policy</span>
          </Link>
          {"."}
        </p>

        <div className="flex flex-col gap-2 sm:flex-row-reverse sm:gap-4">
          <button
            type="button"
            onClick={() => setConsent("granted")}
            className="w-full bg-primary px-8 py-1.5 text-primary-foreground hover:bg-primary/80 sm:w-auto"
          >
            Accept
          </button>

          <button
            type="button"
            onClick={() => setConsent("denied")}
            className="w-full border border-input bg-background px-8 py-1.5 text-foreground hover:bg-input/20 sm:w-auto"
          >
            Reject
          </button>
        </div>
      </div>
    </section>
  );
}
