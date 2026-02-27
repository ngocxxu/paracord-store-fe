import { TrackOrderPage } from "@/features/orders/TrackOrderPage";
import type { LandingDict } from "@/features/landing/types";
import { getDictionary } from "@/lib/dictionary";

export default async function TrackOrderRoute({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = (await getDictionary(lang)) as unknown as LandingDict;

  return <TrackOrderPage lang={lang} dict={dict.trackOrder} />;
}

