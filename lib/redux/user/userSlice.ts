import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { googleSignIn, userSession } from "./thunk";
import { IUser } from "./types";
import { constant } from "@/config/constant";
import _localStorage from "@/utils/_localStorage";

export const STATUS = {
  IDLE: "idle",
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};

interface UserState {
  loginStatus: string;
  user: IUser | null;
}

const initialState: UserState = {
  loginStatus: STATUS.IDLE,
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      _localStorage.remove(constant.localStorageKeys.authKey);
      state.loginStatus = STATUS.IDLE;
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(googleSignIn.pending, (state) => {
      state.loginStatus = STATUS.PENDING;
    });
    builder.addCase(googleSignIn.fulfilled, (state, action) => {
      if (action.payload) {
        const access_token = action.payload.access_token;
        _localStorage.set(constant.localStorageKeys.authKey, access_token);
        state.user = action.payload.user;
      }
      state.loginStatus = STATUS.FULFILLED;
    });
    builder.addCase(googleSignIn.rejected, (state) => {
      state.loginStatus = STATUS.REJECTED;
    });
    //session
    builder.addCase(userSession.pending, (state) => {
      state.loginStatus = STATUS.PENDING;
    });
    builder.addCase(userSession.fulfilled, (state, action) => {
      if (action.payload) {
        const access_token = action.payload.access_token;
        _localStorage.set(constant.localStorageKeys.authKey, access_token);
        state.user = action.payload.user;
      }
      state.loginStatus = STATUS.FULFILLED;
    });
    builder.addCase(userSession.rejected, (state) => {
      state.loginStatus = STATUS.REJECTED;
    });
  },
});

export const { logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.userSlice;

export default userSlice.reducer;
