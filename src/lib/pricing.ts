const localeMap: Record<string, string> = {
  en: "en-US",
  vi: "vi-VN",
};

export function formatPrice(amount: number, lang: string): string {
  const locale = localeMap[lang] ?? "en-US";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
