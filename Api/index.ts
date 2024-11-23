import { apiConfig } from "@/config/apiConfig";
import {
  IGetQuestionsAsync,
  ISaveFormAsync,
  ISaveQuestionAsync,
} from "@/lib/redux/form/types";
import Axios from "axios";

const { FORMS, FORM, QUESTION } = apiConfig;

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
};
