import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import store, { persistor } from "./redux/store";

import App from "./App";
import LoadingScreen from "./components/LoadingScreen";

import 'react-toastify/dist/ReactToastify.css';
// CSS
import "./styles/index.css";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<LoadingScreen />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
