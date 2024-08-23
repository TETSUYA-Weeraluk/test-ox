import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  nbf: number;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
}

export interface HomeState {
  user: User;
  loading?: "idle" | "pending" | "succeeded" | "failed";
  error?: string;
}

const initialState: HomeState = {
  user: {
    iss: "",
    azp: "",
    aud: "",
    sub: "",
    email: "",
    email_verified: false,
    nbf: 0,
    name: "",
    picture: "",
    given_name: "",
    family_name: "",
    iat: 0,
    exp: 0,
    jti: "",
  },
  loading: "idle",
  error: "",
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    addUsers: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { addUsers } = homeSlice.actions;
export default homeSlice.reducer;
