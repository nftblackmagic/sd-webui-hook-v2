"use client";

import { Img2imgInterface } from "@/app/type/img2img";
import { createSlice } from "@reduxjs/toolkit";

interface Img2imgState {
  url: string;
  settings: Img2imgInterface;
  status: string;
  result: any;
}

const initialState: Img2imgState = {
  url: "",
  settings: {
    init_images: [""],
    prompt: "",
    seed: -1,
    steps: 20,
    sampler_index: "Euler a",
  },
  status: "idle",
  result: {},
};

export const img2imgSlice = createSlice({
  name: "img2img",
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

export const { setUrl, setSettings, setResult, setStatus } =
  img2imgSlice.actions;

export default img2imgSlice.reducer;
