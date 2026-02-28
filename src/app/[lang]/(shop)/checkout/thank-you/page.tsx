import { ThankYouPage } from "@/features/checkout/ThankYouPage";
import type { LandingDict } from "@/features/landing/types";
import { getDictionary } from "@/lib/dictionary";

export default async function ThankYouRoute({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = (await getDictionary(lang)) as unknown as LandingDict;

  if (!dict.orderThankYou) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p className="text-brand-text-medium">Thank you page is not available.</p>
      </div>
    );
  }

  return <ThankYouPage lang={lang} dict={dict.orderThankYou} />;
}
