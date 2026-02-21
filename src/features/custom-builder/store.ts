import { create } from "zustand";
import type { BuilderModel } from "./types";
import { BASE_PRICE, CUSTOMIZATION_PRICE } from "./data";

interface BuilderStore {
  model: BuilderModel | null;
  weaveType: string | null;
  buckleId: string;
  innerCoreColorId: string;
  outerEdgeColorId: string;
  setModel: (model: BuilderModel | null) => void;
  setWeaveType: (id: string | null) => void;
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
  buckleId: defaultBuckle,
  innerCoreColorId: defaultInner,
  outerEdgeColorId: defaultOuter,
  setModel: (model) =>
    set({
      model,
      weaveType: model === "bracelet" ? get().weaveType ?? "cobra" : null,
    }),
  setWeaveType: (weaveType) => set({ weaveType }),
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
  buckleLabel: string
): string {
  const parts: string[] = [];
  if (weaveLabel) parts.push(`Style: ${weaveLabel}`);
  if (innerLabel) parts.push(`Inner: ${innerLabel}`);
  if (outerLabel) parts.push(`Outer: ${outerLabel}`);
  if (buckleLabel) parts.push(`Buckle: ${buckleLabel}`);
  return parts.join(" | ") || "";
}
