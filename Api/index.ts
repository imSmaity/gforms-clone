import { apiConfig } from "@/config/apiConfig";
import Axios from "axios";

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
        .get(apiConfig.FORMS.BASE.concat(`?userId=${userId}`))
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => reject(error));
    });
  },
  getForm({ _id, userId }: { _id: string; userId: string }) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(apiConfig.FORM.BASE.concat(`?_id=${_id}&userId=${userId}`))
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => reject(error));
    });
  },
};
