import { CheckoutPage } from "@/features/checkout/CheckoutPage";
import type { LandingDict } from "@/features/landing/types";
import { getDictionary } from "@/lib/dictionary";

export default async function CheckoutRoute({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = (await getDictionary(lang)) as unknown as LandingDict;

  if (!dict.checkout) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p className="text-brand-text-medium">Checkout is not available.</p>
      </div>
    );
  }

  return <CheckoutPage lang={lang} dict={dict.checkout} />;
}
