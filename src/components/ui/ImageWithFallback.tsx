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
  readonly draggable?: boolean;
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
  draggable,
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  // #region agent log
  if (typeof fetch !== 'undefined') { fetch('http://127.0.0.1:7250/ingest/e463248e-0ad5-429a-8866-967a21d6021a',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'905c8d'},body:JSON.stringify({sessionId:'905c8d',hypothesisId:'H4',runId:'hero-slides',location:'ImageWithFallback.tsx:render',message:'image mount',data:{src,fill,error},timestamp:Date.now()})}).catch(()=>{}); }
  // #endregion

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
      draggable={draggable}
      onError={() => {
        // #region agent log
        fetch('http://127.0.0.1:7250/ingest/e463248e-0ad5-429a-8866-967a21d6021a',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'905c8d'},body:JSON.stringify({sessionId:'905c8d',hypothesisId:'H3',runId:'hero-slides',location:'ImageWithFallback.tsx:onError',message:'image load failed',data:{src},timestamp:Date.now()})}).catch(()=>{});
        // #endregion
        setError(true);
      }}
    />
  );
}
