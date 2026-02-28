"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/features/cart/store";
import type {
  OrderConfirmationPayload,
  OrderThankYouDict,
} from "@/features/checkout/types";
import { formatPrice } from "@/lib/pricing";
import { Check, Info, Printer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const ORDER_CONFIRMATION_KEY = "order-confirmation";

function readOrderFromStorage(): OrderConfirmationPayload | undefined {
  if (globalThis.window === undefined) return undefined;
  try {
    const raw = globalThis.sessionStorage.getItem(ORDER_CONFIRMATION_KEY);
    if (!raw) return undefined;
    const data = JSON.parse(raw) as OrderConfirmationPayload;
    if (data?.orderId && data?.items?.length) return data;
  } catch {
    // ignore
  }
  return undefined;
}

export function ThankYouPage({
  lang,
  dict,
}: Readonly<{ lang: string; dict: OrderThankYouDict }>) {
  const router = useRouter();
  const [order, setOrder] = useState<OrderConfirmationPayload | null | undefined>(
    () => readOrderFromStorage() ?? undefined
  );
  const hasRestoredRef = useRef(false);

  useEffect(() => {
    if (globalThis.window === undefined) return;
    const raw = globalThis.sessionStorage.getItem(ORDER_CONFIRMATION_KEY);
    if (!raw) {
      if (hasRestoredRef.current) return;
      router.replace(`/${lang}/shop`);
      return;
    }
    try {
      const data = JSON.parse(raw) as OrderConfirmationPayload;
      if (!data?.orderId || !data?.items?.length) {
        router.replace(`/${lang}/shop`);
        return;
      }
      hasRestoredRef.current = true;
      setOrder(data);
      globalThis.sessionStorage.removeItem(ORDER_CONFIRMATION_KEY);
      useCartStore.getState().clear();
    } catch {
      router.replace(`/${lang}/shop`);
    }
  }, [lang, router]);

  const basePath = `/${lang}`;

  if (order === undefined) {
    return (
      <section className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center bg-brand-bg-primary">
        <p className="text-brand-text-medium">Loading...</p>
      </section>
    );
  }

  if (order === null) {
    return null;
  }

  const s = order.shipping;
  const addressLines = [
    [s.firstName, s.lastName].filter(Boolean).join(" "),
    s.address,
    s.apartment,
    [s.province, s.district, s.ward].filter(Boolean).join(", "),
    "Vietnam",
  ].filter(Boolean);

  return (
    <section className="min-h-[calc(100vh-3.5rem)] bg-brand-bg-primary px-4 py-12">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col items-center text-center">
          <span
            className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-accent"
            aria-hidden
          >
            <Check className="h-8 w-8 text-white" />
          </span>
          <h1 className="mt-4 font-heading text-2xl font-bold uppercase tracking-tight text-brand-text-high md:text-3xl">
            {dict.title}
          </h1>
          <p className="mt-3 max-w-lg text-brand-text-medium">
            {dict.message}
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-border bg-brand-bg-surface p-6 shadow-card md:p-8">
          <div className="flex flex-col gap-6 border-b border-brand-border pb-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-brand-text-medium">
                {dict.confirmationNumber}
              </p>
              <p className="mt-1 text-2xl font-bold text-brand-accent md:text-3xl">
                {order.orderId}
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              className="rounded-lg border-brand-border bg-transparent text-brand-text-high hover:bg-brand-bg-card"
              onClick={() => globalThis.window.print()}
            >
              <Printer className="mr-2 h-4 w-4" aria-hidden />
              <span className="uppercase">{dict.printReceipt}</span>
            </Button>
          </div>

          <div className="mt-6 grid gap-8 md:grid-cols-2">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="h-8 w-1 shrink-0 rounded-full bg-brand-accent"
                  aria-hidden
                />
                <h2 className="font-heading text-base font-bold uppercase tracking-tight text-brand-text-high">
                  {dict.orderSummary}
                </h2>
              </div>
              <ul className="mt-4 space-y-3 border-b border-brand-border pb-4">
                {order.items.map((item) => (
                  <ThankYouLineItem
                    key={item.id}
                    item={item}
                    formatPrice={(n) => formatPrice(n, lang)}
                  />
                ))}
              </ul>
              <dl className="space-y-1 text-sm">
                <div className="flex justify-between text-brand-text-medium">
                  <dt>{dict.subtotal}</dt>
                  <dd>{formatPrice(order.subtotal, lang)}</dd>
                </div>
                <div className="flex justify-between text-brand-text-medium">
                  <dt>{dict.shippingCalculatedOnConfirmation}</dt>
                  <dd>{dict.shippingCalculatedOnConfirmation}</dd>
                </div>
              </dl>
              <div className="mt-3 flex justify-between border-t border-brand-border pt-3">
                <dt className="font-medium uppercase text-brand-text-high">
                  {dict.totalCharged}
                </dt>
                <dd className="text-xl font-bold text-brand-accent">
                  {formatPrice(order.total, lang)}
                </dd>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span
                  className="h-8 w-1 shrink-0 rounded-full bg-brand-accent"
                  aria-hidden
                />
                <h2 className="font-heading text-base font-bold uppercase tracking-tight text-brand-text-high">
                  {dict.contactInformation}
                </h2>
              </div>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-xs font-medium uppercase text-brand-text-medium">
                    {dict.primaryEmail}
                  </dt>
                  <dd className="mt-0.5 text-brand-text-high">{order.email}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase text-brand-text-medium">
                    {dict.confirmationPhone}
                  </dt>
                  <dd className="mt-0.5 text-brand-text-high">
                    {order.phone ?? "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase text-brand-text-medium">
                    {dict.shippingTo}
                  </dt>
                  <dd className="mt-0.5 whitespace-pre-line text-brand-text-high">
                    {addressLines.join("\n")}
                  </dd>
                </div>
              </dl>
              <div className="mt-6 rounded-xl border border-brand-border bg-brand-bg-card p-4">
                <div className="flex gap-3">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-accent text-white"
                    aria-hidden
                  >
                    <Info className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="font-heading text-sm font-bold uppercase tracking-tight text-brand-text-high">
                      {dict.whatsNextTitle}
                    </h3>
                    <p className="mt-2 text-sm text-brand-text-medium">
                      {dict.whatsNextBody}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          <Button
            asChild
            className="rounded-lg bg-brand-accent px-8 font-medium uppercase text-white hover:bg-brand-accent-hover"
          >
            <Link href={`${basePath}/shop`}>{dict.backToShop}</Link>
          </Button>
          <p className="text-sm text-brand-text-medium">
            {dict.needHelp}{" "}
            <a
              href={`mailto:${dict.supportEmail}`}
              className="text-brand-accent hover:underline"
            >
              {dict.supportEmail}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function ThankYouLineItem({
  item,
  formatPrice,
}: Readonly<{
  item: OrderConfirmationPayload["items"][number];
  formatPrice: (amount: number) => string;
}>) {
  const lineTotal = item.unitPrice * item.quantity;
  return (
    <li className="flex gap-3">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-brand-border bg-brand-bg-card">
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
