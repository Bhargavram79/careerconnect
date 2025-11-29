import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowed }) {
  const user = JSON.parse(localStorage.getItem("career_user"));

  if (!user) return <Navigate to="/login" />;

  if (allowed && !allowed.includes(user.role))
    return <Navigate to="/" />;

  return children;
}
