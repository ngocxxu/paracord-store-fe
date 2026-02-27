"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthPageLayout } from "@/features/auth/AuthPageLayout";
import { GoogleIcon } from "@/features/auth/GoogleIcon";
import type { SignInDict } from "@/features/auth/types";
import { cn } from "@/lib/utils";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const inputClassName =
  "border-brand-border bg-brand-bg-card text-brand-text-high placeholder:text-brand-text-medium focus-visible:ring-brand-accent";

export function SignInPage({
  lang,
  dict,
}: Readonly<{ lang: string; dict: SignInDict }>) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const base = `/${lang}`;

  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (typeof globalThis !== "undefined" && "localStorage" in globalThis && email) {
      globalThis.localStorage.setItem("authEmail", email);
    }

    router.push(base);
  }

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
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="signin-email"
              className="block text-xs font-medium uppercase tracking-wide text-brand-text-medium"
            >
              {dict.emailLabel}
            </label>
            <div className="mt-1.5 flex items-center rounded-md border border-brand-border bg-brand-bg-card">
              <span className="pl-3 text-brand-text-medium">
                <Mail className="h-4 w-4" aria-hidden />
              </span>
              <Input
                id="signin-email"
                type="email"
                placeholder={dict.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn(
                  "border-0 bg-transparent focus-visible:ring-1 focus-visible:ring-inset",
                  inputClassName
                )}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="signin-password"
              className="block text-xs font-medium uppercase tracking-wide text-brand-text-medium"
            >
              {dict.passwordLabel}
            </label>
            <div className="mt-1.5 flex items-center rounded-md border border-brand-border bg-brand-bg-card">
              <span className="pl-3 text-brand-text-medium">
                <Lock className="h-4 w-4" aria-hidden />
              </span>
              <Input
                id="signin-password"
                type="password"
                placeholder={dict.passwordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={cn(
                  "border-0 bg-transparent focus-visible:ring-1 focus-visible:ring-inset",
                  inputClassName
                )}
              />
            </div>
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
        <div className="mt-6 flex flex-col gap-2 text-center text-sm">
          <Link
            href="#"
            className="text-brand-text-medium hover:text-brand-accent hover:underline"
          >
            {dict.forgotPassword}
          </Link>
          <p className="text-brand-text-medium">
            {dict.newUser}{" "}
            <Link
              href={`${base}/signup`}
              className="font-medium text-brand-accent hover:underline"
            >
              {dict.createAccount}
            </Link>
          </p>
        </div>
      </div>
    </AuthPageLayout>
  );
}
