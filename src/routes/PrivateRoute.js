import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-music-background text-white">
        <p>Loading...</p>
      </div>
    );
  }
  return user ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
