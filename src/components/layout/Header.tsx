import Link from "next/link";
import { Search, ShoppingCart } from "lucide-react";
import { Navigation } from "./Navigation";
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
          className="font-heading text-lg font-bold uppercase tracking-tight text-brand-text-high"
        >
          <span className="text-brand-accent">GO</span> PARACORD CO.
        </Link>
        <Navigation lang={lang} dict={dict.nav} />
        <div className="flex items-center gap-2">
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
