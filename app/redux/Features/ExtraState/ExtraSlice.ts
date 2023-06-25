"use client";

import { ExtraInterface } from "@/app/type/extra";
import { createSlice } from "@reduxjs/toolkit";

interface ExtraState {
  url: string;
  settings: ExtraInterface;
  status: string;
  result: any;
}

const initialState: ExtraState = {
  url: "",
  settings: {
    upscaling_resize: 2,
    upscaler_1: "None",
    image: "",
  },
  status: "idle",
  result: {},
};

export const extraSlice = createSlice({
  name: "extra",
  initialState,
  reducers: {
    setUrl: (state, action) => {
      state.url = action.payload;
    },
    setSettings: (state, action) => {
      state.settings = action.payload;
    },
    setResult: (state, action) => {
      state.result = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setUrl, setSettings, setResult, setStatus } = extraSlice.actions;

export default extraSlice.reducer;
