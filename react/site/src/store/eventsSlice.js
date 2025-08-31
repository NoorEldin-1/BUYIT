import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl, fileUrl } from "../main";

export const getAllEvents = createAsyncThunk("getAllEvents", async () => {
  const res = await axios.get(`${backendUrl}product/events`);
  return res.data;
});

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllEvents.fulfilled, (state, action) => {
      action.payload.products.map((product) => {
        product.image = `${fileUrl}${product.image}`;
      });
      state.events = action.payload.products;
    });
  },
});

export default eventsSlice.reducer;
