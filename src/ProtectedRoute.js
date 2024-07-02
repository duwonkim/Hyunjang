import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuthState();
  console.log('isLoggedIn in ProtectedRoute:', isLoggedIn); // 로그 확인

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
