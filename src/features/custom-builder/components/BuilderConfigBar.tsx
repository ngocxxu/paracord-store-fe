"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { BUCKLE_OPTIONS, COLOR_OPTIONS, WEAVE_OPTIONS } from "../data";
import { buildConfigSummary, useBuilderStore } from "../store";
import type { BuilderDict } from "../types";

interface BuilderConfigBarProps {
  readonly lang: string;
  readonly dict: BuilderDict;
}

function getWeaveLabel(dict: BuilderDict, weaveType: string | null): string {
  if (!weaveType) return "";
  const w = WEAVE_OPTIONS.find((x) => x.id === weaveType);
  return w ? (dict.weaves[w.labelKey] ?? w.id) : "";
}

function getColorLabel(dict: BuilderDict, colorId: string): string {
  const c = COLOR_OPTIONS.find((x) => x.id === colorId);
  return c ? (dict.colors[c.labelKey] ?? c.id) : "";
}

function getBuckleLabel(dict: BuilderDict, buckleId: string): string {
  const b = BUCKLE_OPTIONS.find((x) => x.id === buckleId);
  return b ? (dict.buckles[b.labelKey] ?? b.id) : "";
}

export function BuilderConfigBar({ lang, dict }: BuilderConfigBarProps) {
  const { model, weaveType, sizeId, customSizeValue, buckleId, innerCoreColorId, outerEdgeColorId } = useBuilderStore();
  const [copied, setCopied] = useState(false);

  const weaveLabel = getWeaveLabel(dict, weaveType);
  const innerLabel = getColorLabel(dict, innerCoreColorId);
  const outerLabel = getColorLabel(dict, outerEdgeColorId);
  const buckleLabel = getBuckleLabel(dict, buckleId);
  const sizeLabel =
    model === "bracelet"
      ? sizeId === "custom"
        ? customSizeValue
          ? `${customSizeValue} cm`
          : dict.sizes.custom
        : dict.sizes[sizeId]
      : undefined;
  const summary = buildConfigSummary(
    weaveLabel,
    innerLabel,
    outerLabel,
    buckleLabel,
    sizeLabel
  );

  const copyOptions = useCallback(async () => {
    if (!summary) return;
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = summary;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } finally {
        ta.remove();
      }
    }
  }, [summary]);

  return (
    <div className="border-t border-brand-border bg-brand-bg-surface px-4 py-3">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <span className="sr-only">{dict.buildConfiguration}</span>
          <p className="truncate text-sm text-brand-text-medium" title={summary}>
            {summary || "—"}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={copyOptions}
            disabled={!summary}
            className="rounded border border-brand-border bg-transparent px-3 py-1.5 text-sm font-medium text-brand-text-high hover:bg-brand-bg-card disabled:opacity-50"
          >
            {copied ? "Copied" : dict.copyOptions}
          </button>
          <Link
            href={`/${lang}/cart`}
            className="rounded bg-brand-accent px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-brand-accent-hover"
          >
            {dict.addToCart}
          </Link>
        </div>
      </div>
    </div>
  );
}
