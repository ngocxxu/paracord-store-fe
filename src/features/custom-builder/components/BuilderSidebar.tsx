"use client";

import { ChevronDown, ChevronUp, Minus } from "lucide-react";
import { useState } from "react";
import { BUILDER_MODELS, WEAVE_OPTIONS, BASE_PRICE, CUSTOMIZATION_PRICE } from "../data";
import { useBuilderStore } from "../store";
import type { BuilderDict, BuilderModel } from "../types";

interface BuilderSidebarProps {
  readonly dict: BuilderDict;
}

export function BuilderSidebar({ dict }: BuilderSidebarProps) {
  const { model, weaveType, setModel, setWeaveType, getTotalPrice } = useBuilderStore();
  const [sizeOpen, setSizeOpen] = useState(false);
  const [addOnsOpen, setAddOnsOpen] = useState(false);

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

        {model === "bracelet" && (
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
        )}

        <section>
          <button
            type="button"
            onClick={() => setSizeOpen((o) => !o)}
            className="flex w-full items-center justify-between text-sm font-medium uppercase tracking-wide text-brand-text-high"
            aria-expanded={sizeOpen}
          >
            {dict.sizeAndFit}
            {sizeOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {sizeOpen && <div className="mt-2 text-sm text-brand-text-medium">—</div>}
        </section>

        <section>
          <button
            type="button"
            onClick={() => setAddOnsOpen((o) => !o)}
            className="flex w-full items-center justify-between text-sm font-medium uppercase tracking-wide text-brand-text-high"
            aria-expanded={addOnsOpen}
          >
            {dict.addOns}
            {addOnsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {addOnsOpen && <div className="mt-2 text-sm text-brand-text-medium">—</div>}
        </section>

        <section className="border-t border-brand-border pt-4">
          <p className="text-sm text-brand-text-medium">
            {dict.basePrice} (${BASE_PRICE.toFixed(2)})
          </p>
          <p className="mt-1 text-sm text-brand-text-medium">
            {dict.customizations} (+${customizations.toFixed(2)})
          </p>
          <p className="mt-2 text-sm font-medium text-brand-text-high">
            {dict.total} (${total.toFixed(2)})
          </p>
        </section>
      </div>
    </aside>
  );
}
