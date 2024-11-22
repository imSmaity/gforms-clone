import Api from "@/Api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IForm,
  IGetQuestionsAsync,
  IQuestions,
  ISaveFormAsync,
  ISaveQuestionAsync,
} from "./types";

export const getActiveForm = createAsyncThunk(
  "form/fetchActiveForm",
  async ({ _id, userId }: { _id: string; userId: string }) => {
    return (await Api.getForm({ _id, userId })) as { data: IForm };
  }
);

export const autoSave = createAsyncThunk(
  "form/autoSave",
  async (data: ISaveFormAsync) => {
    return (await Api.saveForm(data)) as { data: IForm };
  }
);

export const getFormQuestions = createAsyncThunk(
  "form/questions",
  async (data: IGetQuestionsAsync) => {
    return (await Api.getQuestions(data)) as { data: IQuestions };
  }
);

export const saveFormQuestion = createAsyncThunk(
  "form/question/autoSave",
  async (data: ISaveQuestionAsync) => {
    return (await Api.saveQuestion(data)) as { data: IQuestions | IForm };
  }
);