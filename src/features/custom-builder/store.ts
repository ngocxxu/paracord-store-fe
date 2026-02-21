import { create } from "zustand";
import type { BuilderModel } from "./types";
import { BASE_PRICE, BRACELET_WEAVE_IDS, CUSTOMIZATION_PRICE, KEYCHAIN_WEAVE_IDS } from "./data";

interface BuilderStore {
  model: BuilderModel | null;
  weaveType: string | null;
  sizeId: string;
  customSizeValue: string;
  buckleId: string;
  innerCoreColorId: string;
  outerEdgeColorId: string;
  setModel: (model: BuilderModel | null) => void;
  setWeaveType: (id: string | null) => void;
  setSizeId: (id: string) => void;
  setCustomSizeValue: (value: string) => void;
  setBuckleId: (id: string) => void;
  setInnerCoreColorId: (id: string) => void;
  setOuterEdgeColorId: (id: string) => void;
  getTotalPrice: () => number;
}

const defaultBuckle = "stainless";
const defaultInner = "black";
const defaultOuter = "green";

export const useBuilderStore = create<BuilderStore>((set, get) => ({
  model: null,
  weaveType: null,
  sizeId: "m",
  customSizeValue: "",
  buckleId: defaultBuckle,
  innerCoreColorId: defaultInner,
  outerEdgeColorId: defaultOuter,
  setModel: (model) => {
    const current = get().weaveType;
    const weaveType =
      model === "bracelet"
        ? (current && BRACELET_WEAVE_IDS.includes(current) ? current : "cobra")
        : model === "keychain"
          ? (current && KEYCHAIN_WEAVE_IDS.includes(current) ? current : null)
          : null;
    set({ model, weaveType });
  },
  setWeaveType: (weaveType) => set({ weaveType }),
  setSizeId: (sizeId) => set({ sizeId }),
  setCustomSizeValue: (customSizeValue) => set({ customSizeValue }),
  setBuckleId: (buckleId) => set({ buckleId }),
  setInnerCoreColorId: (innerCoreColorId) => set({ innerCoreColorId }),
  setOuterEdgeColorId: (outerEdgeColorId) => set({ outerEdgeColorId }),
  getTotalPrice: () => {
    const s = get();
    if (!s.model && !s.weaveType) return 0;
    return BASE_PRICE + CUSTOMIZATION_PRICE;
  },
}));

export function buildConfigSummary(
  weaveLabel: string,
  innerLabel: string,
  outerLabel: string,
  buckleLabel: string,
  sizeLabel?: string
): string {
  const parts: string[] = [];
  if (weaveLabel) parts.push(`Style: ${weaveLabel}`);
  if (innerLabel) parts.push(`Inner: ${innerLabel}`);
  if (outerLabel) parts.push(`Outer: ${outerLabel}`);
  if (buckleLabel) parts.push(`Buckle: ${buckleLabel}`);
  if (sizeLabel) parts.push(`Size: ${sizeLabel}`);
  return parts.join(" | ") || "";
}
