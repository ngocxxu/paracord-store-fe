import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { LandingDict } from "./types";

interface HeroProps {
  dict: LandingDict["hero"];
  locale: string;
  imageSrc?: string;
  imageAlt?: string;
}

export function Hero({ dict, locale, imageSrc, imageAlt }: HeroProps) {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden">
      <div
        className={cn(
          "absolute inset-0",
          !imageSrc && "bg-brand-bg-card"
        )}
        aria-hidden
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt ?? ""}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : null}
      </div>
      <div className="absolute inset-0 bg-brand-bg-primary/70" />
      <div className="relative z-10 flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <span className="mb-4 inline-block bg-brand-accent px-3 py-1 text-xs font-medium uppercase tracking-widest-custom text-brand-text-high">
          {dict.badge}
        </span>
        <h1 className="max-w-4xl text-4xl font-heading font-bold uppercase tracking-tight text-brand-text-high md:text-5xl lg:text-6xl">
          {dict.headline}
        </h1>
        <p className="mt-4 max-w-2xl text-brand-text-medium md:text-lg">
          {dict.subheadline}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button
            asChild
            className="bg-brand-accent text-brand-text-high hover:bg-brand-accent-hover"
          >
            <Link href={`/${locale}`}>{dict.ctaPrimary}</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-2 border-brand-accent bg-transparent text-brand-text-high hover:bg-brand-accent/10"
          >
            <Link href={`/${locale}/builder`}>{dict.ctaSecondary}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
