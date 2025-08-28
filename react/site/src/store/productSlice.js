import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl, fileUrl } from "../main";

export const getProduct = createAsyncThunk("getProduct", async (id) => {
  const res = await axios.get(`${backendUrl}product/show/${id}`);
  return res.data;
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    productId: null,
    product: {},
    getProductLoading: false,
  },
  reducers: {
    setProductId: (state, action) => {
      state.productId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        console.log("loading...");
        state.getProductLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        console.log(action.payload);
        state.getProductLoading = false;
        action.payload.product.images.map((image) => {
          image.image = `${fileUrl}${image.image}`;
        });
        action.payload.product.image = `${fileUrl}${action.payload.product.image}`;
        state.product = action.payload.product;
      });
  },
});

export const { setProductId } = productSlice.actions;
export default productSlice.reducer;
