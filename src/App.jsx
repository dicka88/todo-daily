import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from 'react-redux';

import AuthRoute from "./components/auth/AuthRoute";
import WhenAuth from "./components/auth/WhenAuth";
import IndexPage from "./pages";
import AppPage from "./pages/app/App";
import Upcoming from "./pages/app/Upcoming";
import Yesterday from "./pages/app/Yesterday";
import NotFound from "./pages/NotFound";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { selectLoadingState } from "./redux/slices/appSlice";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const loadingState = useSelector(selectLoadingState);

  if (loadingState) return <LoadingScreen />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WhenAuth children={<IndexPage />} />} />
        <Route path="/signin" element={<WhenAuth children={<Signin />} />} />
        <Route path="/signup" element={<WhenAuth children={<Signup />} />} />
        <Route path="/app" element={<AuthRoute children={<AppPage />} />} />
        <Route path="/app/yesterday" element={<AuthRoute children={<Yesterday />} />} />
        <Route path="/app/upcoming" element={<AuthRoute children={<Upcoming />} />} />
        <Route path="/app/profile" element={<AuthRoute children={<Upcoming />} />} />
        <Route path="/app/preference" element={<AuthRoute children={<Upcoming />} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
