"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavDict {
  shop: string;
  customBuild: string;
}

export function Navigation({ lang, dict }: Readonly<{ lang: string; dict: NavDict }>) {
   const pathname = usePathname();
  const base = `/${lang}`;
  const isShop = pathname === `${base}/shop` || pathname.startsWith(`${base}/shop/`);
  const isBuilder = pathname === `${base}/builder`;
  return (
    <nav className="flex gap-6" aria-label="Main">
      <Link
        href={`${base}/shop`}
        className={cn(
          "text-sm font-medium uppercase tracking-wide text-brand-text-high hover:underline",
          isShop && "border-b-2 border-brand-accent text-brand-accent"
        )}
      >
        {dict.shop}
      </Link>
      <Link
        href={`${base}/builder`}
        className={cn(
          "text-sm font-medium uppercase tracking-wide text-brand-text-high hover:underline",
          isBuilder && "border-b-2 border-brand-accent text-brand-accent"
        )}
      >
        {dict.customBuild}
      </Link>
    </nav>
  );
}
