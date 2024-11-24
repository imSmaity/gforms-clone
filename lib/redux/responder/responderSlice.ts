import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IAnswer } from "./types";
import { getFormAnswers } from "./thunk";

interface ResponderState {
  answers: IAnswer[] | null;
  getAnswersAsync: string;
}

export const STATUS = {
  IDLE: "idle",
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};

const initialState: ResponderState = {
  answers: null,
  getAnswersAsync: STATUS.IDLE,
};

export const responderSlice = createSlice({
  name: "responder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFormAnswers.pending, (state) => {
      state.getAnswersAsync = STATUS.PENDING;
    });
    builder.addCase(getFormAnswers.fulfilled, (state, action) => {
      if (action.payload) state.answers = action.payload.data;
      state.getAnswersAsync = STATUS.FULFILLED;
    });
    builder.addCase(getFormAnswers.rejected, (state) => {
      state.getAnswersAsync = STATUS.REJECTED;
    });
  },
});

export const {} = responderSlice.actions;

export const selectResponder = (state: RootState) => state.responderSlice;

export default responderSlice.reducer;
