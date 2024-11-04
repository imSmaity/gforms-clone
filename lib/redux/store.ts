import { configureStore } from "@reduxjs/toolkit";
import formSlice from "./formSlice";

export const makeStore = () => {
  return configureStore({
    reducer: { formSlice },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
