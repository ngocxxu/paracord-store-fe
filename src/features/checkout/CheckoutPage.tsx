"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSubtotal, useCartStore } from "@/features/cart/store";
import type { CartItem } from "@/features/cart/types";
import type { CheckoutDict } from "@/features/checkout/types";
import { formatPrice } from "@/lib/pricing";
import { Check, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const inputClassName =
  "rounded-lg border-brand-border bg-brand-bg-card text-brand-text-high placeholder:text-brand-text-medium focus-visible:ring-brand-accent";

export function CheckoutPage({
  lang,
  dict,
}: Readonly<{ lang: string; dict: CheckoutDict }>) {
  const items = useCartStore((s) => s.items);
  const basePath = `/${lang}`;
  const subtotal = getSubtotal(items);
  const estimatedTaxRate = 0.0825;
  const estimatedTax = Math.round(subtotal * estimatedTaxRate * 100) / 100;
  const total = subtotal + estimatedTax;

  if (items.length === 0) {
    return (
      <section className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center bg-brand-bg-primary px-4 py-16">
        <h1 className="text-2xl font-heading font-bold uppercase tracking-tight text-brand-text-high md:text-3xl">
          {dict.emptyTitle}
        </h1>
        <p className="mt-3 max-w-sm text-center text-brand-text-medium">
          {dict.emptySubtitle}
        </p>
        <Button asChild className="mt-8 bg-brand-accent hover:bg-brand-accent-hover text-white">
          <Link href={`${basePath}/cart`}>{dict.emptyCta}</Link>
        </Button>
      </section>
    );
  }

  return (
    <section className="min-h-[calc(100vh-3.5rem)] bg-brand-bg-primary">
      <div className="container mx-auto px-4 py-8">
        <nav
          className="mb-8 flex flex-wrap items-center gap-2 text-sm font-medium uppercase tracking-wide"
          aria-label="Checkout progress"
        >
          <Link
            href={`${basePath}/cart`}
            className="text-brand-text-medium hover:text-brand-text-high"
          >
            {dict.breadcrumb.cart}
          </Link>
          <span className="text-brand-text-medium" aria-hidden>
            &gt;
          </span>
          <span className="text-brand-accent">{dict.breadcrumb.information}</span>
          <span className="text-brand-text-medium" aria-hidden>
            &gt;
          </span>
          <span className="text-brand-text-medium opacity-70">
            {dict.breadcrumb.shipping}
          </span>
          <span className="text-brand-text-medium" aria-hidden>
            &gt;
          </span>
          <span className="text-brand-text-medium opacity-70">
            {dict.breadcrumb.payment}
          </span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start">
          <div className="space-y-8">
            <section>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-accent text-sm font-bold text-white"
                  aria-hidden
                >
                  01
                </span>
                <h2 className="font-heading text-base font-bold uppercase tracking-tight text-brand-text-high">
                  {dict.contact.title}
                </h2>
                <span className="text-sm text-brand-text-medium">
                  {dict.contact.loginPrompt}{" "}
                  <Link
                    href={`${basePath}/signin`}
                    className="text-brand-accent hover:underline"
                  >
                    {dict.contact.loginLink}
                  </Link>
                </span>
              </div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="checkout-email" className="sr-only">
                    {dict.contact.emailLabel}
                  </label>
                  <Input
                    id="checkout-email"
                    type="text"
                    placeholder={dict.contact.emailPlaceholder}
                    className={inputClassName}
                  />
                </div>
                <label className="flex cursor-pointer items-center gap-2 text-sm text-brand-text-medium">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-brand-border bg-brand-bg-card text-brand-accent focus:ring-brand-accent"
                  />
                  <span>{dict.contact.newsletterCheckbox}</span>
                </label>
              </div>
            </section>

            <section>
              <div className="mb-4 flex items-center gap-3">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-accent text-sm font-bold text-white"
                  aria-hidden
                >
                  02
                </span>
                <h2 className="font-heading text-base font-bold uppercase tracking-tight text-brand-text-high">
                  {dict.shipping.title}
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="checkout-firstname" className="sr-only">
                    {dict.shipping.firstNameLabel}
                  </label>
                  <Input
                    id="checkout-firstname"
                    type="text"
                    placeholder={dict.shipping.firstNameLabel}
                    className={inputClassName}
                  />
                </div>
                <div>
                  <label htmlFor="checkout-lastname" className="sr-only">
                    {dict.shipping.lastNameLabel}
                  </label>
                  <Input
                    id="checkout-lastname"
                    type="text"
                    placeholder={dict.shipping.lastNameLabel}
                    className={inputClassName}
                  />
                </div>
              </div>
              <div className="mt-4 space-y-4">
                <div>
                  <label htmlFor="checkout-address" className="sr-only">
                    {dict.shipping.addressLabel}
                  </label>
                  <Input
                    id="checkout-address"
                    type="text"
                    placeholder={dict.shipping.addressLabel}
                    className={inputClassName}
                  />
                </div>
                <div>
                  <label htmlFor="checkout-apartment" className="sr-only">
                    {dict.shipping.apartmentPlaceholder}
                  </label>
                  <Input
                    id="checkout-apartment"
                    type="text"
                    placeholder={dict.shipping.apartmentPlaceholder}
                    className={inputClassName}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="checkout-city" className="sr-only">
                      {dict.shipping.cityLabel}
                    </label>
                    <Input
                      id="checkout-city"
                      type="text"
                      placeholder={dict.shipping.cityLabel}
                      className={inputClassName}
                    />
                  </div>
                  <div>
                    <label htmlFor="checkout-country" className="sr-only">
                      {dict.shipping.countryLabel}
                    </label>
                    <select
                      id="checkout-country"
                      className={`h-9 w-full rounded-lg border border-brand-border bg-brand-bg-card px-3 py-1 text-base text-brand-text-high focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-accent md:text-sm ${inputClassName}`}
                    >
                      <option value="US">United States</option>
                      <option value="VN">Vietnam</option>
                      <option value="GB">United Kingdom</option>
                    </select>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="checkout-state" className="sr-only">
                      {dict.shipping.stateLabel}
                    </label>
                    <Input
                      id="checkout-state"
                      type="text"
                      placeholder={dict.shipping.stateLabel}
                      className={inputClassName}
                    />
                  </div>
                  <div>
                    <label htmlFor="checkout-zip" className="sr-only">
                      {dict.shipping.postalCodeLabel}
                    </label>
                    <Input
                      id="checkout-zip"
                      type="text"
                      placeholder={dict.shipping.postalCodeLabel}
                      className={inputClassName}
                    />
                  </div>
                </div>
              </div>
            </section>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <Link
                href={`${basePath}/cart`}
                className="inline-flex items-center gap-1 text-sm text-brand-text-medium hover:text-brand-text-high"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden />
                {dict.returnToCart}
              </Link>
              <Button
                className="rounded-lg bg-brand-accent px-6 font-medium uppercase text-white hover:bg-brand-accent-hover"
                asChild
              >
                <Link href="#">{dict.proceedToPayment}</Link>
              </Button>
            </div>
          </div>

          <div className="lg:sticky lg:top-6">
            <div className="rounded-2xl border border-brand-border bg-brand-bg-surface p-6 shadow-card">
              <h2 className="text-lg font-heading font-bold uppercase tracking-tight text-brand-text-high">
                {dict.summary.orderSummaryTitle}
              </h2>
              <ul className="mt-4 space-y-4 border-b border-brand-border pb-4">
                {items.map((item) => (
                  <CheckoutLineItem
                    key={item.id}
                    item={item}
                    formatPrice={(n) => formatPrice(n, lang)}
                  />
                ))}
              </ul>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between text-brand-text-medium">
                  <dt>{dict.summary.subtotal}</dt>
                  <dd>{formatPrice(subtotal, lang)}</dd>
                </div>
                <div className="flex justify-between text-brand-text-medium">
                  <dt>{dict.summary.shippingLabel}</dt>
                  <dd className="text-brand-text-medium">
                    {dict.summary.shippingCalculatedNextStep}
                  </dd>
                </div>
                <div className="flex justify-between text-brand-text-medium">
                  <dt>{dict.summary.estimatedTaxes}</dt>
                  <dd>{formatPrice(estimatedTax, lang)}</dd>
                </div>
              </dl>
              <div className="mt-4 flex justify-between border-t border-brand-border pt-4">
                <dt className="text-sm font-medium uppercase text-brand-text-medium">
                  {dict.summary.totalUsd}
                </dt>
                <dd className="text-xl font-bold text-brand-accent">
                  {formatPrice(total, lang)}
                </dd>
              </div>
              <ul className="mt-6 space-y-2 text-xs text-brand-text-medium">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
                  <span className="uppercase">{dict.guarantee.secureCheckout}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
                  <span className="uppercase">{dict.guarantee.freeBuildShip}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckoutLineItem({
  item,
  formatPrice,
}: Readonly<{
  item: CartItem;
  formatPrice: (amount: number) => string;
}>) {
  const lineTotal = item.unitPrice * item.quantity;
  return (
    <li className="flex gap-4">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-brand-border bg-brand-bg-card">
        {item.imageSrc ? (
          <Image
            src={item.imageSrc}
            alt={item.imageAlt ?? item.name}
            fill
            className="object-cover"
            sizes="56px"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-brand-accent to-brand-olive" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-heading text-sm font-bold uppercase tracking-tight text-brand-text-high">
          {item.name}
        </p>
        {item.optionsSummary ? (
          <p className="mt-0.5 text-xs text-brand-text-medium">
            {item.optionsSummary}
          </p>
        ) : null}
      </div>
      <p className="shrink-0 text-sm font-medium text-brand-text-high">
        {formatPrice(lineTotal)}
      </p>
    </li>
  );
}
