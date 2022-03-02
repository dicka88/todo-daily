import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../../services/userService";

const initialState = {
  user: {}
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
    //  const await 
    const res = await userService.setUser(uid, data);

    dispatch(setUser(data));
  }
);

export const { setUser, setLogout } = authSlice.actions;

export const selectUser = (state) => {
  return state.auth.user;
};

export default authSlice.reducer;