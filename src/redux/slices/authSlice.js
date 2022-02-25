import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {}
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setLogout() {
      return initialState;
    }
  }
});

export const { setUser, setLogout } = authSlice.actions;

export const selectUser = (state) => {
  return state.auth.user;
};

export default authSlice.reducer;