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
  tempId?: string;
  type: string;
  label: string;
  options: IOption[];
}

export interface IQuestions {
  _id?: string;
  fields: IQuestion[];
}

export interface ISaveFormAsync {
  _id: string;
  userId: string;
  data: IForm;
}

export interface IGetQuestionsAsync {
  _id: string;
  formId: string;
}

export interface ISaveQuestionAsync {
  _id: string;
  userId: string;
  fieldId?: string;
  data: IQuestion;
}
