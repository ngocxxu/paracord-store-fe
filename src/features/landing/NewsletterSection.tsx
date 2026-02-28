"use client";

import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Mail } from "lucide-react";
import { SectionWrapper } from "./SectionWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { newsletterSchema } from "@/lib/validations/newsletter";
import type { LandingDict } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";

interface NewsletterSectionProps {
  readonly dict: LandingDict["newsletter"];
}

export function NewsletterSection({ dict }: NewsletterSectionProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newsletterSchema(dict.validation)),
    defaultValues: { email: "" },
  });

  const onSubmit = useCallback(() => {}, []);

  return (
    <SectionWrapper variant="surface" ariaLabel={dict.headline}>
      <div className="mx-auto max-w-lg text-center">
        <Mail
          className="mx-auto mb-4 h-12 w-12 text-brand-accent"
          aria-hidden
        />
        <h2 className="text-2xl font-heading font-bold uppercase tracking-tight text-brand-text-high">
          {dict.headline}
        </h2>
        <p className="mt-2 text-brand-text-medium">{dict.description}</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <label htmlFor="newsletter-email" className="sr-only">
            {dict.placeholder}
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex-1">
              <Input
                id="newsletter-email"
                type="email"
                placeholder={dict.placeholder}
                {...register("email")}
                className="w-full border-brand-border bg-brand-bg-card text-brand-text-high placeholder:text-brand-text-medium"
                aria-label={dict.placeholder}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "newsletter-email-error" : undefined}
              />
              {errors.email && (
                <p id="newsletter-email-error" className="mt-1.5 text-xs text-red-600" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="bg-brand-text-high text-brand-bg-primary hover:bg-brand-text-medium"
            >
              {dict.submit}
            </Button>
          </div>
          <p className="mt-3 text-xs text-brand-text-medium">
            {dict.privacyNote}
          </p>
        </form>
      </div>
    </SectionWrapper>
  );
}
