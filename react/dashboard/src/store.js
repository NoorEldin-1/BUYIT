import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import categorySlice from "./features/categorySlice";
import dialogSlice from "./features/dialogSlice";
import productSlice from "./features/productSlice";
import userSlice from "./features/userSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    category: categorySlice,
    product: productSlice,
    user: userSlice,
    dialog: dialogSlice,
  },
});
