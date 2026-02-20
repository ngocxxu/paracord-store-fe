import Image from "next/image";
import Link from "next/link";
import { Check, Shield, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "./SectionWrapper";
import type { LandingDict } from "./types";

interface BuilderTeaserProps {
  dict: LandingDict["builderTeaser"];
  locale: string;
  imageSrc?: string;
  imageAlt?: string;
}

export function BuilderTeaser({
  dict,
  locale,
  imageSrc,
  imageAlt,
}: BuilderTeaserProps) {
  return (
    <SectionWrapper variant="surface" ariaLabel={dict.headline}>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        <div
          className={cn(
            "relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:min-h-[400px]",
            !imageSrc && "bg-brand-bg-card"
          )}
        >
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt ?? dict.headline}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : null}
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-sm font-medium uppercase tracking-widest-custom text-brand-accent">
            {dict.label}
          </span>
          <h2 className="mt-2 text-3xl font-heading font-bold uppercase tracking-tight text-brand-text-high md:text-4xl">
            {dict.headline}
          </h2>
          <p className="mt-4 text-brand-text-medium">{dict.paragraph}</p>
          <ul className="mt-6 space-y-4">
            <li className="flex gap-3">
              <Check className="h-5 w-5 shrink-0 text-brand-accent" aria-hidden />
              <div>
                <span className="font-medium text-brand-text-high">
                  {dict.feature1Title}
                </span>
                <p className="text-sm text-brand-text-medium">
                  {dict.feature1Desc}
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <Shield className="h-5 w-5 shrink-0 text-brand-accent" aria-hidden />
              <div>
                <span className="font-medium text-brand-text-high">
                  {dict.feature2Title}
                </span>
                <p className="text-sm text-brand-text-medium">
                  {dict.feature2Desc}
                </p>
              </div>
            </li>
          </ul>
          <Link
            href={`/${locale}/builder`}
            className="mt-8 inline-flex items-center gap-2 text-brand-accent hover:underline"
          >
            <Play className="h-4 w-4" aria-hidden />
            <span className="font-medium uppercase">{dict.cta}</span>
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}
