import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import categorySlice from "./features/categorySlice";
import productSlice from "./features/productSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    category: categorySlice,
    product: productSlice,
  },
});
