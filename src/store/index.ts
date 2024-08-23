import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./reducer/homeSlice";
import authReducer from "./reducer/authSlice";

export const store = configureStore({
  reducer: {
    home: homeReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
