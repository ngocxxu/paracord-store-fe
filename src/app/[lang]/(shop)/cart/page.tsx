import { CartPage } from "@/features/cart/CartPage";
import type { LandingDict } from "@/features/landing/types";
import { getDictionary } from "@/lib/dictionary";

export default async function CartRoute({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = (await getDictionary(lang)) as unknown as LandingDict;

  if (!dict.cart) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p className="text-brand-text-medium">Cart content is not available.</p>
      </div>
    );
  }

  return <CartPage lang={lang} dict={dict.cart} />;
}
