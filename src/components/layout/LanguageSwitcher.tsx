"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LOCALES = ["en", "vi"] as const;

function pathForLocale(pathname: string, locale: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return `/${locale}`;
  const rest = segments.slice(1).join("/");
  return `/${locale}${rest ? `/${rest}` : ""}`;
}

export function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const pathname = usePathname();

  return (
    <div
      className="flex items-center gap-1 text-sm font-medium uppercase"
      role="group"
      aria-label="Language"
    >
      {LOCALES.map((locale, i) => {
        const href = pathForLocale(pathname, locale);
        const isActive = currentLang === locale;
        return (
          <span key={locale} className="flex items-center gap-1">
            {i > 0 ? (
              <span className="text-brand-text-medium" aria-hidden>
                |
              </span>
            ) : null}
            <Link
              href={href}
              className={cn(
                isActive
                  ? "text-brand-text-high"
                  : "text-brand-text-medium hover:text-brand-text-high"
              )}
              aria-current={isActive ? "true" : undefined}
            >
              {locale === "en" ? "EN" : "VI"}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
