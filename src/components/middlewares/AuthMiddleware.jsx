import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Route, Routes } from "react-router-dom";

function AuthMiddleware({ children }) {
  const { authState } = useAuth();
  if (!authState.user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default AuthMiddleware;
