"use client";

import { Button } from "@/components/ui/button";
import { getSubtotal, useCartStore } from "@/features/cart/store";
import type { CartDict, CartItem } from "@/features/cart/types";
import { formatPrice } from "@/lib/pricing";
import { ChevronRight, Hammer, Minus, Plus, Shield, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CartPageProps {
  readonly lang: string;
  readonly dict: CartDict;
}

export function CartPage({ lang, dict }: CartPageProps) {
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = getSubtotal(items);
  const shipping = 0;
  const tax = 0;
  const total = subtotal + shipping + tax;
  const basePath = `/${lang}`;

  if (itemCount === 0) {
    return (
      <section className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center bg-brand-bg-primary px-4 py-16">
        <h1 className="text-2xl font-heading font-bold uppercase tracking-tight text-brand-text-high md:text-3xl">
          {dict.emptyTitle}
        </h1>
        <p className="mt-3 max-w-sm text-center text-brand-text-medium">
          {dict.emptySubtitle}
        </p>
        <Button asChild className="mt-8 bg-brand-accent hover:bg-brand-accent-hover text-white">
          <Link href={`${basePath}/shop`}>{dict.emptyCta}</Link>
        </Button>
      </section>
    );
  }

  return (
    <section className="min-h-[calc(100vh-3.5rem)] bg-brand-bg-primary">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-wrap items-baseline gap-2">
          <h1 className="text-3xl font-heading font-bold uppercase tracking-tight text-brand-text-high md:text-4xl">
            {dict.title}
          </h1>
          <span className="text-brand-text-medium">
            ({itemCount} {itemCount === 1 ? dict.itemSingular : dict.itemPlural})
          </span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-start">
          <div className="space-y-6">
            <div className="rounded-2xl border border-brand-border bg-brand-bg-surface p-4 shadow-card md:p-6">
              {items.map((item) => (
                <CartLineItem
                  key={item.id}
                  item={item}
                  onSetQuantity={(qty) => setQuantity(item.id, qty)}
                  onRemove={() => removeItem(item.id)}
                  formatPrice={(n) => formatPrice(n, lang)}
                />
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-lg border border-brand-border bg-brand-bg-card px-4 py-3">
                <Hammer className="h-5 w-5 shrink-0 text-brand-accent" aria-hidden />
                <span className="text-sm font-medium uppercase text-brand-text-high">
                  {dict.handmadeLabel}
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-brand-border bg-brand-bg-card px-4 py-3">
                <Shield className="h-5 w-5 shrink-0 text-brand-accent" aria-hidden />
                <span className="text-sm font-medium uppercase text-brand-text-high">
                  {dict.lifetimeGuaranteeLabel}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-6">
            <div className="rounded-2xl border border-brand-border bg-brand-bg-surface p-6 shadow-card">
              <h2 className="text-lg font-heading font-bold uppercase tracking-tight text-brand-text-high">
                {dict.summary.title}
              </h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between text-brand-text-medium">
                  <dt>{dict.summary.subtotal}</dt>
                  <dd>{formatPrice(subtotal, lang)}</dd>
                </div>
                <div className="flex justify-between text-brand-text-medium">
                  <dt>{dict.summary.shipping}</dt>
                  <dd className="font-medium text-green-600">{dict.summary.shippingFree}</dd>
                </div>
                <div className="flex justify-between text-brand-text-medium">
                  <dt>{dict.summary.tax}</dt>
                  <dd>{formatPrice(tax, lang)}</dd>
                </div>
              </dl>
              <div className="mt-4 flex justify-between border-t border-brand-border pt-4">
                <dt className="text-base font-bold uppercase text-brand-text-high">
                  {dict.summary.total}
                </dt>
                <dd className="text-lg font-bold text-brand-accent">
                  {formatPrice(total, lang)}
                </dd>
              </div>
              <Button
                className="mt-6 w-full bg-brand-accent font-medium uppercase text-brand-text-high hover:bg-brand-accent-hover"
                asChild
              >
                <Link href={`${basePath}/checkout`} className="inline-flex items-center justify-center gap-2">
                  {dict.summary.checkoutCta}
                  <ChevronRight className="h-5 w-5" aria-hidden />
                </Link>
              </Button>
              <p className="mt-4 text-xs italic text-brand-text-medium">
                {dict.summary.note}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface CartLineItemProps {
  item: CartItem;
  onSetQuantity: (qty: number) => void;
  onRemove: () => void;
  formatPrice: (amount: number) => string;
}

function CartLineItem({ item, onSetQuantity, onRemove, formatPrice }: Readonly<CartLineItemProps>) {
  const lineTotal = item.unitPrice * item.quantity;

  return (
    <div className="flex gap-4 border-b border-brand-border py-4 last:border-0 last:pb-0 first:pt-0">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-brand-border bg-brand-bg-card">
        {item.imageSrc ? (
          <Image
            src={item.imageSrc}
            alt={item.imageAlt ?? item.name}
            fill
            className="object-cover"
            sizes="96px"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-brand-accent to-brand-olive" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-tight text-brand-text-high md:text-base">
              {item.name}
            </h3>
            {item.optionsSummary ? (
              <p className="mt-1 text-xs text-brand-text-medium">{item.optionsSummary}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onRemove}
            className="shrink-0 rounded p-1.5 text-brand-text-medium hover:bg-brand-bg-card hover:text-brand-text-high"
            aria-label="Remove item"
          >
            <Trash2 className="h-4 w-4" aria-hidden />
          </button>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 rounded-lg border border-brand-border bg-transparent">
            <button
              type="button"
              onClick={() => onSetQuantity(Math.max(1, item.quantity - 1))}
              className="flex h-9 w-9 items-center justify-center text-brand-text-high hover:bg-brand-bg-card"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" aria-hidden />
            </button>
            <span className="min-w-[2rem] text-center text-sm font-medium text-brand-text-high">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => onSetQuantity(item.quantity + 1)}
              className="flex h-9 w-9 items-center justify-center text-brand-text-high hover:bg-brand-bg-card"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" aria-hidden />
            </button>
          </div>
          <span className="text-sm font-semibold text-brand-accent">
            {formatPrice(lineTotal)}
          </span>
        </div>
      </div>
    </div>
  );
}
