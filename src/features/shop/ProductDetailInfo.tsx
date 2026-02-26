"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Box, Check, PenTool, RotateCcw, Ruler, ShoppingCart, Star, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { ProductDetailDict, ResolvedShopProduct } from "./types";

type WristSizeKey = "s" | "m" | "l" | "xl";

interface ProductDetailInfoProps {
  readonly product: ResolvedShopProduct;
  readonly lang: string;
  readonly dict: ProductDetailDict;
}

const REVIEW_COUNT = 123;

export function ProductDetailInfo({ product, lang, dict }: ProductDetailInfoProps) {
  const [selectedSize, setSelectedSize] = useState<WristSizeKey | null>("m");
  const [customSize, setCustomSize] = useState("");

  const isBracelet = product.category === "bracelets";
  const sizeKeys: WristSizeKey[] = ["s", "m", "l", "xl"];

  return (
    <div className="flex h-full flex-col justify-between gap-6">
      <div className="space-y-6">
        <h1 className="font-heading text-2xl font-bold uppercase tracking-tight text-brand-text-high md:text-3xl">
          {product.title}
        </h1>

        <p className="text-2xl font-semibold text-brand-accent">{product.price}</p>

        <div className="flex items-center gap-2 text-brand-text-medium">
          <div className="flex gap-0.5" aria-hidden>
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-5 w-5 fill-brand-accent text-brand-accent" />
            ))}
          </div>
          <span className="text-sm">
            {REVIEW_COUNT} {dict.reviews}
          </span>
        </div>

        <p className="text-brand-text-medium">{product.description}</p>

        {isBracelet && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-sm font-medium uppercase tracking-wide text-brand-text-high">
              {dict.selectWristSize}
            </h2>
            <Link
              href={`/${lang}/builder`}
              className="inline-flex items-center gap-1.5 text-xs font-medium uppercase text-brand-accent hover:underline"
            >
              <Ruler className="h-4 w-4 shrink-0" aria-hidden />
              {dict.howToMeasure}
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {sizeKeys.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setSelectedSize(key);
                  setCustomSize("");
                }}
                className={cn(
                  "rounded-full border-2 px-5 py-2.5 text-sm font-medium uppercase transition-colors",
                  selectedSize === key && !customSize
                    ? "border-brand-accent bg-transparent text-brand-text-high"
                    : "border-brand-border bg-transparent text-brand-text-high hover:border-brand-text-medium"
                )}
              >
                {dict.wristSizes[key]}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-sm font-medium uppercase tracking-wide text-brand-text-high">
              {dict.orEnterExactSize}
            </h2>
            <button
              type="button"
              onClick={() => {
                setCustomSize("");
                setSelectedSize("m");
              }}
              className="inline-flex items-center gap-1.5 text-xs font-medium uppercase text-brand-accent hover:underline"
            >
              <RotateCcw className="h-4 w-4 shrink-0" aria-hidden />
              {dict.resetSelection}
            </button>
          </div>
          <div className="flex h-12 w-full items-center overflow-hidden rounded-xl border border-brand-border bg-brand-bg-surface">
            <Input
              type="text"
              inputMode="decimal"
              placeholder={dict.customSizePlaceholder}
              value={customSize}
              onChange={(e) => {
                setCustomSize(e.target.value);
                if (e.target.value) setSelectedSize(null);
              }}
              className="h-full min-w-0 flex-1 border-0 bg-transparent py-0 pl-4 pr-2 text-base font-semibold leading-normal text-brand-text-high placeholder:font-normal placeholder:text-brand-text-medium focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <div className="flex h-full items-center gap-2 border-l border-brand-border pr-3 pl-4">
              <span className="text-sm font-medium uppercase text-brand-accent">CM</span>
              {customSize && !Number.isNaN(Number(customSize.replace(",", "."))) ? (
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-accent text-white"
                  aria-hidden
                >
                  <Check className="h-4 w-4" />
                </span>
              ) : (
                <span className="h-7 w-7 shrink-0" aria-hidden />
              )}
            </div>
          </div>
          <p className="flex items-start gap-2 text-xs italic uppercase leading-relaxed text-brand-text-medium">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent" aria-hidden />
            {dict.precisionFitNote}
          </p>
        </div>
        )}
      </div>

      <div className="space-y-4">
        <Button
          size="lg"
          className="w-full bg-brand-accent font-medium uppercase text-brand-text-high hover:bg-brand-accent-hover"
        >
          <ShoppingCart className="h-5 w-5" />
          {dict.addToCart} - {product.price}
        </Button>
        <p className="text-xs uppercase tracking-wide text-brand-text-medium">
          {dict.shipping}
        </p>
        <div className="rounded-2xl border border-[#4F4A45] bg-[#2E2824] p-6">
          <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-brand-accent">
            <PenTool className="h-4 w-4" aria-hidden />
            {dict.customizer.tagline}
          </p>
          <h3 className="mt-2 font-heading text-xl font-bold uppercase tracking-tight text-white md:text-2xl">
            {dict.customizer.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[#D4D4D4]">
            {dict.customizer.description}
          </p>
          <Button
            asChild
            size="lg"
            className="mt-6 w-full rounded-xl border border-[#6B6661] bg-[#3D3733] px-6 py-3 font-semibold uppercase text-white hover:bg-[#4A443F] hover:text-white"
          >
            <Link href={`/${lang}/builder`} className="inline-flex items-center justify-center gap-2">
              <Box className="h-5 w-5 shrink-0" aria-hidden />
              {dict.customizer.openCustomizer}
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
          <div className="flex gap-3 rounded-lg border border-brand-border bg-brand-bg-surface p-3">
            <Check className="h-6 w-6 shrink-0 text-brand-accent" />
            <div>
              <p className="text-xs font-medium uppercase text-brand-text-high">
                {dict.guarantees.lifetimeGuarantee}
              </p>
              <p className="text-xs text-brand-text-medium">
                {dict.guarantees.lifetimeGuaranteeDesc}
              </p>
            </div>
          </div>
          <div className="flex gap-3 rounded-lg border border-brand-border bg-brand-bg-surface p-3">
            <Zap className="h-6 w-6 shrink-0 text-brand-accent" />
            <div>
              <p className="text-xs font-medium uppercase text-brand-text-high">
                {dict.guarantees.expressBuild}
              </p>
              <p className="text-xs text-brand-text-medium">
                {dict.guarantees.expressBuildDesc}
              </p>
            </div>
          </div>
        </div>
    </div>
  );
}
