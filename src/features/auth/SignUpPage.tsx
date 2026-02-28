"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthPageLayout } from "@/features/auth/AuthPageLayout";
import { GoogleIcon } from "@/features/auth/GoogleIcon";
import type { SignUpDict } from "@/features/auth/types";
import { signUpSchema } from "@/lib/validations/auth";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

const inputClassName =
  "border-brand-border bg-brand-bg-card text-brand-text-high placeholder:text-brand-text-medium focus-visible:ring-brand-accent";

export function SignUpPage({
  lang,
  dict,
}: Readonly<{ lang: string; dict: SignUpDict }>) {
  const base = `/${lang}`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema(dict.validation)),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = useCallback(() => {}, []);

  return (
    <AuthPageLayout
      backToHome={dict.backToHome}
      backHref={base}
      footerTagline={dict.footerTagline}
    >
      <div className="w-full max-w-md rounded-2xl border border-brand-border bg-brand-bg-surface p-6 shadow-card md:p-8">
        <h1 className="text-2xl font-heading font-bold uppercase tracking-tight text-brand-text-high md:text-3xl">
          {dict.title}
        </h1>
        <p className="mt-2 text-sm text-brand-text-medium">{dict.subtitle}</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="signup-email"
              className="block text-xs font-medium uppercase tracking-wide text-brand-text-medium"
            >
              {dict.emailLabel}
            </label>
            <div className="mt-1.5 flex items-center rounded-md border border-brand-border bg-brand-bg-card">
              <span className="pl-3 text-brand-text-medium">
                <Mail className="h-4 w-4" aria-hidden />
              </span>
              <Input
                id="signup-email"
                type="email"
                placeholder={dict.emailPlaceholder}
                {...register("email")}
                className={cn(
                  "border-0 bg-transparent focus-visible:ring-1 focus-visible:ring-inset",
                  inputClassName
                )}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "signup-email-error" : undefined}
              />
            </div>
            {errors.email && (
              <p id="signup-email-error" className="mt-1.5 text-xs text-red-600" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="signup-password"
              className="block text-xs font-medium uppercase tracking-wide text-brand-text-medium"
            >
              {dict.passwordLabel}
            </label>
            <div className="mt-1.5 flex items-center rounded-md border border-brand-border bg-brand-bg-card">
              <span className="pl-3 text-brand-text-medium">
                <Lock className="h-4 w-4" aria-hidden />
              </span>
              <Input
                id="signup-password"
                type="password"
                placeholder={dict.passwordPlaceholder}
                {...register("password")}
                className={cn(
                  "border-0 bg-transparent focus-visible:ring-1 focus-visible:ring-inset",
                  inputClassName
                )}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? "signup-password-error" : undefined}
              />
            </div>
            {errors.password && (
              <p id="signup-password-error" className="mt-1.5 text-xs text-red-600" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="signup-confirm"
              className="block text-xs font-medium uppercase tracking-wide text-brand-text-medium"
            >
              {dict.confirmPasswordLabel}
            </label>
            <div className="mt-1.5 flex items-center rounded-md border border-brand-border bg-brand-bg-card">
              <span className="pl-3 text-brand-text-medium">
                <Lock className="h-4 w-4" aria-hidden />
              </span>
              <Input
                id="signup-confirm"
                type="password"
                placeholder={dict.confirmPasswordPlaceholder}
                {...register("confirmPassword")}
                className={cn(
                  "border-0 bg-transparent focus-visible:ring-1 focus-visible:ring-inset",
                  inputClassName
                )}
                aria-invalid={Boolean(errors.confirmPassword)}
                aria-describedby={errors.confirmPassword ? "signup-confirm-error" : undefined}
              />
            </div>
            {errors.confirmPassword && (
              <p id="signup-confirm-error" className="mt-1.5 text-xs text-red-600" role="alert">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-brand-accent hover:bg-brand-accent-hover text-white"
          >
            {dict.submit}
          </Button>
        </form>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-brand-border" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-brand-bg-surface px-3 text-xs uppercase tracking-wide text-brand-text-medium">
              {dict.or}
            </span>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          className="w-full border-brand-border bg-white text-brand-bg-primary hover:bg-brand-bg-card hover:text-brand-text-high"
        >
          <GoogleIcon className="h-4 w-4" />
          {dict.continueWithGoogle}
        </Button>
        <p className="mt-6 text-center text-sm text-brand-text-medium">
          {dict.alreadyHaveAccount}{" "}
          <Link
            href={`${base}/signin`}
            className="font-medium text-brand-accent hover:underline"
          >
            {dict.signIn}
          </Link>
        </p>
      </div>
    </AuthPageLayout>
  );
}
