"use client";

import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Flame, Search, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ProductDetailDict, ResolvedShopProduct } from "./types";

const THUMB_COUNT = 4;
const AUTOPLAY_MS = 5000;
const ZOOM_SCALE = 2;

interface ProductDetailGalleryProps {
  readonly product: ResolvedShopProduct;
  readonly dict: ProductDetailDict;
}

export function ProductDetailGallery({ product, dict }: ProductDetailGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi | undefined>();
  const [autoplayResetKey, setAutoplayResetKey] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ pointer: { x: 0, y: 0 }, pan: { x: 0, y: 0 } });
  const panContainerRef = useRef<HTMLDivElement | null>(null);
  const selectedIndexRef = useRef(0);
  selectedIndexRef.current = selectedIndex;

  const src = product.imageSrc ?? "";
  const alt = product.imageAlt ?? product.title;
  const thumbSources = Array.from({ length: THUMB_COUNT }, () => src);
  const mainSrc = thumbSources[selectedIndex] ?? src;

  useEffect(() => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const scrollToIndex = useCallback(
    (index: number) => {
      const next = (index + THUMB_COUNT) % THUMB_COUNT;
      setSelectedIndex(next);
      api?.scrollTo(next);
    },
    [api]
  );

  useEffect(() => {
    if (!api) return;
    const id = setInterval(() => {
      const next = (selectedIndexRef.current + 1) % THUMB_COUNT;
      setSelectedIndex(next);
      api.scrollTo(next);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [api, autoplayResetKey]);

  const goToThumb = useCallback(
    (i: number) => {
      setSelectedIndex(i);
      api?.scrollTo(i);
    },
    [api]
  );

  const openZoom = useCallback(() => {
    setPan({ x: 0, y: 0 });
    setZoomOpen(true);
  }, []);

  const closeZoom = useCallback(() => setZoomOpen(false), []);

  const endDrag = useCallback((e: React.PointerEvent) => {
    panContainerRef.current?.releasePointerCapture?.(e.pointerId);
    setIsDragging(false);
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return;
      e.preventDefault();
      setIsDragging(true);
      dragStart.current = {
        pointer: { x: e.clientX, y: e.clientY },
        pan: { x: pan.x, y: pan.y },
      };
      panContainerRef.current?.setPointerCapture?.(e.pointerId);
    },
    [pan]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      const el = panContainerRef.current;
      const W = el?.offsetWidth ?? 0;
      const H = el?.offsetHeight ?? 0;
      const maxX = W / 2;
      const maxY = H / 2;
      const newX = dragStart.current.pan.x + (e.clientX - dragStart.current.pointer.x);
      const newY = dragStart.current.pan.y + (e.clientY - dragStart.current.pointer.y);
      setPan({
        x: Math.max(-maxX, Math.min(maxX, newX)),
        y: Math.max(-maxY, Math.min(maxY, newY)),
      });
    },
    [isDragging]
  );

  useEffect(() => {
    if (!zoomOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeZoom();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [zoomOpen, closeZoom]);

  return (
    <div className="space-y-4">
      {zoomOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            onClick={closeZoom}
            role="presentation"
            aria-hidden
          />,
          document.body
        )}
      <div
        className={cn(
          "relative aspect-square w-full overflow-hidden rounded-lg border border-brand-border bg-brand-bg-surface",
          zoomOpen && "z-[51]"
        )}
      >
        {mainSrc ? (
          <ImageWithFallback
            src={mainSrc}
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

        {thumbSources.length > 1 ? (
          <div className="contents">
            <button
              type="button"
              onClick={() => {
                scrollToIndex(selectedIndex - 1);
                setAutoplayResetKey((k) => k + 1);
              }}
              className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white opacity-80 transition-opacity hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => {
                scrollToIndex(selectedIndex + 1);
                setAutoplayResetKey((k) => k + 1);
              }}
              className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white opacity-80 transition-opacity hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        ) : null}

        {mainSrc ? (
          <button
            type="button"
            onClick={openZoom}
            className="absolute bottom-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-brand-border bg-brand-bg-surface/90 text-brand-text-high shadow-sm transition-colors hover:bg-brand-bg-surface"
            aria-label="Zoom image"
          >
            <Search className="h-5 w-5" />
          </button>
        ) : null}

        {zoomOpen && mainSrc ? (
          <div
            className="absolute inset-0 z-20 overflow-hidden rounded-lg border-2 border-brand-accent bg-brand-bg-surface"
            role="dialog"
            aria-modal="true"
            aria-label="Zoom image"
          >
            <div
              ref={panContainerRef}
              className="h-full w-full overflow-hidden touch-none select-none"
              style={{ cursor: isDragging ? "grabbing" : "grab" }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerLeave={endDrag}
              onPointerCancel={endDrag}
            >
              <div
                className="flex h-full w-full items-center justify-center"
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${ZOOM_SCALE})`,
                }}
              >
                <ImageWithFallback
                  src={mainSrc}
                  alt={alt}
                  width={600}
                  height={600}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  unoptimized
                  draggable={false}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={closeZoom}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
              aria-label="Close zoom"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 text-center text-sm font-medium text-white">
              <span className="inline-flex items-center gap-1.5">
                <Flame className="h-4 w-4 shrink-0" aria-hidden />
                {dict.dragToExploreMacroDetails}
              </span>
            </div>
          </div>
        ) : null}
      </div>

      <Carousel
        setApi={setApi}
        opts={{ align: "start", containScroll: "trimSnaps", loop: true }}
        className="w-full"
      >
        <CarouselContent className="-ml-2">
          {thumbSources.map((thumbSrc, i) => (
            <CarouselItem key={i} className="basis-1/4 pl-2">
              <button
                type="button"
                onClick={() => goToThumb(i)}
                className={cn(
                  "relative aspect-square w-full overflow-hidden rounded-md border-2 transition-colors",
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
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
