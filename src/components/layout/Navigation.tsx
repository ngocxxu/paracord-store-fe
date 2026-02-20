import Link from "next/link";

interface NavDict {
  shop: string;
  customBuild: string;
  lookbook: string;
  theCraft: string;
}

export function Navigation({ lang, dict }: { lang: string; dict: NavDict }) {
  const base = `/${lang}`;
  return (
    <nav className="flex gap-6" aria-label="Main">
      <Link
        href={base}
        className="text-sm font-medium uppercase tracking-wide text-brand-text-high hover:underline"
      >
        {dict.shop}
      </Link>
      <Link
        href={`${base}/builder`}
        className="text-sm font-medium uppercase tracking-wide text-brand-text-high hover:underline"
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
        href={`${base}#the-craft`}
        className="text-sm font-medium uppercase tracking-wide text-brand-text-high hover:underline"
      >
        {dict.theCraft}
      </Link>
    </nav>
  );
}
