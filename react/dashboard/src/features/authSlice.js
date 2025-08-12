import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../main";

export const login = createAsyncThunk("login", async (info) => {
  const res = await axios.post(`${backendUrl}/admin/login`, {
    username: info.username,
    password: info.password,
  });
  return res.data;
});

export const edit = createAsyncThunk("edit", async (info) => {
  const res = await axios.post(
    `${backendUrl}/admin/edit/${window.localStorage.getItem(
      "username"
    )}/${window.localStorage.getItem("password")}`,
    {
      username: info.username,
      password: info.password,
    }
  );
  return res.data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loginLoading: false,
    loginErrorMsg: "",
    editLoading: false,
    editErrorMsg: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginLoading = false;
        if (action.payload.message) {
          state.loginErrorMsg = action.payload.message;
        } else {
          window.localStorage.setItem("username", action.payload.username);
          window.localStorage.setItem("password", action.payload.password);
          window.location.reload();
        }
      })
      .addCase(edit.pending, (state) => {
        state.editLoading = true;
      })
      .addCase(edit.fulfilled, (state, action) => {
        state.editLoading = false;
        if (action.payload.message) {
          state.editErrorMsg = action.payload.message;
        } else {
          window.localStorage.setItem("username", action.payload.username);
          window.localStorage.setItem("password", action.payload.password);
          window.location.reload();
        }
      });
  },
});

export default authSlice.reducer;
