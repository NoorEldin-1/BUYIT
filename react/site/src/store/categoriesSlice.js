import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backendUrl, fileUrl } from "../main";
import axios from "axios";

export const getAllCategories = createAsyncThunk(
  "getAllCategories",
  async () => {
    const res = await axios.get(`${backendUrl}category/all`);
    return res.data;
  }
);

export const getCategoryProducts = createAsyncThunk(
  "getCategoryProducts",
  async (id) => {
    const res = await axios.get(`${backendUrl}product/category/${id}`);
    return res.data;
  }
);

export const getSearchCategoryProducts = createAsyncThunk(
  "getSearchCategoryProducts",
  async ({ id, search }) => {
    const res = await axios.get(`${backendUrl}product/search/category/${id}`, {
      params: { search },
    });
    return res.data;
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    categoryInfo: {},
    categoryProducts: [],
    getCategoryProductsLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
      })
      .addCase(getCategoryProducts.pending, (state) => {
        state.getCategoryProductsLoading = true;
      })
      .addCase(getCategoryProducts.fulfilled, (state, action) => {
        state.getCategoryProductsLoading = false;
        action.payload.products.map((product) => {
          product.image = `${fileUrl}${product.image}`;
        });
        state.categoryProducts = action.payload.products;
      })
      .addCase(getSearchCategoryProducts.pending, (state) => {
        state.getCategoryProductsLoading = true;
      })
      .addCase(getSearchCategoryProducts.fulfilled, (state, action) => {
        state.getCategoryProductsLoading = false;
        action.payload.products.map((product) => {
          product.image = `${fileUrl}${product.image}`;
        });
        state.categoryProducts = action.payload.products;
      });
  },
});

export default categoriesSlice.reducer;
