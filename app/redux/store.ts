"use client";

import { configureStore } from "@reduxjs/toolkit";
import Txt2imgSlice from "./Features/Txt2imgState/Txt2imgSlice";
import Img2imgSlice from "./Features/Img2imgState/Img2imgSlice";
import ExtraSlice from "./Features/ExtraState/ExtraSlice";
import GeneratedSlice from "./Features/GeneratedState/GeneratedSlice";
import ServerSlice from "./Features/Server/ServerSlice";

export const store = configureStore({
  reducer: {
    txt2img: Txt2imgSlice,
    img2img: Img2imgSlice,
    extra: ExtraSlice,
    generated: GeneratedSlice,
    server: ServerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
