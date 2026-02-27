"use client";

import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useCartStore } from "@/features/cart/store";
import { cn } from "@/lib/utils";
import { ShoppingCart, Wrench } from "lucide-react";
import Link from "next/link";
import { useCallback } from "react";
import type { ResolvedProduct } from "./types";

function parsePrice(value: string): number | null {
  const numeric = Number.parseFloat(value.replaceAll(/[^0-9.]/g, ""));
  return Number.isFinite(numeric) ? numeric : null;
}

interface ProductCardProps extends ResolvedProduct {
  locale: string;
  detailHref?: string;
  priceNum?: number;
  addToCartLabel?: string;
}

export function ProductCard({
  id,
  slug,
  title,
  description,
  price,
  imageSrc,
  imageAlt,
  locale,
  badge,
  colorSwatches,
  detailHref,
  priceNum,
  addToCartLabel,
}: Readonly<ProductCardProps>) {
  const href = detailHref ?? `/${locale}/builder`;
  const addItem = useCartStore((state) => state.addItem);

  const parsedFromString = parsePrice(price);
  const unitPrice =
    typeof priceNum === "number" && Number.isFinite(priceNum)
      ? priceNum
      : parsedFromString ?? 0;
  const canAddToCart = unitPrice > 0;

  const handleAddToCart = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      if (!canAddToCart) return;

      addItem({
        type: "product",
        productId: id,
        name: title,
        unitPrice,
        displayPrice: price,
        imageSrc,
        imageAlt,
        optionsSummary: "",
      });
    },
    [addItem, canAddToCart, id, imageAlt, imageSrc, price, title, unitPrice]
  );

  return (
    <Link href={href} className="group block">
      <Card className="h-full overflow-hidden rounded-3xl border border-brand-border bg-brand-bg-card shadow-[0_24px_60px_rgba(0,0,0,0.65)] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:shadow-[0_32px_80px_rgba(0,0,0,0.8)]">
        <CardHeader className="relative p-0 pb-0">
          <div className="p-4 pb-0">
            <div
              className={cn(
                "aspect-square w-full overflow-hidden rounded-2xl bg-brand-bg-surface",
                !imageSrc && "bg-brand-bg-surface"
              )}
            >
              {imageSrc ? (
                <ImageWithFallback
                  src={imageSrc}
                  alt={imageAlt ?? title}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized
                />
              ) : null}
            </div>
          </div>
          {badge ? (
            <Badge
              className={cn(
                "absolute left-6 top-6 uppercase",
                badge === "bestseller" && "bg-brand-accent text-brand-text-high",
                badge === "limited" && "bg-brand-olive text-brand-text-high"
              )}
            >
              {badge === "bestseller" ? "Best Seller" : "Limited"}
            </Badge>
          ) : null}
        </CardHeader>
        <CardContent className="px-5 pb-4 pt-5">
          <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-brand-text-high md:text-xl">
            {title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-brand-text-medium md:text-base">
            {description}
          </p>
        </CardContent>
        <CardFooter className="px-5 pb-5 pt-0">
          <div className="space-y-3">
          <p className="text-xl font-bold text-brand-text-high md:text-2xl">
            {price}
          </p>
            {canAddToCart ? (
              <Button
                type="button"
                onClick={handleAddToCart}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-accent px-6 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-brand-text-high hover:bg-brand-accent-hover"
              >
                <ShoppingCart className="h-4 w-4" aria-hidden />
                <span>{addToCartLabel ?? "Add to Cart"}</span>
              </Button>
            ) : null}
            <Button
              asChild
              variant="outline"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border-brand-border bg-transparent px-6 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-brand-text-high hover:bg-brand-bg-surface"
            >
              <Link href={`/${locale}/builder`}>
                <Wrench className="h-4 w-4" aria-hidden />
                <span>Custom Builder</span>
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
