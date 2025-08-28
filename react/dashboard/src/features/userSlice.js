import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../main";

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

export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  const res = await axios.delete(`${backendUrl}/user/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  });
  return res.data;
});

export const getUserSaves = createAsyncThunk(
  "user/getUserSaves",
  async (id) => {
    const res = await axios.get(
      `${backendUrl}/user/saves/${id}/${window.localStorage.getItem(
        "username"
      )}/${window.localStorage.getItem("password")}`
    );
    return res.data;
  }
);

export const deleteUserSave = createAsyncThunk(
  "user/deleteUserSave",
  async (info) => {
    const res = await axios.delete(
      `${backendUrl}/user/deleteSave/${info.user_id}/${
        info.product_id
      }/${window.localStorage.getItem(
        "username"
      )}/${window.localStorage.getItem("password")}`
    );
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
    saves: [],
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTotalUsers.pending, () => {
        console.log("loading...");
      })
      .addCase(getTotalUsers.fulfilled, (state, action) => {
        console.log(action.payload);
        state.totalUsers = action.payload.total;
      })
      .addCase(getLatestUsers.pending, (state) => {
        console.log("loading...");
        state.latestUsersLoading = true;
      })
      .addCase(getLatestUsers.fulfilled, (state, action) => {
        console.log(action.payload);
        state.latestUsersLoading = false;
        state.latestUsers = action.payload.users;
      })
      .addCase(getAllUsers.pending, (state) => {
        console.log("loading...");
        state.getAllUsersLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        console.log(action.payload);
        state.getAllUsersLoading = false;
        state.users = action.payload.users;
      })
      .addCase(deleteUser.pending, (state) => {
        console.log("loading...");
        state.deleteUserLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.deleteUserLoading = false;
        state.users = state.users.filter(
          (user) => user.id !== state.userInfo.id
        );
        state.userInfo = {};
      })
      .addCase(getUserSaves.pending, () => {
        console.log("loading...");
      })
      .addCase(getUserSaves.fulfilled, (state, action) => {
        console.log(action.payload);
        state.saves = action.payload;
      })
      .addCase(deleteUserSave.pending, () => {
        console.log("loading...");
      })
      .addCase(deleteUserSave.fulfilled, (_, action) => {
        console.log(action.payload);
      });
  },
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
