import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../main";
import { changeDialog } from "./dialogSlice";

export const getTotalCategories = createAsyncThunk(
  "category/getTotalCategories",
  async () => {
    const res = await axios.get(`${backendUrl}/category/total`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return res.data;
  }
);

export const createCategory = createAsyncThunk(
  "category/create",
  async (name, { dispatch }) => {
    const res = await axios.post(
      `${backendUrl}/category/create`,
      {
        name: name,
      },
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );
    dispatch(changeDialog("no dialog"));
    return res.data;
  }
);

export const editCategory = createAsyncThunk(
  "category/edit",
  async (info, { dispatch }) => {
    const res = await axios.put(
      `${backendUrl}/category/edit/${info.id}`,
      {
        name: info.name,
      },
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );
    dispatch(changeDialog("no dialog"));
    return res.data;
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id, { dispatch }) => {
    const res = await axios.delete(`${backendUrl}/category/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    dispatch(changeDialog("no dialog"));
    dispatch(getAllCategoriesPaginated());
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

export const getAllCategoriesPaginated = createAsyncThunk(
  "category/getAllPaginated",
  async () => {
    const res = await axios.get(`${backendUrl}/category/all/paginated`);
    return res.data;
  }
);

export const getLatestCategories = createAsyncThunk(
  "category/getLatest",
  async () => {
    const res = await axios.get(`${backendUrl}/category/all/paginated`);
    return res.data;
  }
);

export const getNextCategories = createAsyncThunk(
  "category/getNext",
  async (link) => {
    const res = await axios.get(link);
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
    totalCategories: 0,
    categories: [],
    latestCategories: [],
    categoryInfo: {},
    nextCategoriesLink: "",
    getLatestCategoriesLoading: false,
    getNextCategoriesLoading: false,
    createCategoryLoading: false,
    editCategoryLoading: false,
    deleteCategoryLoading: false,
    getAllCategoriesLoading: false,
    showCategoryLoading: false,
  },
  reducers: {
    changeCategoryInfo: (state, action) => {
      state.categoryInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTotalCategories.pending, () => {
        console.log("loading...");
      })
      .addCase(getTotalCategories.fulfilled, (state, action) => {
        console.log(action.payload);
        state.totalCategories = action.payload.total;
      })
      .addCase(getLatestCategories.pending, (state) => {
        console.log("loading...");
        state.getLatestCategoriesLoading = true;
      })
      .addCase(getLatestCategories.fulfilled, (state, action) => {
        console.log(action.payload);
        state.getLatestCategoriesLoading = false;
        state.latestCategories = action.payload.categories.data;
      })
      .addCase(createCategory.pending, (state) => {
        console.log("loading...");
        state.createCategoryLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        console.log(action.payload);
        state.createCategoryLoading = false;
        state.categories.unshift(action.payload.category);
      })
      .addCase(editCategory.pending, (state) => {
        console.log("loading...");
        state.editCategoryLoading = true;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        console.log(action.payload);
        state.editCategoryLoading = false;
        state.categories = state.categories.map((category) => {
          if (category.id === state.categoryInfo.id) {
            return action.payload.category;
          }
          return category;
        });
        state.categoryInfo = {};
      })
      .addCase(deleteCategory.pending, (state) => {
        console.log("loading...");
        state.deleteCategoryLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        console.log(action.payload);
        state.deleteCategoryLoading = false;
        state.categories = state.categories.filter(
          (category) => category.id !== state.categoryInfo.id
        );
        state.categoryInfo = {};
      })
      .addCase(getAllCategories.pending, (state) => {
        console.log("loading...");
        state.getAllCategoriesLoading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        console.log(action.payload);
        state.getAllCategoriesLoading = false;
        state.categories = action.payload.categories;
      })
      .addCase(getAllCategoriesPaginated.pending, (state) => {
        console.log("loading...");
        state.getAllCategoriesLoading = true;
      })
      .addCase(getAllCategoriesPaginated.fulfilled, (state, action) => {
        console.log(action.payload);
        state.getAllCategoriesLoading = false;
        state.categories = action.payload.categories.data;
        state.nextCategoriesLink = action.payload.categories.next_page_url;
      })
      .addCase(getNextCategories.pending, (state) => {
        console.log("loading...");
        state.getNextCategoriesLoading = true;
      })
      .addCase(getNextCategories.fulfilled, (state, action) => {
        console.log(action.payload);
        state.getNextCategoriesLoading = false;
        state.categories = [
          ...state.categories,
          ...action.payload.categories.data,
        ];
        state.nextCategoriesLink = action.payload.categories.next_page_url;
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

export const { changeCategoryInfo } = categorySlice.actions;
export default categorySlice.reducer;
