import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface UserState {
  _id: string;
}

const initialState: UserState = {
  _id: "6728bd60086d85311afdddfb",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state._id = action.payload._id;
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.userSlice;

export default userSlice.reducer;
