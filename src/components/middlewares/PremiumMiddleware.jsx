import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Route, Routes } from "react-router-dom";

function PremiumMiddleware({ children }) {
  const { authState } = useAuth();
  if (!authState.user) {
    return <Navigate to="/" replace />;
  } else if (!authState.user.isPremium) {
    return <Navigate to='/payments' replace />
  }
  return children;
}

export default PremiumMiddleware;
