"use client";

import Link from "next/link";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { LandingDict } from "@/features/landing/types";

interface TrackOrderPageProps {
  readonly dict: LandingDict["trackOrder"];
  readonly lang: string;
}

type StepState = "completed" | "current" | "upcoming";

interface StatusStep {
  readonly key: keyof LandingDict["trackOrder"]["statuses"];
  readonly label: string;
  readonly state: StepState;
}

export function TrackOrderPage({ dict, lang }: Readonly<TrackOrderPageProps>) {
  const steps: StatusStep[] = [
    {
      key: "confirmed",
      label: dict.statuses.confirmed,
      state: "completed",
    },
    {
      key: "inProduction",
      label: dict.statuses.inProduction,
      state: "current",
    },
    {
      key: "shipped",
      label: dict.statuses.shipped,
      state: "upcoming",
    },
    {
      key: "delivered",
      label: dict.statuses.delivered,
      state: "upcoming",
    },
  ];

  const handleSubmit = useCallback((event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
  }, []);

  const basePath = `/${lang}`;

  return (
    <section className="min-h-[calc(100vh-3.5rem)] bg-brand-bg-primary">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-heading font-bold uppercase tracking-tight text-brand-text-high md:text-5xl">
            {dict.title}
          </h1>
          <p className="mt-4 text-brand-text-medium md:text-lg">
            {dict.subtitle}
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-end"
            aria-label={dict.title}
          >
            <div className="flex-1 text-left">
              <label
                htmlFor="track-order-phone"
                className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-brand-text-medium"
              >
                {dict.phoneLabel}
              </label>
              <Input
                id="track-order-phone"
                type="tel"
                placeholder={dict.phonePlaceholder}
                className="mt-2 h-12 rounded-md border border-brand-border bg-brand-bg-card text-brand-text-high placeholder:text-brand-text-medium"
                aria-label={dict.phoneLabel}
              />
            </div>

            <Button
              type="submit"
              className="h-12 w-full rounded-md bg-brand-accent px-10 text-sm font-semibold uppercase tracking-[0.2em] text-brand-text-high shadow-card hover:bg-brand-accent-hover sm:w-auto"
              aria-label={dict.trackCta}
            >
              {dict.trackCta}
            </Button>
          </form>
        </div>

        <Card className="mx-auto mt-12 max-w-3xl rounded-2xl border border-brand-border bg-brand-bg-surface shadow-card">
          <div className="flex flex-col gap-4 border-b border-brand-border/60 px-6 py-5 md:flex-row md:items-start md:justify-between md:px-8">
            <div>
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-brand-text-medium">
                {dict.orderIdLabel}
              </p>
              <p className="mt-2 text-lg font-semibold text-brand-text-high">
                {dict.exampleOrder.id}
              </p>
            </div>
            <div className="text-left md:text-right">
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-brand-text-medium">
                {dict.currentStatusLabel}
              </p>
              <div className="mt-2 inline-flex items-center rounded-full border border-brand-accent bg-brand-accent/10 px-3 py-1">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-accent">
                  {dict.statuses.inProduction}
                </span>
              </div>
            </div>
          </div>

          <div
            className="border-b border-brand-border/60 px-4 py-6 md:px-8"
            aria-label={dict.currentStatusLabel}
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
              <div className="flex flex-1 items-center justify-between gap-3">
                {steps.map((step, index) => (
                  <div
                    key={step.key}
                    className="flex flex-1 flex-col items-center gap-3"
                  >
                    <div className="flex w-full items-center">
                      {index > 0 && (
                        <div className="h-[2px] flex-1 bg-brand-bg-card/80" />
                      )}
                      <StatusIcon state={step.state} />
                      {index < steps.length - 1 && (
                        <div className="h-[2px] flex-1 bg-brand-bg-card/80" />
                      )}
                    </div>
                    <span className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-brand-text-medium">
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-brand-bg-card/40 px-6 py-6 md:px-8">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-brand-text-medium">
              {dict.orderSummaryLabel}
            </p>

            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-md bg-gradient-to-br from-brand-accent to-brand-olive shadow-card" />
                <div>
                  <p className="text-sm font-semibold text-brand-text-high">
                    {dict.exampleOrder.productTitle}
                  </p>
                  <p className="mt-1 text-xs text-brand-text-medium">
                    {dict.exampleOrder.productSubtitle}
                  </p>
                </div>
              </div>
              <div className="text-right text-xs text-brand-text-medium">
                <p>{dict.exampleOrder.priceLabel}</p>
                <p className="mt-1">{dict.exampleOrder.quantityLabel}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 border-t border-brand-border/60 pt-4 text-xs text-brand-text-medium md:flex-row md:items-center md:justify-between">
              <div>
                <p className="uppercase tracking-[0.16em]">
                  {dict.estimatedCompletionLabel}
                </p>
                <p className="mt-1 font-medium text-brand-text-high">
                  {dict.exampleOrder.estimatedCompletion}
                </p>
              </div>
              <div className="text-left md:text-right">
                <p className="uppercase tracking-[0.16em]">
                  {dict.totalAmountLabel}
                </p>
                <p className="mt-1 text-lg font-semibold text-brand-text-high">
                  {dict.exampleOrder.totalAmount}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-8 text-center text-xs text-brand-text-medium md:text-sm">
          <p>{dict.helpText}</p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-[0.78rem] font-semibold uppercase tracking-[0.2em]">
            <Link
              href={`${basePath}/contact`}
              className="text-brand-accent hover:text-brand-accent-hover"
            >
              {dict.contactSupport}
            </Link>
            <span className="text-brand-text-medium">|</span>
            <Link
              href={`${basePath}/shipping-policy`}
              className="text-brand-accent hover:text-brand-accent-hover"
            >
              {dict.shippingPolicy}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatusIcon({ state }: Readonly<{ state: StepState }>) {
  if (state === "completed") {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-accent shadow-card">
        <div className="h-4 w-4 rounded-full bg-brand-bg-primary" />
      </div>
    );
  }

  if (state === "current") {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-accent shadow-card">
        <div className="h-4 w-4 rounded-sm bg-brand-bg-primary" />
      </div>
    );
  }

  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-border bg-brand-bg-card">
      <div className="h-3 w-3 rounded-full bg-brand-bg-primary/40" />
    </div>
  );
}

