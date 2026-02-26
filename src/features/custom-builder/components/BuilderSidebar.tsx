"use client";

import { Minus, Pencil, Ruler } from "lucide-react";
import { useState } from "react";
import { BUILDER_MODELS, CUSTOMIZATION_PRICE, KEYCHAIN_WEAVE_OPTIONS, SIZE_CUSTOM_ID, SIZE_PRESETS, WEAVE_OPTIONS } from "../data";
import { useBuilderStore } from "../store";
import type { BuilderDict, BuilderModel } from "../types";
import { MeasureGuideModal } from "./MeasureGuideModal";

interface BuilderSidebarProps {
  readonly dict: BuilderDict;
}

export function BuilderSidebar({ dict }: BuilderSidebarProps) {
  const { model, weaveType, sizeId, customSizeValue, setModel, setWeaveType, setSizeId, setCustomSizeValue, getTotalPrice } = useBuilderStore();
  const [addOnsOpen, setAddOnsOpen] = useState(false);
  const [measureModalOpen, setMeasureModalOpen] = useState(false);

  const total = getTotalPrice();
  const hasSelection = model !== null || weaveType !== null;
  const customizations = hasSelection ? CUSTOMIZATION_PRICE : 0;

  return (
    <aside
      className="w-full shrink-0 border-r border-brand-border bg-brand-bg-primary lg:w-64"
      aria-label="Builder options"
    >
      <div className="sticky top-14 space-y-6 p-4">
        <section>
          <h3 className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-brand-text-high">
            <Minus className="h-4 w-4" aria-hidden />
            {dict.selectModel}
          </h3>
          <ul className="mt-3 space-y-2">
            {BUILDER_MODELS.map((id) => {
              const label = dict.models[id as BuilderModel];
              const active = model === id;
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => setModel(active ? null : (id as BuilderModel))}
                    className="flex w-full items-center gap-2 text-left text-sm text-brand-text-high hover:underline"
                    aria-pressed={active}
                  >
                    <span
                      className={
                        active
                          ? "flex h-4 w-4 items-center justify-center rounded border border-brand-accent bg-brand-accent"
                          : "flex h-4 w-4 items-center justify-center rounded border border-brand-border"
                      }
                      aria-hidden
                    >
                      {active ? <span className="text-brand-text-high">✓</span> : null}
                    </span>
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        {model === "bracelet" ? (
          <section>
            <h3 className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-brand-text-high">
              <Minus className="h-4 w-4" aria-hidden />
              {dict.weaveType}
            </h3>
            <ul className="mt-3 space-y-2">
              {WEAVE_OPTIONS.map((w) => {
                const label = dict.weaves[w.labelKey] ?? w.id;
                const active = weaveType === w.id;
                return (
                  <li key={w.id}>
                    <button
                      type="button"
                      onClick={() => setWeaveType(active ? null : w.id)}
                      className="flex w-full items-center gap-2 text-left text-sm text-brand-text-high hover:underline"
                      aria-pressed={active}
                    >
                      <span
                        className={
                          active
                            ? "flex h-4 w-4 items-center justify-center rounded-full border-2 border-brand-accent bg-brand-accent"
                            : "h-4 w-4 rounded-full border-2 border-brand-border"
                        }
                        aria-hidden
                      >
                        {active ? (
                          <span className="flex h-full w-full items-center justify-center text-[10px] text-brand-text-high">✓</span>
                        ) : null}
                      </span>
                      <span className={active ? "text-brand-accent" : ""}>{label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        {model === "keychain" ? (
          <section>
            <h3 className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-brand-text-high">
              <Minus className="h-4 w-4" aria-hidden />
              {dict.weaveType}
            </h3>
            <ul className="mt-3 space-y-2">
              {KEYCHAIN_WEAVE_OPTIONS.map((w) => {
                const label = dict.weaves[w.labelKey] ?? w.id;
                const active = weaveType === w.id;
                return (
                  <li key={w.id}>
                    <button
                      type="button"
                      onClick={() => setWeaveType(active ? null : w.id)}
                      className="flex w-full items-center gap-2 text-left text-sm text-brand-text-high hover:underline"
                      aria-pressed={active}
                    >
                      <span
                        className={
                          active
                            ? "flex h-4 w-4 items-center justify-center rounded border border-brand-accent bg-brand-accent"
                            : "flex h-4 w-4 items-center justify-center rounded border border-brand-border"
                        }
                        aria-hidden
                      >
                        {active ? <span className="text-brand-text-high">✓</span> : null}
                      </span>
                      {label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        {model === "bracelet" ? (
          <section>
            <div className="flex items-center justify-between gap-2">
              <h3 className="flex shrink-0 items-center gap-2 whitespace-nowrap text-sm font-bold uppercase tracking-wide text-brand-text-high">
                <Minus className="h-4 w-4 shrink-0" aria-hidden />
                {dict.sizeAndFit}
              </h3>
              <button
                type="button"
                onClick={() => setMeasureModalOpen(true)}
                className="flex shrink-0 items-center gap-1 whitespace-nowrap text-xs font-medium uppercase tracking-wide text-brand-accent hover:underline"
              >
                <Ruler className="h-3.5 w-3.5 shrink-0" aria-hidden />
                {dict.howToMeasure}
              </button>
              <MeasureGuideModal
                open={measureModalOpen}
                onOpenChange={setMeasureModalOpen}
                dict={dict}
              />
            </div>
            <div className="mt-3 space-y-3">
              <div className="flex gap-2">
                {SIZE_PRESETS.map(({ id, labelKey }) => {
                  const active = sizeId === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setSizeId(id)}
                      className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium uppercase ${
                        active
                          ? "bg-brand-accent text-brand-text-high"
                          : "border border-brand-border bg-brand-bg-card text-brand-text-high"
                      }`}
                      aria-pressed={active}
                    >
                      {dict.sizes[labelKey] ?? id}
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => setSizeId(SIZE_CUSTOM_ID)}
                className={`flex w-full items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium ${
                  sizeId === SIZE_CUSTOM_ID
                    ? "border-brand-accent bg-brand-accent text-brand-text-high"
                    : "border-brand-border bg-brand-bg-card text-brand-text-high"
                }`}
                aria-pressed={sizeId === SIZE_CUSTOM_ID}
              >
                {dict.sizes.custom}
                <Pencil className="h-4 w-4" aria-hidden />
              </button>
              {sizeId === SIZE_CUSTOM_ID ? (
                <label className="block">
                  <input
                    type="number"
                    inputMode="decimal"
                    step="0.1"
                    min={0}
                    value={customSizeValue}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (v === "" || /^\d*\.?\d*$/.test(v)) setCustomSizeValue(v);
                    }}
                    placeholder={dict.customSizePlaceholder}
                    className="w-full rounded-lg border border-brand-border bg-brand-bg-card px-3 py-2 text-sm text-brand-text-high placeholder:text-brand-text-medium [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    aria-label={dict.customSizePlaceholder}
                  />
                </label>
              ) : null}
              {sizeId !== SIZE_CUSTOM_ID && dict.fitDescription[sizeId] ? (
                <p className="text-sm text-brand-text-medium">
                  {dict.fitDescription[sizeId]}
                </p>
              ) : null}
            </div>
          </section>
        ) : null}
      </div>
    </aside>
  );
}
