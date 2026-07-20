import Link from "next/link";
import { ResetConsent } from "../cookies/reset-consent";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="text-muted-foreground text-xs">
      <div className="mx-6 flex flex-col items-center gap-2 border-border border-t py-4 sm:flex-row sm:justify-between">
        <span>&copy; {year} Kenneth Loto. All rights reserved.</span>

        <div className="flex items-center gap-4">
          <Link
            href="/privacy-policy"
            className="underline underline-offset-2 hover:text-foreground"
          >
            Privacy Policy
          </Link>

          <ResetConsent />
        </div>
      </div>
    </footer>
  );
}
