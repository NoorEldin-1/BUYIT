import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import eventsReducer from "./eventsSlice";
import landingReducer from "./landingSlice";
import productReducer from "./productSlice";
import dialogReducer from "./dialogSlice";
import categoriesReducer from "./categoriesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventsReducer,
    landing: landingReducer,
    product: productReducer,
    dialog: dialogReducer,
    categories: categoriesReducer,
  },
});
