import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function AdminMiddleware({ children }) {
  const { authState } = useAuth();
  if (!authState.user.isAdmin) {
    return <Navigate to="/" />;
  }
  return children;
}

export default AdminMiddleware;
