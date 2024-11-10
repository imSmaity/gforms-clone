import Api from "@/Api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IForm } from "./types";

export const getActiveForm = createAsyncThunk(
  "form/fetchActiveForm",
  async ({ _id, userId }: { _id: string; userId: string }) => {
    return (await Api.getForm({ _id, userId })) as { data: IForm };
  }
);
