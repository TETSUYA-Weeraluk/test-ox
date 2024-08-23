import { createSlice } from "@reduxjs/toolkit";

export interface HomeState {
  loading?: "idle" | "pending" | "succeeded" | "failed";
  error?: string;
}

const initialState: HomeState = {
  loading: "idle",
  error: "",
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
});

// export const { welcomeToHomePage } = homeSlice.actions;
export default homeSlice.reducer;
