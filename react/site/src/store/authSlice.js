import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../main";

export const login = createAsyncThunk("auth/login", async () => {
  const res = await axios.get(`${backendUrl}auth/google/redirect`);
  return res.data;
});

export const logout = createAsyncThunk("auth/logout", async () => {
  const res = await axios.delete(`${backendUrl}logout`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  });
  return res.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loginLoading: false,
    logoutLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginLoading = false;
        window.location.href = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.logoutLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.logoutLoading = false;
        window.localStorage.clear();
        window.location.href = "/";
      });
  },
});

export default authSlice.reducer;
