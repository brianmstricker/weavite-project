import { Product } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type CartStoreType = {
 cart: Product[];
 addToCart: (product: Product) => void;
 removeFromCart: (product: Product) => void;
 isProductInCart: (product: Product) => boolean;
};

export const CartStore = create<CartStoreType>()(
 persist(
  (set, get) => ({
   cart: [],
   addToCart: (product: Product) => set((state) => ({ cart: [...state.cart, product] })),
   removeFromCart: (product: Product) => set((state) => ({ cart: state.cart.filter((item) => item !== product) })),
   isProductInCart: (product: Product) => get().cart.some((item) => item === product),
  }),
  {
   name: "cart-store",
   storage: createJSONStorage(() => localStorage),
  }
 )
);
