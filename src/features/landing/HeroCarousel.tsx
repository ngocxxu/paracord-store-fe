"use client";

import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { LandingDict } from "./types";
import { HERO_SLIDES } from "./data";

interface HeroCarouselProps {
  dict: LandingDict["hero"];
  heroSlides?: LandingDict["heroSlides"];
  locale: string;
}

export function HeroCarousel({ dict, heroSlides, locale }: HeroCarouselProps) {
  const slides = HERO_SLIDES;

  return (
    <section className="relative w-full overflow-hidden">
      <Carousel
        opts={{ loop: true }}
        className="relative min-h-[70vh]"
      >
        <CarouselContent className="-ml-0">
          {slides.map((slide, index) => {
            const copy = heroSlides?.[index] ?? dict;
            // #region agent log
            fetch('http://127.0.0.1:7250/ingest/e463248e-0ad5-429a-8866-967a21d6021a',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'905c8d'},body:JSON.stringify({sessionId:'905c8d',hypothesisId:'H1',runId:'hero-slides',location:'HeroCarousel.tsx:map',message:'slide render',data:{slideIndex:index,imageSrc:slide.imageSrc,slidesLength:slides.length},timestamp:Date.now()})}).catch(()=>{});
            // #endregion

            return (
              <CarouselItem key={slide.imageSrc} className="basis-full">
                <div className="relative min-h-[70vh] w-full overflow-hidden">
                  <div className="absolute inset-0" aria-hidden>
                    <img
                      src={slide.imageSrc}
                      alt={slide.imageAlt}
                      className="absolute inset-0 h-full w-full object-cover"
                      fetchPriority={index === 0 ? "high" : undefined}
                    />
                  </div>
                  <div className="absolute inset-0 bg-brand-bg-primary/70" />
                  <div className="relative z-10 flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
                    <span className="mb-4 inline-block bg-brand-accent px-3 py-1 text-xs font-medium uppercase tracking-widest-custom text-brand-text-high">
                      {copy.badge}
                    </span>
                    <h1 className="max-w-4xl text-4xl font-heading font-bold uppercase tracking-tight text-brand-text-high md:text-5xl lg:text-6xl">
                      {copy.headline}
                    </h1>
                    <p className="mt-4 max-w-2xl text-brand-text-medium md:text-lg">
                      {copy.subheadline}
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
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious
          className={cn(
            "absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border-brand-border bg-black/40 text-brand-text-high hover:bg-black/60"
          )}
          aria-label="Previous hero slide"
        />
        <CarouselNext
          className={cn(
            "absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border-brand-border bg-black/40 text-brand-text-high hover:bg-black/60"
          )}
          aria-label="Next hero slide"
        />
      </Carousel>
    </section>
  );
}

