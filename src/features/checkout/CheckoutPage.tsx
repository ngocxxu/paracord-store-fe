"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSubtotal, useCartStore } from "@/features/cart/store";
import type { CartItem } from "@/features/cart/types";
import type { CheckoutDict, OrderConfirmationPayload } from "@/features/checkout/types";
import { getDistricts, getProvinces, getWards } from "@/lib/vietnam-addresses";
import { checkoutSchema } from "@/lib/validations/checkout";
import { formatPrice } from "@/lib/pricing";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronDown, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { CheckoutFormValues } from "@/lib/validations/checkout";

const ORDER_CONFIRMATION_KEY = "order-confirmation";

const inputClassName =
  "rounded-lg border-brand-border bg-brand-bg-card text-brand-text-high placeholder:text-brand-text-medium focus-visible:ring-brand-accent";

const selectTriggerClassName =
  "flex h-9 w-full items-center justify-between gap-2 rounded-lg border border-brand-border bg-brand-bg-card px-3 py-2 text-left text-base text-brand-text-high focus:outline-none focus:ring-1 focus:ring-brand-accent disabled:opacity-50 md:text-sm";

export function CheckoutPage({
  lang,
  dict,
}: Readonly<{ lang: string; dict: CheckoutDict }>) {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const basePath = `/${lang}`;
  const subtotal = getSubtotal(items);
  const estimatedTaxRate = 0.0825;
  const estimatedTax = Math.round(subtotal * estimatedTaxRate * 100) / 100;
  const total = subtotal + estimatedTax;

  const [provinces, setProvinces] = useState<Array<{ code: number; name: string }>>([]);
  const [districts, setDistricts] = useState<Array<{ code: number; name: string }>>([]);
  const [wards, setWards] = useState<Array<{ code: number; name: string }>>([]);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema(dict.validation)),
    defaultValues: {
      email: "",
      phone: "",
      firstName: "",
      lastName: "",
      address: "",
      apartment: "",
      province: "",
      district: "",
      ward: "",
    },
  });

  const provinceValue = watch("province");
  const districtValue = watch("district");

  useEffect(() => {
    getProvinces().then(setProvinces);
  }, []);

  useEffect(() => {
    if (!provinceValue) {
      setDistricts([]);
      setWards([]);
      setValue("district", "");
      setValue("ward", "");
      return;
    }
    const code = Number(provinceValue);
    if (Number.isNaN(code)) return;
    getDistricts(code).then((list) => {
      setDistricts(list);
      setWards([]);
      setValue("district", "");
      setValue("ward", "");
    });
  }, [provinceValue, setValue]);

  useEffect(() => {
    if (!districtValue) {
      setWards([]);
      setValue("ward", "");
      return;
    }
    const code = Number(districtValue);
    if (Number.isNaN(code)) return;
    getWards(code).then(setWards);
  }, [districtValue, setValue]);

  function handleOrderNow(form: CheckoutFormValues) {
    const provinceName = provinces.find((p) => String(p.code) === form.province)?.name ?? form.province;
    const districtName = districts.find((d) => String(d.code) === form.district)?.name ?? form.district;
    const wardName = wards.find((w) => String(w.code) === form.ward)?.name ?? form.ward;
    const orderId = `#ORD-${Math.floor(10000 + Math.random() * 90000)}-FC`;
    const payload: OrderConfirmationPayload = {
      orderId,
      email: form.email,
      phone: form.phone,
      shipping: {
        firstName: form.firstName,
        lastName: form.lastName,
        address: form.address,
        apartment: form.apartment || undefined,
        province: provinceName,
        district: districtName,
        ward: wardName,
      },
      items: [...items],
      subtotal,
      total,
    };
    sessionStorage.setItem(ORDER_CONFIRMATION_KEY, JSON.stringify(payload));
    router.push(`${basePath}/checkout/thank-you`);
  }

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
          <form className="space-y-8" onSubmit={handleSubmit(handleOrderNow)} noValidate>
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
                    type="email"
                    placeholder={dict.contact.emailPlaceholder}
                    className={inputClassName}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500" role="alert">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="checkout-phone" className="sr-only">
                    {dict.contact.phoneLabel}
                  </label>
                  <Input
                    id="checkout-phone"
                    type="tel"
                    placeholder={dict.contact.phonePlaceholder}
                    className={inputClassName}
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500" role="alert">{errors.phone.message}</p>
                  )}
                </div>
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
                    {...register("firstName")}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-500" role="alert">{errors.firstName.message}</p>
                  )}
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
                    {...register("lastName")}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-500" role="alert">{errors.lastName.message}</p>
                  )}
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
                    {...register("address")}
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-500" role="alert">{errors.address.message}</p>
                  )}
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
                    {...register("apartment")}
                  />
                </div>
                <div>
                  <label id="checkout-province-label" className="sr-only">
                    {dict.shipping.provinceLabel}
                  </label>
                  <Controller
                    name="province"
                    control={control}
                    render={({ field }) => (
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          type="button"
                          aria-labelledby="checkout-province-label"
                          aria-haspopup="listbox"
                          className={selectTriggerClassName}
                        >
                          <span className="truncate">
                            {field.value ? provinces.find((p) => String(p.code) === field.value)?.name : dict.shipping.selectProvince}
                          </span>
                          <ChevronDown className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="start"
                          className="max-h-[min(16rem,var(--radix-dropdown-menu-content-available-height))] min-w-[var(--radix-dropdown-menu-trigger-width)] overflow-y-auto border-brand-border bg-brand-bg-surface text-brand-text-high"
                        >
                          {provinces.map((p) => {
                            const selected = field.value === String(p.code);
                            return (
                              <DropdownMenuItem
                                key={p.code}
                                onClick={() => field.onChange(String(p.code))}
                                className={selected ? "text-brand-accent" : ""}
                              >
                                {selected ? <Check className="mr-2 h-4 w-4 shrink-0" aria-hidden /> : <span className="mr-2 w-4 shrink-0" />}
                                {p.name}
                              </DropdownMenuItem>
                            );
                          })}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  />
                  {errors.province && (
                    <p className="mt-1 text-sm text-red-500" role="alert">{errors.province.message}</p>
                  )}
                </div>
                <div>
                  <label id="checkout-district-label" className="sr-only">
                    {dict.shipping.districtLabel}
                  </label>
                  <Controller
                    name="district"
                    control={control}
                    render={({ field }) => (
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          type="button"
                          aria-labelledby="checkout-district-label"
                          aria-haspopup="listbox"
                          disabled={!provinceValue}
                          className={selectTriggerClassName}
                        >
                          <span className="truncate">
                            {field.value ? districts.find((d) => String(d.code) === field.value)?.name : dict.shipping.selectDistrict}
                          </span>
                          <ChevronDown className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="start"
                          className="max-h-[min(16rem,var(--radix-dropdown-menu-content-available-height))] min-w-[var(--radix-dropdown-menu-trigger-width)] overflow-y-auto border-brand-border bg-brand-bg-surface text-brand-text-high"
                        >
                          {districts.map((d) => {
                            const selected = field.value === String(d.code);
                            return (
                              <DropdownMenuItem
                                key={d.code}
                                onClick={() => field.onChange(String(d.code))}
                                className={selected ? "text-brand-accent" : ""}
                              >
                                {selected ? <Check className="mr-2 h-4 w-4 shrink-0" aria-hidden /> : <span className="mr-2 w-4 shrink-0" />}
                                {d.name}
                              </DropdownMenuItem>
                            );
                          })}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  />
                  {errors.district && (
                    <p className="mt-1 text-sm text-red-500" role="alert">{errors.district.message}</p>
                  )}
                </div>
                <div>
                  <label id="checkout-ward-label" className="sr-only">
                    {dict.shipping.wardLabel}
                  </label>
                  <Controller
                    name="ward"
                    control={control}
                    render={({ field }) => (
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          type="button"
                          aria-labelledby="checkout-ward-label"
                          aria-haspopup="listbox"
                          disabled={!districtValue}
                          className={selectTriggerClassName}
                        >
                          <span className="truncate">
                            {field.value ? wards.find((w) => String(w.code) === field.value)?.name : dict.shipping.selectWard}
                          </span>
                          <ChevronDown className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="start"
                          className="max-h-[min(16rem,var(--radix-dropdown-menu-content-available-height))] min-w-[var(--radix-dropdown-menu-trigger-width)] overflow-y-auto border-brand-border bg-brand-bg-surface text-brand-text-high"
                        >
                          {wards.map((w) => {
                            const selected = field.value === String(w.code);
                            return (
                              <DropdownMenuItem
                                key={w.code}
                                onClick={() => field.onChange(String(w.code))}
                                className={selected ? "text-brand-accent" : ""}
                              >
                                {selected ? <Check className="mr-2 h-4 w-4 shrink-0" aria-hidden /> : <span className="mr-2 w-4 shrink-0" />}
                                {w.name}
                              </DropdownMenuItem>
                            );
                          })}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  />
                  {errors.ward && (
                    <p className="mt-1 text-sm text-red-500" role="alert">{errors.ward.message}</p>
                  )}
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
                type="submit"
                className="rounded-lg bg-brand-accent px-6 font-medium uppercase text-white hover:bg-brand-accent-hover"
              >
                {dict.proceedToPayment}
              </Button>
            </div>
          </form>

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
                  {dict.summary.total}
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
