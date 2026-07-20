"use client";

import { useConsent } from "./consent-provider";

export function ResetConsent() {
  const { consent, setConsent } = useConsent();

  if (consent !== "granted") return null;

  return (
    <button
      type="button"
      onClick={() => setConsent("unknown")}
      className="underline underline-offset-2 hover:text-foreground"
    >
      Reset Cookies
    </button>
  );
}
