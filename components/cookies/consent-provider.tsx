"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type Consent = "granted" | "denied" | "unknown";

interface ConsentContextValue {
  consent: Consent;
  setConsent: (consent: Consent) => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function useConsent() {
  const ctx = useContext(ConsentContext);

  if (!ctx) throw new Error("useConsent must be used within ConsentProvider");

  return ctx;
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<Consent>("unknown");

  useEffect(() => {
    const saved = localStorage.getItem("consent");

    if (saved === "granted" || saved === "denied") {
      setConsentState(saved);
    }
  }, []);

  const setConsent = (consent: Consent) => {
    localStorage.setItem("consent", consent);
    document.documentElement.setAttribute("data-consent", consent);

    setConsentState(consent);
  };

  return (
    <ConsentContext value={{ consent, setConsent }}>{children}</ConsentContext>
  );
}
