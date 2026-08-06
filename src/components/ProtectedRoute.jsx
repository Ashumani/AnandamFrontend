import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Check if authentication token exists in localStorage
  const isAuthenticated = localStorage.getItem("token"); // Replace "token" with your actual localStorage key name

  if (!isAuthenticated) {
    // If not logged in, redirect to /login and replace browser history
    return <Navigate to="/login" replace />;
  }

  // If logged in, allow rendering the requested route
  return <Outlet />;
};

export default ProtectedRoute;