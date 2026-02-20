import "server-only";

const dictionaries: Record<string, () => Promise<Record<string, unknown>>> = {
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
  vi: () => import("@/dictionaries/vi.json").then((m) => m.default),
};

export async function getDictionary(lang: string) {
  const load = dictionaries[lang] ?? dictionaries.en;
  return load();
}
