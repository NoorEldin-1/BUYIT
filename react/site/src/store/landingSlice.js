import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl, fileUrl } from "../main";

export const getAllProducts = createAsyncThunk("getAllProducts", async () => {
  const res = await axios.get(`${backendUrl}landing`);
  return res.data;
});

const landingSlice = createSlice({
  name: "landing",
  initialState: {
    products: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      console.log(action.payload.products);
      action.payload.products.map((product) => {
        product.products.map((product) => {
          product.image = `${fileUrl}${product.image}`;
        });
      });
      state.products = action.payload.products;
    });
  },
});

export default landingSlice.reducer;
