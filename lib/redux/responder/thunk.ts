import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAnswer, IGetAnswersAsync } from "./types";
import Api from "@/Api";
import { ISaveAnswerAsync } from "../form/types";

export const getFormAnswers = createAsyncThunk(
  "responder/answers",
  async (data: IGetAnswersAsync) => {
    return (await Api.getAnswers(data)) as { data: IAnswer[] };
  }
);

export const saveAnswer = createAsyncThunk(
  "responder/answer",
  async (data: ISaveAnswerAsync) => {
    return (await Api.saveAnswer(data)) as { answer: IAnswer };
  }
);
