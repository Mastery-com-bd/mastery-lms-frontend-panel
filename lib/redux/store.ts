import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart-slice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {cart: CartState}
export type AppDispatch = typeof store.dispatch;