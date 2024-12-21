import Api from "@/Api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IDeleteQuestionAsync,
  IForm,
  IGetQuestionsAsync,
  IQuestion,
  ISaveFormAsync,
  ISaveQuestionAsync,
  IUpdateQuestionsPositionAsync,
} from "./types";

export const getActiveForm = createAsyncThunk(
  "form/fetchActiveForm",
  async ({ _id, userId }: { _id: string; userId: string }) => {
    return (await Api.getForm({ _id, userId })) as { data: IForm };
  }
);

export const getViewForm = createAsyncThunk(
  "form/view",
  async ({ _id, userId }: { _id: string; userId: string }) => {
    return (await Api.getViewForm({ _id, userId })) as { data: IForm };
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
    return (await Api.getQuestions(data)) as { data: IQuestion[] };
  }
);

export const saveFormQuestion = createAsyncThunk(
  "form/question/autoSave",
  async (data: ISaveQuestionAsync) => {
    return (await Api.saveQuestion(data)) as { question: IQuestion };
  }
);

export const updateFormQuestionsPosition = createAsyncThunk(
  "form/questions/position",
  async (data: IUpdateQuestionsPositionAsync) => {
    return (await Api.updateQuestionsPosition(data)) as any;
  }
);
