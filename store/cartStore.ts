import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type { CartType } from "@/types";

type State = {
  carts: CartType[];
};

type Actions = {
  addToCart: (product: CartType) => void;
  // updateCart: (productId: number, itemId: number, quantity: number) => void;
  // removeFromCart: (productId: number, itemId: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
};

const initialState: State = {
  carts: [],
};

const useCartStore = create<State & Actions>()(
  immer((set, get) => ({
    ...initialState,
    addToCart: (product) => {
      set((state) => {
        // check product in the cart
        const existingCartIndex = state.carts.findIndex(
          (cart) => cart.id === product.id,
        );
        if (existingCartIndex > -1) {
          // if product exists, update the quantity of the exisiting cart
          product.items.forEach((item) => {
            const existingItemIndex = state.carts[
              existingCartIndex
            ].items.findIndex(
              (existingItem) =>
                existingItem.color === item.color &&
                existingItem.size === item.size,
            );

            if (existingItemIndex > -1) {
              // if item exists, update quantity
              state.carts[existingCartIndex].items[
                existingItemIndex
              ].quantity += item.quantity;
            } else state.carts[existingCartIndex].items.push(item); // if item not exist, add to product
          });
        } else state.carts.push(product);
      });
    },
    getTotalItems: () => {
      const { carts } = get();
      return carts.reduce(
        (total, cart) =>
          total + cart.items.reduce((total, item) => total + item.quantity, 0),
        0,
      );
    },
    clearCart: () => set({ carts: [] }),
    getTotalPrice: () => {
      const { carts } = get();
      return carts.reduce(
        (total, cart) =>
          total +
          cart.items.reduce(
            (itemTotal, item) => itemTotal + item.quantity * cart.price,
            0,
          ),
        0,
      );
    },
  })),
);

export default useCartStore;
