"use client";

import { createSlice } from "@reduxjs/toolkit";

interface ResultInfo {
  image: string;
  id: string;
}

interface GenerateState {
  results: ResultInfo[];
}

const initialState: GenerateState = {
  results: [],
};

export const generatedSlice = createSlice({
  name: "generated",
  initialState,
  reducers: {
    addResult: (state, action) => {
      state.results.push(action.payload);
    },
  },
});

export const { addResult } = generatedSlice.actions;

export default generatedSlice.reducer;
