import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function AdminMiddleware({ children }) {
  const { authState } = useAuth();
  if (!authState || !authState.user || !authState.user.isAdmin) {
    return <Navigate to="/login" replace  />;
  }
  return children;
}

export default AdminMiddleware;
