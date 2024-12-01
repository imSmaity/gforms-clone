import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import {
  autoSave,
  getActiveForm,
  getFormQuestions,
  saveFormQuestion,
  updateFormQuestionsPosition,
} from "./thunk";
import { IForm, IQuestion } from "./types";

interface FormState {
  form: IForm | null;
  questions: IQuestion[] | null;
  getAsyncStatus: string;
  asyncSaveForm: string;
  getQuestionsAsync: string;
  asyncSaveQuestion: string;
}

export const STATUS = {
  IDLE: "idle",
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};

const initialState: FormState = {
  form: null,
  questions: null,
  getAsyncStatus: STATUS.IDLE,
  asyncSaveForm: STATUS.IDLE,
  getQuestionsAsync: STATUS.IDLE,
  asyncSaveQuestion: STATUS.IDLE,
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateQuestions: (state, action) => {
      state.questions = action.payload;
    },
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
    // form header auto save
    builder.addCase(autoSave.pending, (state) => {
      state.asyncSaveForm = STATUS.PENDING;
    });
    builder.addCase(autoSave.fulfilled, (state, action) => {
      state.asyncSaveForm = STATUS.FULFILLED;
    });
    builder.addCase(autoSave.rejected, (state) => {
      state.asyncSaveForm = STATUS.REJECTED;
    });
    // update form questions position
    builder.addCase(updateFormQuestionsPosition.pending, (state) => {
      state.asyncSaveQuestion = STATUS.PENDING;
    });
    builder.addCase(updateFormQuestionsPosition.fulfilled, (state, action) => {
      console.log(action.payload);
      state.asyncSaveQuestion = STATUS.FULFILLED;
    });
    builder.addCase(updateFormQuestionsPosition.rejected, (state) => {
      state.asyncSaveQuestion = STATUS.REJECTED;
    });
    //get active form questions
    builder.addCase(getFormQuestions.pending, (state) => {
      state.getQuestionsAsync = STATUS.PENDING;
    });
    builder.addCase(getFormQuestions.fulfilled, (state, action) => {
      if (action.payload) state.questions = action.payload.data;
      state.getQuestionsAsync = STATUS.FULFILLED;
    });
    builder.addCase(getFormQuestions.rejected, (state) => {
      state.getQuestionsAsync = STATUS.REJECTED;
    });
    // form question auto save
    builder.addCase(saveFormQuestion.pending, (state) => {
      state.asyncSaveQuestion = STATUS.PENDING;
    });
    builder.addCase(saveFormQuestion.fulfilled, (state, action) => {
      if (action?.payload?.question)
        state.questions?.push(action.payload.question);

      state.asyncSaveQuestion = STATUS.FULFILLED;
    });
    builder.addCase(saveFormQuestion.rejected, (state) => {
      state.asyncSaveQuestion = STATUS.REJECTED;
    });
  },
});

export const { updateQuestions } = formSlice.actions;

export const selectForm = (state: RootState) => state.formSlice;

export default formSlice.reducer;
