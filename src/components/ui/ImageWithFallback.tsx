"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ImageWithFallbackProps {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly fill?: boolean;
  readonly className?: string;
  readonly sizes?: string;
  readonly priority?: boolean;
  readonly unoptimized?: boolean;
  readonly ariaHidden?: boolean;
}

export function ImageWithFallback({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  sizes,
  priority,
  unoptimized,
  ariaHidden,
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={cn(
          "flex h-full w-full items-center justify-center bg-brand-bg-surface text-brand-text-medium",
          fill && "absolute inset-0",
          className
        )}
        aria-hidden={ariaHidden}
      >
        <span className="text-center text-sm">
          {width} × {height}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      className={className}
      sizes={sizes}
      priority={priority}
      unoptimized={unoptimized}
      aria-hidden={ariaHidden}
      onError={() => setError(true)}
    />
  );
}
