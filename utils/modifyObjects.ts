import { IForm, IQuestion } from "@/lib/redux/form/types";
import { JSONContent } from "@tiptap/react";

export const toObject = (data: JSONContent) => JSON.parse(String(data));

export const convertToObjectForm = (data: IForm): IForm => {
  return {
    ...data,
    header: toObject(data.header),
    description: data.description ? toObject(data.description) : "",
  };
};
