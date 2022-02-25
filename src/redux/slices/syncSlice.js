import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  synced: false
};

const syncSlice = createSlice({
  name: 'sync',
  initialState,
  reducers: {
    setSync(state, { payload }) {
      state.synced = payload || true;
    }
  }
});

export const { setSync } = syncSlice.actions;

export const selectSync = (state) => state.sync.synced;

export default syncSlice.reducer;