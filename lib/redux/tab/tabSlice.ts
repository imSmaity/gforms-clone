import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { TABS } from "./types";

interface TabState {
  currentTab: number;
}

export const STATUS = {
  IDLE: "idle",
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};

const initialState: TabState = {
  currentTab: TABS.QUESTION,
};

export const tabSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    setTab: (state, action) => {
      state.currentTab = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setTab } = tabSlice.actions;

export const selectTabs = (state: RootState) => state.tabSlice;

export default tabSlice.reducer;
