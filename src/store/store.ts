import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { whatsappReducer } from "./whatsappSlice";

export const store = configureStore({
  reducer: {
    whatsapp: whatsappReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
