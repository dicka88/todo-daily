import { useEffect, useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { I18nextProvider } from "react-i18next";
import i18nRoot from "./i18n";

import AuthRoute from "./components/auth/AuthRoute";
import WhenAuth from "./components/auth/WhenAuth";
import IndexPage from "./pages";
import AppPage from "./pages/app/App";
import Upcoming from "./pages/app/Upcoming";
import Yesterday from "./pages/app/Yesterday";
import NotFound from "./pages/NotFound";
import Signin from "./pages/Signin";
import Profile from "./pages/app/Profile";
import Settings from "./pages/app/Settings";

import { selectLoadingState } from "./redux/slices/appSlice";
import LoadingScreen from "./components/LoadingScreen";
import { useTranslation } from "react-i18next";
import { selectPreferences } from "./redux/slices/authSlice";

function App() {
  const { i18n } = useTranslation();

  const loadingState = useSelector(selectLoadingState);
  const darkMode = useSelector(selectPreferences).darkMode;
  const language = useSelector(selectPreferences).language;

  useMemo(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, []);

  if (loadingState) return <LoadingScreen />;

  return (
    <div className="dark:bg-zinc-900 dark:text-white transition-colors duration-300">
      <I18nextProvider i18n={i18nRoot}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WhenAuth children={<IndexPage />} />} />
            <Route
              path="/signin"
              element={<WhenAuth children={<Signin />} />}
            />
            {/* <Route path="/signup" element={<WhenAuth children={<Signup />} />} /> */}
            <Route element={<AuthRoute />}>
              <Route path="/app" element={<AppPage />} />
              <Route path="/app/yesterday" element={<Yesterday />} />
              <Route path="/app/upcoming" element={<Upcoming />} />
              <Route path="/app/profile" element={<Profile />} />
              <Route path="/app/settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </I18nextProvider>
    </div>
  );
}

export default App;
