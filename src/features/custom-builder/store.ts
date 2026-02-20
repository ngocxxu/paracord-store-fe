import { create } from "zustand";

interface BuilderStore {
  selectedColorIds: string[];
  setSelectedColorIds: (ids: string[]) => void;
  toggleColor: (id: string) => void;
}

export const useBuilderStore = create<BuilderStore>((set) => ({
  selectedColorIds: [],
  setSelectedColorIds: (ids) => set({ selectedColorIds: ids }),
  toggleColor: (id) =>
    set((s) => ({
      selectedColorIds: s.selectedColorIds.includes(id)
        ? s.selectedColorIds.filter((x) => x !== id)
        : [...s.selectedColorIds, id],
    })),
}));
