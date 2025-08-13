import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../main";

export const createCategory = createAsyncThunk(
  "category/create",
  async (name) => {
    const res = await axios.post(`${backendUrl}/category/create`, {
      adminUsername: window.localStorage.getItem("username"),
      adminPassword: window.localStorage.getItem("password"),
      name: name,
    });
    return res.data;
  }
);

export const editCategory = createAsyncThunk("category/edit", async (info) => {
  const res = await axios.put(`${backendUrl}/category/edit/${info.id}`, {
    adminUsername: window.localStorage.getItem("username"),
    adminPassword: window.localStorage.getItem("password"),
    name: info.name,
  });
  return res.data;
});

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id) => {
    const res = await axios.put(`${backendUrl}/category/delete/${id}`, {
      adminUsername: window.localStorage.getItem("username"),
      adminPassword: window.localStorage.getItem("password"),
    });
    return res.data;
  }
);

export const getAllCategories = createAsyncThunk(
  "category/getAll",
  async () => {
    const res = await axios.get(`${backendUrl}/category/all`);
    return res.data;
  }
);

export const showCategory = createAsyncThunk("category/show", async (id) => {
  const res = await axios.get(`${backendUrl}/category/show/${id}`);
  return res.data;
});

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    categoryInfo: {},
    createCategoryLoading: false,
    editCategoryLoading: false,
    deleteCategoryLoading: false,
    getAllCategoriesLoading: false,
    showCategoryLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        console.log("loading...");
        state.createCategoryLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        console.log(action.payload);
        state.createCategoryLoading = false;
      })
      .addCase(editCategory.pending, (state) => {
        console.log("loading...");
        state.editCategoryLoading = true;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        console.log(action.payload);
        state.editCategoryLoading = false;
      })
      .addCase(deleteCategory.pending, (state) => {
        console.log("loading...");
        state.deleteCategoryLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        console.log(action.payload);
        state.deleteCategoryLoading = false;
      })
      .addCase(getAllCategories.pending, (state) => {
        console.log("loading...");
        state.getAllCategoriesLoading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        console.log(action.payload);
        state.getAllCategoriesLoading = false;
        state.categories = action.payload;
      })
      .addCase(showCategory.pending, (state) => {
        console.log("loading...");
        state.showCategoryLoading = true;
      })
      .addCase(showCategory.fulfilled, (state, action) => {
        console.log(action.payload);
        state.showCategoryLoading = false;
        state.categoryInfo = action.payload;
      });
  },
});

export default categorySlice.reducer;
