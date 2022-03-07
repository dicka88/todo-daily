import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../../services/userService";

const initialState = {
  user: {
    uid: '',
    displayName: '',
    email: '',
    preferences: {
      language: 'en',
      darkMode: false
    }
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
    setLogout() {
      return initialState;
    }
  }
});

export const fetchUpdateUser = createAsyncThunk(
  'auth/fetchUpdateUser',
  async ({ uid, data }, { dispatch }) => {
    dispatch(setUser(data));
    await userService.setUser(uid, data);
  }
);

export const { setUser, setLogout } = authSlice.actions;

export const selectUser = (state) => state.auth.user
export const selectPreferences = (state) => state.auth.user.preferences

export default authSlice.reducer;