"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Check, Settings, ShoppingCart, Star, Zap } from "lucide-react";
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
        <div className="space-y-3">
          <h2 className="text-sm font-medium uppercase tracking-wide text-brand-text-high">
            {dict.selectWristSize}
          </h2>
          <Link
            href={`/${lang}/builder`}
            className="text-xs uppercase text-brand-accent hover:underline"
          >
            {dict.howToMeasure}
          </Link>
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
                  "rounded-md border-2 px-4 py-2 text-sm font-medium uppercase transition-colors",
                  selectedSize === key && !customSize
                    ? "border-brand-accent bg-brand-accent text-brand-text-high"
                    : "border-brand-border text-brand-text-high hover:border-brand-text-medium"
                )}
              >
                {dict.wristSizes[key]}
              </button>
            ))}
          </div>
          <p className="text-xs text-brand-text-medium">{dict.orEnterExactSize}</p>
          <div className="flex items-center gap-2">
            <Input
              type="text"
              inputMode="decimal"
              placeholder={dict.customSizePlaceholder}
              value={customSize}
              onChange={(e) => {
                setCustomSize(e.target.value);
                if (e.target.value) setSelectedSize(null);
              }}
              className="max-w-[140px] border-brand-border bg-brand-bg-surface text-brand-text-high placeholder:text-brand-text-medium"
            />
            <span className="text-sm text-brand-text-medium">CM</span>
          </div>
        </div>
      )}

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

      <div className="rounded-lg border border-brand-border bg-brand-bg-surface p-4">
        <h3 className="font-heading text-sm font-bold uppercase text-brand-text-high">
          {dict.customizer.title}
        </h3>
        <p className="mt-2 text-sm text-brand-text-medium">
          {dict.customizer.description}
        </p>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="mt-4 border-brand-border bg-transparent text-brand-text-high hover:bg-brand-bg-card"
        >
          <Link href={`/${lang}/builder`}>
            <Settings className="h-5 w-5" />
            {dict.customizer.openCustomizer}
          </Link>
        </Button>
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
