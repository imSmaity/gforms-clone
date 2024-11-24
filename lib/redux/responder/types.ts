import { IQuestion } from "../form/types";

export interface IAnswer {
  _id: string;
  formId: string;
  userId: string;
  adminId: string;
  question: IQuestion;
  response: String;
}

export interface IGetAnswersAsync {
  formId: string;
  userId: string;
}
