import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUser } from '../../redux/slices/authSlice';

export default function WhenAuth({ redirect, children }) {
  const user = useSelector(selectUser);

  if (user.isLogged) return <Navigate to={redirect || "/app"} />;

  return children;
}
