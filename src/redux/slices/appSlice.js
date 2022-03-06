import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from '../../services/userService';

const initialState = {
  loadingState: false,
  preferences: {
    language: "en",
    darkMode: false
  },
  sidebarOpen: true
};

export const fetchUpdateApp = createAsyncThunk(
  'app/fetchUpdateApp',
  async ({ uid, data }, { dispatch }) => {
    dispatch(setApp(data));

    await userService.setUser(uid, data);
  }
)

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

export const selectPreferences = (state) => state.app.preferences;
export const selectSidebarOpen = (state) => state.app.sidebarOpen;
export const selectLoadingState = (state) => state.app.loadingState;

export default appSlice.reducer;