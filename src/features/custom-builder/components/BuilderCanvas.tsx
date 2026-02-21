"use client";

import { Maximize2, Minus, Plus } from "lucide-react";
import { useCallback, useState } from "react";
import Image from "next/image";
import { BUCKLE_OPTIONS, COLOR_OPTIONS, WEAVE_OPTIONS } from "../data";
import { useBuilderStore } from "../store";
import type { BuilderDict } from "../types";

interface BuilderCanvasProps {
  readonly dict: BuilderDict;
}

const HOTSPOT_LINE = [
  { from: { x: 72, y: 22 }, to: { x: 88, y: 22 } },
  { from: { x: 22, y: 48 }, to: { x: 6, y: 48 } },
  { from: { x: 78, y: 52 }, to: { x: 94, y: 52 } },
];

export function BuilderCanvas({ dict }: BuilderCanvasProps) {
  const {
    weaveType,
    buckleId,
    innerCoreColorId,
    outerEdgeColorId,
    setBuckleId,
    setInnerCoreColorId,
    setOuterEdgeColorId,
  } = useBuilderStore();
  const [scale, setScale] = useState(1);

  const weave = WEAVE_OPTIONS.find((w) => w.id === (weaveType ?? "cobra"));
  const imageSrc = weave?.imageSrc ?? "/images/builder/bracelet-cobra.jpg";

  const zoomIn = useCallback(() => setScale((s) => Math.min(s + 0.25, 2)), []);
  const zoomOut = useCallback(() => setScale((s) => Math.max(s - 0.25, 0.5)), []);
  const resetZoom = useCallback(() => setScale(1), []);

  return (
    <div className="relative flex min-h-[400px] flex-1 items-center justify-center overflow-hidden bg-brand-bg-primary p-4">
      <div
        className="relative flex max-h-[70vh] w-full max-w-3xl items-center justify-center"
        style={{ transform: `scale(${scale})` }}
      >
        <div className="relative aspect-[4/3] w-full max-w-2xl">
          <Image
            src={imageSrc}
            alt="Paracord bracelet"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 672px"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = "none";
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = "block";
            }}
          />
          <div
            className="absolute inset-0 bg-brand-bg-surface"
            style={{ display: "none" }}
            aria-hidden
          >
            <div className="flex h-full items-center justify-center text-brand-text-medium">
              Bracelet
            </div>
          </div>

          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            {HOTSPOT_LINE.map((line, i) => (
              <line
                key={i}
                x1={line.from.x}
                y1={line.from.y}
                x2={line.to.x}
                y2={line.to.y}
                stroke="var(--primary)"
                strokeWidth="0.5"
              />
            ))}
          </svg>

          <div
            className="absolute left-[70%] top-[20%] h-2 w-2 rounded-full bg-brand-accent"
            aria-hidden
          />
          <div
            className="absolute left-[20%] top-[46%] h-2 w-2 rounded-full bg-brand-accent"
            aria-hidden
          />
          <div
            className="absolute left-[76%] top-[50%] h-2 w-2 rounded-full bg-brand-accent"
            aria-hidden
          />

          <div className="absolute right-0 top-[18%] w-36 rounded border border-brand-border bg-brand-bg-surface p-2 shadow-card">
            <p className="mb-2 text-xs font-medium uppercase text-brand-text-high">
              {dict.buckle}
            </p>
            <div className="flex gap-2">
              {BUCKLE_OPTIONS.map((b) => {
                const label = dict.buckles[b.labelKey] ?? b.id;
                const active = buckleId === b.id;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBuckleId(b.id)}
                    className={`rounded px-2 py-1 text-xs ${active ? "bg-brand-accent text-primary-foreground" : "bg-brand-bg-card text-brand-text-high hover:bg-brand-border"}`}
                    aria-pressed={active}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="absolute left-0 top-[44%] w-40 rounded border border-brand-border bg-brand-bg-surface p-2 shadow-card">
            <p className="mb-2 text-xs font-medium uppercase text-brand-text-high">
              {dict.innerCoreColor}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {COLOR_OPTIONS.slice(0, 6).map((c) => {
                const active = innerCoreColorId === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setInnerCoreColorId(c.id)}
                    className={`h-6 w-6 rounded-full border-2 transition-colors ${active ? "border-brand-accent ring-2 ring-brand-accent ring-offset-1 ring-offset-brand-bg-surface" : "border-brand-border hover:border-brand-text-medium"}`}
                    style={{ backgroundColor: c.hex }}
                    aria-pressed={active}
                    aria-label={dict.colors[c.labelKey] ?? c.id}
                    title={dict.colors[c.labelKey] ?? c.id}
                  />
                );
              })}
            </div>
          </div>

          <div className="absolute right-0 top-[48%] w-40 rounded border border-brand-border bg-brand-bg-surface p-2 shadow-card">
            <p className="mb-2 text-xs font-medium uppercase text-brand-text-high">
              {dict.outerEdgeColor}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {COLOR_OPTIONS.slice(0, 6).map((c) => {
                const active = outerEdgeColorId === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setOuterEdgeColorId(c.id)}
                    className={`h-6 w-6 rounded-full border-2 transition-colors ${active ? "border-brand-accent ring-2 ring-brand-accent ring-offset-1 ring-offset-brand-bg-surface" : "border-brand-border hover:border-brand-text-medium"}`}
                    style={{ backgroundColor: c.hex }}
                    aria-pressed={active}
                    aria-label={dict.colors[c.labelKey] ?? c.id}
                    title={dict.colors[c.labelKey] ?? c.id}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute right-6 top-1/2 flex -translate-y-1/2 flex-col gap-2"
        aria-label="Zoom controls"
      >
        <button
          type="button"
          onClick={zoomIn}
          className="rounded border border-brand-border bg-brand-bg-surface p-2 text-brand-text-high hover:bg-brand-bg-card"
          aria-label="Zoom in"
        >
          <Plus className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={zoomOut}
          className="rounded border border-brand-border bg-brand-bg-surface p-2 text-brand-text-high hover:bg-brand-bg-card"
          aria-label="Zoom out"
        >
          <Minus className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={resetZoom}
          className="rounded border border-brand-border bg-brand-bg-surface p-2 text-brand-text-high hover:bg-brand-bg-card"
          aria-label="Reset view"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
