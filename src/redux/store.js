import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { FLUSH, PERSIST, REGISTER } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from 'redux-persist/lib/storage';
import todosSlice from "./slices/todosSlice";

const persistConfig = {
  key: 'todos-daily',
  storage
};

const reducers = combineReducers({
  todos: todosSlice
});

const persistedReducer = persistReducer(persistConfig, reducers);

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