import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { userRole } = useAuth();

  if (!userRole) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
