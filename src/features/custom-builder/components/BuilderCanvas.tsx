"use client";

import { Check, Layout, Palette, Wrench } from "lucide-react";
import {
  BRACELET_WEAVE_CANVAS,
  BUCKLE_OPTIONS,
  COLOR_OPTIONS,
  DEFAULT_BRACELET_CANVAS,
} from "../data";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { useBuilderStore } from "../store";
import type { BuilderDict, PartPlacement } from "../types";

interface BuilderCanvasProps {
  readonly dict: BuilderDict;
}

function partStyle(placement: { top: number; left?: number; right?: number }): React.CSSProperties {
  const s: React.CSSProperties = { top: `${placement.top}%` };
  if (placement.left !== undefined) s.left = `${placement.left}%`;
  if (placement.right !== undefined) s.right = `${placement.right}%`;
  return s;
}

interface ColorPartPanelProps {
  readonly dict: BuilderDict;
  readonly activeId: string;
  readonly setActiveId: (id: string) => void;
  readonly titleKey: "innerCoreColor" | "outerEdgeColor";
  readonly placement: PartPlacement;
}

function ColorPartPanel({
  dict,
  activeId,
  setActiveId,
  titleKey,
  placement,
}: ColorPartPanelProps) {
  const title = dict[titleKey];
  const selected = COLOR_OPTIONS.find((c) => c.id === activeId);
  const colorName = selected ? (dict.colors[selected.labelKey] ?? selected.id) : "";
  return (
    <div
      className="absolute w-44 rounded border border-brand-border bg-brand-bg-surface p-2 shadow-card"
      style={partStyle(placement)}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-wide text-brand-text-high">
          {title}
        </p>
        <Palette className="h-4 w-4 shrink-0 text-brand-text-medium" aria-hidden />
      </div>
      <div className="flex max-h-32 flex-wrap gap-1.5 overflow-y-auto">
        {COLOR_OPTIONS.map((c) => {
          const active = activeId === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveId(c.id)}
              className={`h-7 w-7 shrink-0 overflow-hidden rounded border-2 transition-colors ${active ? "border-brand-accent ring-2 ring-brand-accent ring-offset-1 ring-offset-brand-bg-surface" : "border-brand-border hover:border-brand-text-medium"}`}
              aria-pressed={active}
              aria-label={dict.colors[c.labelKey] ?? c.id}
              title={dict.colors[c.labelKey] ?? c.id}
            >
              <img src={c.imageSrc} alt="" className="h-full w-full object-cover" />
            </button>
          );
        })}
      </div>
      {selected && (
        <div className="relative mt-2 rounded border border-white/30 bg-black/90 p-2">
          <Check
            className="absolute bottom-1 right-1 h-4 w-4 shrink-0 text-brand-accent"
            aria-hidden
          />
          <div className="relative flex justify-center">
            <img
              src={selected.imageSrc}
              alt=""
              className="max-h-24 w-auto max-w-[160px] object-contain"
            />
          </div>
          <p className="mt-1.5 text-left text-[10px] font-semibold uppercase leading-tight text-white">
            {colorName}
          </p>
        </div>
      )}
    </div>
  );
}

