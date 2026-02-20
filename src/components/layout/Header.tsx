import Link from "next/link";
import { Search, ShoppingCart } from "lucide-react";
import { Navigation } from "./Navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

interface HeaderDict {
  nav: { shop: string; customBuild: string; lookbook: string; theCraft: string };
  navAria: { search: string; cart: string };
}

export function Header({
  lang,
  dict,
}: {
  lang: string;
  dict: HeaderDict;
}) {
  const base = `/${lang}`;
  return (
    <header className={cn("border-b border-brand-border bg-brand-bg-surface")}>
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link
          href={base}
          className="flex flex-col items-start font-heading font-bold uppercase tracking-tight"
        >
          <span className="text-xl text-brand-text-high">KORA</span>
          <span className="text-sm text-brand-accent">PARACORD</span>
        </Link>
        <Navigation lang={lang} dict={dict.nav} />
        <div className="flex items-center gap-4">
          <LanguageSwitcher currentLang={lang} />
          <button
            type="button"
            className="rounded p-2 text-brand-text-high hover:bg-brand-bg-card"
            aria-label={dict.navAria.search}
          >
            <Search className="h-5 w-5" aria-hidden />
          </button>
          <Link
            href={`${base}/cart`}
            className="rounded p-2 text-brand-text-high hover:bg-brand-bg-card"
            aria-label={dict.navAria.cart}
          >
            <ShoppingCart className="h-5 w-5" aria-hidden />
          </Link>
        </div>
      </div>
    </header>
  );
}
