import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { FLUSH, PERSIST, REGISTER } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from 'redux-persist/lib/storage';
import todosSlice from "./slices/todosSlice";
import authSlice from './slices/authSlice';
import syncSlice from "./slices/syncSlice";
import appSlice from "./slices/appSlice";

const persistConfig = {
  key: 'todo-daily',
  storage,
  blacklist: [
    'sync'
  ]
};

const combinedReducer = combineReducers({
  app: appSlice,
  todos: todosSlice,
  auth: authSlice,
  sync: syncSlice
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/setLogout') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: [FLUSH, PERSIST, REGISTER]
    }
  })
});

export const persistor = persistStore(store);

export default store;