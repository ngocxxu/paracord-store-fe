 "use client";

import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";
import { Search, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CartIconButton } from "./CartIconButton";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Navigation } from "./Navigation";

interface HeaderDict {
  nav: {
    shop: string;
    customBuild: string;
    lookbook: string;
    theCraft: string;
    trackOrder: string;
  };
  navAria: { search: string; cart: string; signIn: string; signUp: string };
}

export function Header({
  lang,
  dict,
}: Readonly<{
  lang: string;
  dict: HeaderDict;
}>) {
  const base = `/${lang}`;

  const [authEmail, setAuthEmail] = useState<string | null>(null);

  useEffect(() => {
    if (typeof globalThis === "undefined" || !("localStorage" in globalThis)) {
      return;
    }

    const storedEmail = globalThis.localStorage.getItem("authEmail");
    setAuthEmail(storedEmail);
  }, []);

  const displayName = authEmail
    ? authEmail.split("@")[0]?.replaceAll(/[._]/g, " ") ?? ""
    : "";

  const nameWords = displayName
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const initials =
    nameWords.length === 0
      ? ""
      : nameWords
          .slice(0, 2)
          .map((word) => word[0]?.toUpperCase() ?? "")
          .join("");

  const isLoggedIn = Boolean(displayName && initials);

  return (
    <header className={cn("border-b border-brand-border bg-brand-bg-surface")}>
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href={base} className="flex items-center">
          <Logo height={36} width={160} />
        </Link>
        <Navigation lang={lang} dict={dict.nav} />
        <div className="flex items-center gap-2">
          <LanguageSwitcher currentLang={lang} />
          <button
            type="button"
            className="rounded p-2 text-brand-text-high hover:bg-brand-bg-card"
            aria-label={dict.navAria.search}
          >
            <Search className="h-5 w-5" aria-hidden />
          </button>
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-text-high">
                HI, {displayName.toUpperCase()}
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF7A00] text-xs font-semibold text-white">
                {initials}
              </div>
            </div>
          ) : (
            <>
              <Link
                href={`${base}/signin`}
                className="rounded p-2 text-brand-text-high hover:bg-brand-bg-card"
                aria-label={dict.navAria.signIn}
              >
                <User className="h-5 w-5" aria-hidden />
              </Link>
              <Link
                href={`${base}/signup`}
                className="rounded border border-brand-olive p-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-text-high hover:bg-brand-bg-card"
                aria-label={dict.navAria.signUp}
              >
                {dict.navAria.signUp}
              </Link>
            </>
          )}
          <CartIconButton basePath={base} ariaLabel={dict.navAria.cart} />
        </div>
      </div>
    </header>
  );
}
