import { configureStore } from "@reduxjs/toolkit";
import formSlice from "./form/formSlice";
import userSlice from "./user/userSlice";
import responderSlice from "./responder/responderSlice";
import tabSlice from "./tab/tabSlice";

export const makeStore = () => {
  return configureStore({
    reducer: { formSlice, userSlice, responderSlice, tabSlice },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
