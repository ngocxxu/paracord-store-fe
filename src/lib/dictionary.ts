import "server-only";
import { cache } from "react";

const dictionaries: Record<string, () => Promise<Record<string, unknown>>> = {
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
  vi: () => import("@/dictionaries/vi.json").then((m) => m.default),
};

export const getDictionary = cache(async (lang: string) => {
  const load = dictionaries[lang] ?? dictionaries.en;
  return load();
});
