import { apiConfig } from "@/config/apiConfig";
import {
  IDeleteQuestionAsync,
  IGetQuestionsAsync,
  IGetResponsesAsync,
  ISaveAnswerAsync,
  ISaveFormAsync,
  ISaveQuestionAsync,
  IUpdateQuestionsPositionAsync,
} from "@/lib/redux/form/types";
import {
  IGetAnswersAsync,
  ISubmitFormAsync,
} from "@/lib/redux/responder/types";
import Axios from "axios";

const { FORMS, FORM, QUESTION, ANSWER, POSITION, SYNC_QUESTIONS } = apiConfig;

const axiosInstance = Axios.create({
  baseURL: apiConfig.baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
  },
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getForms({ userId }: { userId: string }) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(FORMS.BASE.concat(`?userId=${userId}`))
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => reject(error));
    });
  },
  getForm({ _id, userId }: { _id: string; userId: string }) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(FORM.BASE.concat(`?_id=${_id}&userId=${userId}`))
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => reject(error));
    });
  },
  saveForm(data: ISaveFormAsync) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(FORM.BASE.concat(FORM.SAVE.BASE), {
          ...data,
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => reject(error));
    });
  },
  getQuestions({ formId }: IGetQuestionsAsync) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(
          FORM.BASE.concat(
            FORM.SAVE.BASE.concat(QUESTION.BASE.concat(`?formId=${formId}`))
          )
        )
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => reject(error));
    });
  },
  saveQuestion(data: ISaveQuestionAsync) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(FORM.BASE.concat(FORM.SAVE.BASE.concat(QUESTION.BASE)), data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => reject(error));
    });
  },
  deleteQuestion({ _id, formId }: IDeleteQuestionAsync) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .delete(
          FORM.BASE.concat(
            FORM.SAVE.BASE.concat(QUESTION.BASE).concat(
              `?_id=${_id}&formId=${formId}`
            )
          )
        )
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => reject(error));
    });
  },
  updateQuestionsPosition(data: IUpdateQuestionsPositionAsync) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .put(FORM.BASE.concat(QUESTION.BASE.concat(POSITION.BASE)), data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => reject(error));
    });
  },
  getAnswers({ formId, userId }: IGetAnswersAsync) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(FORM.BASE.concat(SYNC_QUESTIONS.BASE), {
          formId,
          userId,
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => reject(error));
    });
  },
  submitForm({ formId, responserId }: ISubmitFormAsync) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(FORM.BASE.concat(FORM.SUBMIT.BASE), {
          formId,
          responserId,
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => reject(error));
    });
  },
  getIndividualResponses({ formId, responserId, userId }: IGetResponsesAsync) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(
          FORM.BASE.concat(
            FORM.RESPONSES.BASE.concat(
              `?formId=${formId}&responserId=${responserId}&userId=${userId}`
            )
          )
        )
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => reject(error));
    });
  },
  saveAnswer(data: ISaveAnswerAsync) {
    //data= _id, userId, formId, response
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(FORM.BASE.concat(FORM.SAVE.BASE.concat(ANSWER.BASE)), data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => reject(error));
    });
  },
};
