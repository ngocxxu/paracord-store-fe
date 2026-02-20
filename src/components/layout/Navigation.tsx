import Link from "next/link";

export function Navigation({ lang }: { lang: string }) {
  const base = `/${lang}`;
  return (
    <nav className="flex gap-6">
      <Link href={base} className="text-sm font-medium hover:underline">
        Home
      </Link>
      <Link href={`${base}/builder`} className="text-sm font-medium hover:underline">
        Builder
      </Link>
      <Link href={`${base}/cart`} className="text-sm font-medium hover:underline">
        Cart
      </Link>
    </nav>
  );
}
