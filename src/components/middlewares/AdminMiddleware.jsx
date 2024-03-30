import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function AdminMiddleware({ children }) {
  const { authState } = useAuth();
  if (!authState.user) {
    return <Navigate to="/login" replace  />;
  } else if (authState.user && !authState.user.isAdmin) {
    return <Navigate to="/" replace  />;
  } else {
    return children;
  }
  
  
}

export default AdminMiddleware;
