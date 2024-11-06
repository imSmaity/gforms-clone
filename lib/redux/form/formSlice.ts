import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface FormState {
  title: string;
}

const initialState: FormState = {
  title: "",
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormName: (state, action: PayloadAction<FormState>) => {
      state.title = action.payload.title;
    },
  },
});

export const { setFormName } = formSlice.actions;

export const selectForm = (state: RootState) => state.formSlice;

export default formSlice.reducer;
