"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import type { ResolvedShopProduct } from "./types";

const THUMB_COUNT = 4;

interface ProductDetailGalleryProps {
  readonly product: ResolvedShopProduct;
}

export function ProductDetailGallery({ product }: ProductDetailGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const src = product.imageSrc ?? "";
  const alt = product.imageAlt ?? product.title;
  const thumbSources = Array.from({ length: THUMB_COUNT }, () => src);

  return (
    <div className="space-y-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-brand-border bg-brand-bg-surface">
        {src ? (
          <ImageWithFallback
            src={src}
            alt={alt}
            width={600}
            height={600}
            className="h-full w-full object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-brand-text-medium">
            No image
          </div>
        )}
      </div>
      <div className="flex gap-2">
        {thumbSources.map((thumbSrc, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setSelectedIndex(i)}
            className={cn(
              "relative aspect-square w-full max-w-[80px] flex-1 overflow-hidden rounded-md border-2 transition-colors",
              selectedIndex === i
                ? "border-brand-accent"
                : "border-brand-border hover:border-brand-text-medium"
            )}
          >
            {thumbSrc ? (
              <ImageWithFallback
                src={thumbSrc}
                alt=""
                width={80}
                height={80}
                className="h-full w-full object-cover"
                ariaHidden
                unoptimized
              />
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}
