import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loadingState: false,
  preferences: {
    darkMode: false
  },
  sidebarOpen: true
};

const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setApp(state, { payload }) {
      return { ...state, ...payload };
    }
  }
});

export const { setApp } = appSlice.actions;

export const selectPreferences = (state) => state.app.preferences;
export const selectSidebarOpen = (state) => state.app.sidebarOpen;
export const selectLoadingState = (state) => state.app.loadingState;

export default appSlice.reducer;