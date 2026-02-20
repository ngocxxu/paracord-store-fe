"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { SectionWrapper } from "./SectionWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { LandingDict } from "./types";

interface NewsletterSectionProps {
  dict: LandingDict["newsletter"];
}

export function NewsletterSection({ dict }: NewsletterSectionProps) {
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

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
        <form onSubmit={handleSubmit} className="mt-6">
          <label htmlFor="newsletter-email" className="sr-only">
            {dict.placeholder}
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              id="newsletter-email"
              type="email"
              placeholder={dict.placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 border-brand-border bg-brand-bg-card text-brand-text-high placeholder:text-brand-text-medium"
              aria-label={dict.placeholder}
            />
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
