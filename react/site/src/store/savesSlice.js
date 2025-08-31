import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl, fileUrl } from "../main";

export const allSaves = createAsyncThunk("allSaves", async () => {
  if (!window.localStorage.getItem("token")) {
    window.localStorage.clear();
    return;
  }
  const res = await axios.get(`${backendUrl}save/all`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  });
  return res.data;
});

export const toggleSave = createAsyncThunk("toggleSave", async (product_id) => {
  const res = await axios.post(
    `${backendUrl}save/toggle/${product_id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    }
  );
  return res.data;
});

const savesSlice = createSlice({
  name: "saves",
  initialState: {
    saves: [],
    saveId: null,
    toggleSaveLoading: false,
  },
  reducers: {
    setSaveId: (state, action) => {
      state.saveId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allSaves.fulfilled, (state, action) => {
        if (!action.payload) {
          return;
        }
        action.payload.saves.map((save) => {
          save.product.image = `${fileUrl}${save.product.image}`;
        });
        state.saves = action.payload.saves;
      })
      .addCase(allSaves.rejected, () => {
        window.localStorage.clear();
        window.location.href = "/";
      })
      .addCase(toggleSave.pending, (state) => {
        state.toggleSaveLoading = true;
      })
      .addCase(toggleSave.fulfilled, (state, action) => {
        state.toggleSaveLoading = false;
        if (action.payload.message === "saved deleted") {
          state.saves = state.saves.filter(
            (save) => save.product.id !== state.saveId
          );
        } else if (action.payload.save) {
          state.saves.unshift(action.payload.save);
        }
      })
      .addCase(toggleSave.rejected, () => {
        window.localStorage.clear();
        window.location.href = "/";
      });
  },
});

export const { setSaveId } = savesSlice.actions;
export default savesSlice.reducer;
