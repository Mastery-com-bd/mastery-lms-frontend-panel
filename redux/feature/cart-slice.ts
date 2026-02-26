import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  productImage?: string;
  quantity: number;
  stock: number;
  type: "BOOK" | "COURSE";
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Omit<CartItem, "quantity">>) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      state.totalQuantity++;

      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1,
        });
      } else {
        existingItem.quantity++;
      }

      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
    },

    removeFromCart(state, action: PayloadAction<string>) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.items = state.items.filter((item) => item.id !== id);
        state.totalAmount = state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      }
    },

    decrementQuantity(state, action: PayloadAction<string>) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.totalQuantity--;
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          existingItem.quantity--;
        }
        state.totalAmount = state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      }
    },

    incrementQuantity(state, action: PayloadAction<string>) {
      const id = action.payload;
      console.log(id);
      const existingItem = state.items.find((item) => item.id === id);
      console.log(existingItem);

      if (!existingItem) return;

      existingItem.quantity++;
      state.totalQuantity++;

      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
    },

    clearCart: () => initialState,
  },
});

export default cartSlice.reducer;
export const {
  addToCart,
  removeFromCart,
  decrementQuantity,
  incrementQuantity,
  clearCart,
} = cartSlice.actions;
export const cartItem = (state: RootState) => state.cart.items;
export const cartAmount = (state: RootState) => state.cart.totalAmount;
export const cartQuantity = (state: RootState) => state.cart.totalQuantity;
