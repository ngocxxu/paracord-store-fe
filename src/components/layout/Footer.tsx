import Link from "next/link";
import { cn } from "@/lib/utils";

interface FooterDict {
  shop: string;
  about: string;
  faq: string;
  contact: string;
  copyright: string;
}

export function Footer({
  lang,
  dict,
}: {
  lang: string;
  dict: FooterDict;
}) {
  const base = `/${lang}`;
  return (
    <footer
      className={cn(
        "border-t border-brand-border bg-brand-bg-surface py-8"
      )}
    >
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 md:flex-row">
        <Link
          href={base}
          className="font-heading text-lg font-bold uppercase tracking-tight text-brand-text-high"
        >
          <span className="text-brand-accent">CO</span> PARACORD CO.
        </Link>
        <nav className="flex gap-6" aria-label="Footer">
          <Link
            href={base}
            className="text-sm text-brand-text-medium hover:underline"
          >
            {dict.shop}
          </Link>
          <Link
            href={`${base}#about`}
            className="text-sm text-brand-text-medium hover:underline"
          >
            {dict.about}
          </Link>
          <Link
            href={`${base}#faq`}
            className="text-sm text-brand-text-medium hover:underline"
          >
            {dict.faq}
          </Link>
          <Link
            href={`${base}#contact`}
            className="text-sm text-brand-text-medium hover:underline"
          >
            {dict.contact}
          </Link>
        </nav>
        <span className="text-sm text-brand-text-medium">{dict.copyright}</span>
      </div>
    </footer>
  );
}
