import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../main";
import { changeDialog } from "./dialogSlice";

export const getTotalUsers = createAsyncThunk(
  "user/getTotalUsers",
  async () => {
    const res = await axios.get(`${backendUrl}/user/total`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return res.data;
  }
);

export const getLatestUsers = createAsyncThunk(
  "user/getLatestUsers",
  async () => {
    const res = await axios.get(`${backendUrl}/user/latest`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return res.data;
  }
);

export const getAllUsers = createAsyncThunk("user/getAllUsers", async () => {
  const res = await axios.get(`${backendUrl}/user/all`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  });
  return res.data;
});

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, { dispatch }) => {
    const res = await axios.delete(`${backendUrl}/user/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    dispatch(changeDialog("no dialog"));
    return res.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    totalUsers: 0,
    users: [],
    latestUsers: [],
    userInfo: {},
    deleteUserLoading: false,
    getAllUsersLoading: false,
    latestUsersLoading: false,
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTotalUsers.pending, () => {})
      .addCase(getTotalUsers.fulfilled, (state, action) => {
        state.totalUsers = action.payload.total;
      })
      .addCase(getLatestUsers.pending, (state) => {
        state.latestUsersLoading = true;
      })
      .addCase(getLatestUsers.fulfilled, (state, action) => {
        state.latestUsersLoading = false;
        state.latestUsers = action.payload.users;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.getAllUsersLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.getAllUsersLoading = false;
        state.users = action.payload.users;
      })
      .addCase(deleteUser.pending, (state) => {
        state.deleteUserLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.deleteUserLoading = false;
        state.users = state.users.filter(
          (user) => user.id !== state.userInfo.id
        );
        state.userInfo = {};
      });
  },
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
