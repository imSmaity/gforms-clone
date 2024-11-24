import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAnswer, IGetAnswersAsync } from "./types";
import Api from "@/Api";

export const getFormAnswers = createAsyncThunk(
  "responder/answers",
  async (data: IGetAnswersAsync) => {
    return (await Api.getAnswers(data)) as { data: IAnswer[] };
  }
);
