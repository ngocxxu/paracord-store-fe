"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavDict {
  shop: string;
  customBuild: string;
  lookbook: string;
  theCraft: string;
}

export function Navigation({ lang, dict }: Readonly<{ lang: string; dict: NavDict }>) {
  const pathname = usePathname();
  const base = `/${lang}`;
  const isBuilder = pathname === `${base}/builder`;
  return (
    <nav className="flex gap-6" aria-label="Main">
      <Link
        href={`${base}/shop`}
        className="text-sm font-medium uppercase tracking-wide text-brand-text-high hover:underline"
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
      <Link
        href={`${base}#lookbook`}
        className="text-sm font-medium uppercase tracking-wide text-brand-text-high hover:underline"
      >
        {dict.lookbook}
      </Link>
      <Link
        href={`${base}#gear-in-the-wild`}
        className="text-sm font-medium uppercase tracking-wide text-brand-text-high hover:underline"
      >
        {dict.theCraft}
      </Link>
    </nav>
  );
}