export function BuilderCanvas({ dict }: BuilderCanvasProps) {
  const {
    model,
    weaveType,
    buckleId,
    innerCoreColorId,
    outerEdgeColorId,
    setBuckleId,
    setInnerCoreColorId,
    setOuterEdgeColorId,
  } = useBuilderStore();

  const canvasConfig =
    model === "bracelet"
      ? BRACELET_WEAVE_CANVAS[weaveType ?? "cobra"] ?? DEFAULT_BRACELET_CANVAS
      : DEFAULT_BRACELET_CANVAS;
  const imageSrc = canvasConfig.imageSrc;
  const parts = canvasConfig.parts;

  const bucklePlacement = parts.buckle ?? DEFAULT_BRACELET_CANVAS.parts.buckle!;
  const innerCorePlacement = parts.innerCore ?? DEFAULT_BRACELET_CANVAS.parts.innerCore!;
  const outerEdgePlacement = parts.outerEdge ?? DEFAULT_BRACELET_CANVAS.parts.outerEdge!;

  if (!model) {
    return (
      <div className="relative flex min-h-[400px] flex-1 items-center justify-center overflow-hidden bg-brand-bg-primary p-4">
        <div className="relative flex max-h-[70vh] w-full max-w-3xl items-center justify-center">
          <div className="relative flex aspect-[4/3] w-full max-w-2xl flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-brand-border bg-brand-bg-surface/50">
            <Layout className="h-14 w-14 text-brand-text-medium/60" aria-hidden />
            <p className="text-center text-sm font-medium uppercase tracking-wide text-brand-text-medium">
              {dict.selectModelToPreview}
            </p>
            <p className="text-center text-xs text-brand-text-medium/80">
              {dict.selectModel}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!weaveType) {
    return (
      <div className="relative flex min-h-[400px] flex-1 items-center justify-center overflow-hidden bg-brand-bg-primary p-4">
        <div className="relative flex max-h-[70vh] w-full max-w-3xl items-center justify-center">
          <div className="relative flex aspect-[4/3] w-full max-w-2xl flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-brand-border bg-brand-bg-surface/50">
            <Layout className="h-14 w-14 text-brand-text-medium/60" aria-hidden />
            <p className="text-center text-sm font-medium uppercase tracking-wide text-brand-text-medium">
              {dict.selectWeaveTypeToPreview}
            </p>
            <p className="text-center text-xs text-brand-text-medium/80">
              {dict.weaveType}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[400px] flex-1 items-center justify-center overflow-hidden bg-brand-bg-primary p-4">
      <div className="relative flex max-h-[70vh] w-full max-w-3xl items-center justify-center">
        <div className="relative aspect-[4/3] w-full max-w-2xl">
          <ImageWithFallback
            src={imageSrc}
            alt="Paracord bracelet"
            width={672}
            height={504}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 672px"
            unoptimized
          />

          <div
            className="absolute w-44 rounded border border-brand-border bg-brand-bg-surface p-2 shadow-card"
            style={partStyle(bucklePlacement)}
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-brand-text-high">
                {dict.buckle}
              </p>
              <Wrench className="h-4 w-4 shrink-0 text-brand-text-medium" aria-hidden />
            </div>
            <div className="flex gap-2">
              {BUCKLE_OPTIONS.map((b) => {
                const active = buckleId === b.id;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBuckleId(b.id)}
                    className={`flex h-12 w-12 shrink-0 overflow-hidden rounded border-2 transition-colors ${active ? "border-brand-accent ring-2 ring-brand-accent ring-offset-1 ring-offset-brand-bg-surface" : "border-brand-border hover:border-brand-text-medium"}`}
                    aria-pressed={active}
                    aria-label={dict.buckles[b.labelKey] ?? b.id}
                  >
                    <img
                      src={b.imageSrc}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
            {(() => {
              const selected = BUCKLE_OPTIONS.find((b) => b.id === buckleId);
              if (!selected) return null;
              return (
                <div className="relative mt-2 rounded border border-white/30 bg-black/90 p-1.5">
                  <Check
                    className="absolute bottom-1 right-1 h-4 w-4 shrink-0 text-brand-accent"
                    aria-hidden
                  />
                  <div className="relative flex justify-center">
                    <img
                      src={selected.imageSrc}
                      alt=""
                      className="max-h-24 w-auto max-w-[160px] object-contain"
                    />
                    {selected.overlayLines && selected.overlayLines.length > 0 && (
                      <div className="absolute bottom-1 left-1 flex flex-col gap-0.5 text-[10px] font-medium uppercase leading-tight text-white">
                        {selected.overlayLines.map((line, i) => (
                          <span key={i}>{line}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>

          <ColorPartPanel
            dict={dict}
            activeId={innerCoreColorId}
            setActiveId={setInnerCoreColorId}
            titleKey="innerCoreColor"
            placement={innerCorePlacement}
          />
          <ColorPartPanel
            dict={dict}
            activeId={outerEdgeColorId}
            setActiveId={setOuterEdgeColorId}
            titleKey="outerEdgeColor"
            placement={outerEdgePlacement}
          />
        </div>
      </div>
    </div>
  );
}
