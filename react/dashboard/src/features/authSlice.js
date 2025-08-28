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
  if (info.password) {
    const res = await axios.put(
      `${backendUrl}/admin/edit`,
      {
        username: info.username,
        fullName: info.fullName,
        password: info.password,
      },
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );
    return res.data;
  } else {
    const res = await axios.put(
      `${backendUrl}/admin/edit`,
      {
        username: info.username,
        fullName: info.fullName,
      },
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );
    return res.data;
  }
});

export const logout = createAsyncThunk("logout", async () => {
  const res = await axios.delete(`${backendUrl}/logout`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  });
  return res.data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loginLoading: false,
    loginErrorMsg: "",
    editLoading: false,
    editErrorMsg: "",
    logoutLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        console.log("loading...");
        state.loginLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loginLoading = false;
        if (action.payload.message) {
          state.loginErrorMsg = action.payload.message;
        } else {
          window.localStorage.setItem("token", action.payload.token);
          window.localStorage.setItem(
            "full_name",
            action.payload.user.full_name
          );
          window.localStorage.setItem("username", action.payload.user.username);
          window.location.reload();
        }
      })
      .addCase(edit.pending, (state) => {
        state.editLoading = true;
      })
      .addCase(edit.fulfilled, (state, action) => {
        state.editLoading = false;
        console.log(action.payload);

        if (action.payload.errors) {
          state.editErrorMsg = action.payload.errors.username;
        } else {
          window.localStorage.setItem("username", action.payload.user.username);
          window.localStorage.setItem(
            "full_name",
            action.payload.user.full_name
          );
          window.location.reload();
        }
      })
      .addCase(logout.pending, (state) => {
        state.logoutLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.logoutLoading = false;
        window.localStorage.clear();
        window.location.reload();
      });
  },
});

export default authSlice.reducer;
