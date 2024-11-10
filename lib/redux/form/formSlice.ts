import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { getActiveForm } from "./thunk";
import { IForm } from "./types";

interface FormState {
  form: IForm | null;
  getAsyncStatus: string;
}

export const STATUS = {
  IDLE: "idle",
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};

const initialState: FormState = {
  form: null,
  getAsyncStatus: STATUS.IDLE,
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormName: () => {},
  },
  extraReducers: (builder) => {
    builder.addCase(getActiveForm.pending, (state) => {
      state.getAsyncStatus = STATUS.PENDING;
    });
    builder.addCase(getActiveForm.fulfilled, (state, action) => {
      if (action.payload) state.form = action.payload.data;
      state.getAsyncStatus = STATUS.FULFILLED;
    });
    builder.addCase(getActiveForm.rejected, (state) => {
      state.getAsyncStatus = STATUS.REJECTED;
    });
  },
});

export const { setFormName } = formSlice.actions;

export const selectForm = (state: RootState) => state.formSlice;

export default formSlice.reducer;
