import { createSlice } from "@reduxjs/toolkit";

export const serverSlice = createSlice({
  name: "server",
  initialState: {
    options: {},
  },
  reducers: {
    setOptions: (state, action) => {
      state.options = action.payload;
    },
  },
});

export const { setOptions } = serverSlice.actions;

export default serverSlice.reducer;
