import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    whatsAppLink: "https://wa.me/+201015612380",
  },
  reducers: {
    addToCart: (state, action) => {
      if (state.cart.find((item) => item.id === action.payload.id)) {
        state.cart = state.cart.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      } else {
        state.cart.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },

    buyitOperation: (state) => {
      let message = "";
      state.cart.map((item) => {
        message += `${item.name}\n${item.price}EGP\n_________\n`;
      });
      window.open(
        `${state.whatsAppLink}?text=${encodeURIComponent(message)}`,
        "_blank"
      );
    },
  },
});

export const { addToCart, removeFromCart, buyitOperation } = cartSlice.actions;
export default cartSlice.reducer;
