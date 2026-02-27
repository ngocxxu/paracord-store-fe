import Link from "next/link";

interface AuthPageLayoutProps {
  readonly backToHome: string;
  readonly backHref: string;
  readonly footerTagline: string;
  readonly children: React.ReactNode;
}

export function AuthPageLayout({
  backToHome,
  backHref,
  footerTagline,
  children,
}: AuthPageLayoutProps) {
  return (
    <section className="flex min-h-[calc(100vh-3.5rem)] flex-col bg-brand-bg-primary">
      <div className="container mx-auto flex flex-1 flex-col px-4 py-8">
        <div className="mb-8 grid grid-cols-3 items-center">
          <Link
            href={backHref}
            className="text-sm font-medium uppercase tracking-wide text-brand-text-high hover:underline"
          >
            ← {backToHome}
          </Link>
          <div aria-hidden />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center">
          {children}
        </div>
        <p className="mt-auto pt-8 text-center text-xs uppercase tracking-widest text-brand-text-medium">
          {footerTagline}
        </p>
      </div>
    </section>
  );
}
