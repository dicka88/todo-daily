import { useSelector } from "react-redux";
import { Navigate, Outlet, Route } from "react-router-dom";
import { selectUser } from "../../redux/slices/authSlice";

export default function AuthRoute() {
  const user = useSelector(selectUser);

  if (!user.isLogged) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}
