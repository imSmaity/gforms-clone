import { JSONContent } from "@tiptap/react";
export interface IForm {
  _id: string;
  userId: string;
  title: string;
  header: JSONContent;
  description: JSONContent;
  questions: string;
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
}

export interface ISaveFormAsync {
  _id: string;
  userId: string;
  data: IForm;
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

export interface IDeleteQuestionAsync {
  _id: string;
  formId: string;
}

export interface IUpdateQuestionsPositionAsync {
  formId: string;
  newPositions: string[];
}
