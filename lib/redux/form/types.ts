import { JSONContent } from "@tiptap/react";
export interface IForm {
  _id: string;
  userId: string;
  title: string;
  header: JSONContent;
  description: JSONContent;
  questions: string;
  responsesUsers: string[];
}

export interface IOption {
  value: string;
  name?: string;
  isOtherOption?: boolean;
  _id?: string;
}
export interface IQuestion {
  _id?: string;
  id?: number | string;
  formId?: string;
  userId?: string;
  tempId?: string;
  slNo?: number;
  type: string;
  label: JSONContent;
  options: IOption[];
  required?: boolean;
}

export interface ISaveFormAsync {
  _id?: string;
  userId: string;
  data?: IForm;
}

export interface ISaveFormTitleAsync {
  _id?: string;
  userId: string;
  title: string;
}

export interface IGetQuestionsAsync {
  formId: string;
}

export interface ISaveQuestionAsync {
  _id?: string;
  userId: string;
  formId: string;
  data: IQuestion;
}

export interface ISaveAnswerAsync {
  _id?: string;
  userId: string;
  formId: string;
  data: string[];
}

export interface IDeleteQuestionAsync {
  _id: string;
  formId: string;
}

export interface IUpdateQuestionsPositionAsync {
  formId: string;
  newPositions: string[];
}

export interface IGetResponsesAsync {
  formId?: string;
  responserId?: string;
  userId?: string;
}
