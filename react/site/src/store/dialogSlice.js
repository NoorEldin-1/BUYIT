import { createSlice } from "@reduxjs/toolkit";

const dialogSlice = createSlice({
  name: "dialog",
  initialState: "no dialog",
  reducers: {
    changeDialog: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { changeDialog } = dialogSlice.actions;
export default dialogSlice.reducer;
