import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backendUrl } from "../main";
import axios from "axios";

export const createProduct = createAsyncThunk("createProduct", async (info) => {
  const formData = new FormData();
  formData.append("name", info.name);
  formData.append("info", info.info);
  formData.append("price", info.price);
  formData.append("image", info.image);
  formData.append("adminUsername", window.localStorage.getItem("username"));
  formData.append("adminPassword", window.localStorage.getItem("password"));

  const res = await axios.post(
    `${backendUrl}/product/create/${info.category_id}`,
    formData
  );
  return res.data;
});

export const editProduct = createAsyncThunk("editProduct", async (info) => {
  const formData = new FormData();
  formData.append("name", info.name);
  formData.append("info", info.info);
  formData.append("price", info.price);
  if (info.image) {
    formData.append("image", info.image);
  }
  formData.append("adminUsername", window.localStorage.getItem("username"));
  formData.append("adminPassword", window.localStorage.getItem("password"));

  const res = await axios.post(
    `${backendUrl}/product/edit/${info.category_id}/${info.product_id}`,
    formData
  );
  return res.data;
});

export const deleteProduct = createAsyncThunk("deleteProduct", async (info) => {
  const res = await axios.put(
    `${backendUrl}/product/delete/${info.category_id}/${info.product_id}`,
    {
      adminUsername: window.localStorage.getItem("username"),
      adminPassword: window.localStorage.getItem("password"),
    }
  );
  return res.data;
});

export const getAllProducts = createAsyncThunk(
  "getAllProducts",
  async (category_id) => {
    const res = await axios.get(`${backendUrl}/product/all/${category_id}`);
    return res.data;
  }
);

export const showProduct = createAsyncThunk("showProduct", async (info) => {
  const res = await axios.get(
    `${backendUrl}/product/show/${info.category_id}/${info.product_id}`
  );
  return res.data;
});

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productInfo: {},
    createProductLoading: false,
    editProductLoading: false,
    deleteProductLoading: false,
    getAllProductsLoading: false,
    showProductLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, () => {
        console.log("loading...");
      })
      .addCase(createProduct.fulfilled, (_, action) => {
        console.log(action.payload);
      })
      .addCase(editProduct.pending, () => {
        console.log("loading...");
      })
      .addCase(editProduct.fulfilled, (_, action) => {
        console.log(action.payload);
      })
      .addCase(deleteProduct.pending, () => {
        console.log("loading...");
      })
      .addCase(deleteProduct.fulfilled, (_, action) => {
        console.log(action.payload);
      })
      .addCase(getAllProducts.pending, () => {
        console.log("loading...");
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        console.log(action.payload);
        state.products = action.payload;
      })
      .addCase(showProduct.pending, () => {
        console.log("loading...");
      })
      .addCase(showProduct.fulfilled, (state, action) => {
        console.log(action.payload);
        state.productInfo = action.payload;
      });
  },
});

export default productSlice.reducer;
