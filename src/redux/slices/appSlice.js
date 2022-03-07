import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loadingState: false,
  sidebarOpen: true
};
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setApp(state, { payload }) {
      return { ...state, ...payload };
    }
  }
});

export const { setApp } = appSlice.actions;

export const selectSidebarOpen = (state) => state.app.sidebarOpen;
export const selectLoadingState = (state) => state.app.loadingState;

export default appSlice.reducer;