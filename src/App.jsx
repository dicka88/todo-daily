import { BrowserRouter, Route, Routes } from "react-router-dom";
import IndexPage from "./pages";
import AppPage from "./pages/app/App";
import Yesterday from "./pages/app/Yesterday";
import NotFound from "./pages/NotFound";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/app" element={<AppPage />} />
        <Route path="/app/yesterday" element={<Yesterday />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
