import { IQuestion } from "../form/types";

export interface IAnswer {
  _id: string;
  formId: string;
  userId: string;
  adminId: string;
  question: IQuestion;
  response: string[];
}

export interface IGetAnswersAsync {
  formId: string;
  userId: string;
}

export interface ISubmitFormAsync {
  formId: string;
  responserId: string;
}
