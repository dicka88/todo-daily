import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUser } from '../../redux/slices/authSlice';

export default function AuthRoute({ children }) {
  const user = useSelector(selectUser);

  if (!user.isLogged) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
