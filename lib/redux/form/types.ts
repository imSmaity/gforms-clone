import { JSONContent } from "@tiptap/react";
export interface IForm {
  _id: string;
  userId: string;
  title: string;
  header: string;
  description: string;
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
  formId?: string;
  userId?: string;
  tempId?: string;
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
