import { IQuestion } from "@/lib/redux/form/types";

const deleteQuestionUtil = (id: string, questions: IQuestion[]) => {
  return questions.filter((question) => question._id !== id);
};

export { deleteQuestionUtil };
