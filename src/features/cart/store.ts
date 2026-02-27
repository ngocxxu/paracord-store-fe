import { create } from "zustand";
import type { CartItem, AddItemPayload } from "./types";

function makeItemId(payload: AddItemPayload): string {
  const key = `${payload.type}:${payload.productId}:${payload.optionsSummary}`;
  let h = 0;
  for (let i = 0; i < key.length; i++) {
    const c = key.codePointAt(i) ?? 0;
    h = (h << 5) - h + c;
    h = Math.trunc(h);
  }
  return `cart-${h}`;
}

interface CartState {
  items: CartItem[];
  addItem: (payload: AddItemPayload) => void;
  setQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (payload) => {
    const id = makeItemId(payload);
    const qty = payload.quantity ?? 1;
    set((state) => {
      const existing = state.items.find((i) => i.id === id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + qty } : i
          ),
        };
      }
      const item: CartItem = {
        id,
        ...payload,
        quantity: qty,
      };
      return { items: [...state.items, item] };
    });
  },
  setQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, quantity } : i
      ),
    }));
  },
  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    }));
  },
  clear: () => set({ items: [] }),
}));

export function getSubtotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
}
