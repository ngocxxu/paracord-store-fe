import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
        <Link href={base} className="flex items-center">
          <Logo height={28} width={120} />
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
        <span className="text-sm text-brand-text-medium">{`© ${new Date().getFullYear()} ${dict.copyright}`}</span>
      </div>
    </footer>
  );
}
