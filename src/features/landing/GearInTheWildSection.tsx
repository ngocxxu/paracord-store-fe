import Image from "next/image";
import { Camera, ArrowRight } from "lucide-react";
import { SectionWrapper } from "./SectionWrapper";
import type { LandingDict } from "./types";

interface GearInTheWildSectionProps {
  readonly dict: LandingDict["gearInTheWild"];
  readonly images: readonly { src: string; alt: string }[];
}

export function GearInTheWildSection({ dict, images }: GearInTheWildSectionProps) {
  return (
    <SectionWrapper variant="surface" ariaLabel={dict.title}>
      <div className="flex flex-col items-center gap-6 text-center">
        <h2 className="text-3xl font-heading font-bold uppercase tracking-tight text-brand-text-high md:text-4xl">
          {dict.title}
        </h2>
        <p className="max-w-2xl text-brand-text-medium">
          {dict.subtitleBefore}
          <span className="text-brand-accent">{dict.hashtag}</span>
          {dict.subtitleAfter}
        </p>
        <a
          href={dict.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded border-2 border-brand-accent px-6 py-3 font-medium uppercase tracking-wide text-brand-text-high transition-colors hover:bg-brand-accent/10"
        >
          <Camera className="h-5 w-5" aria-hidden />
          <span>{dict.cta}</span>
          <ArrowRight className="h-4 w-4" aria-hidden />
        </a>
        <div className="mt-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img, i) => (
            <div
              key={i}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-brand-bg-card"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
