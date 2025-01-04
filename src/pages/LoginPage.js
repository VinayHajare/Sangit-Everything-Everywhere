import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "../components/Auth/Login";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard"); // Redirect logged-in users to the dashboard
    }
  }, [user, navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-music-background">
      <div className="bg-gray-900 text-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-music-primary">
          Welcome to Sangit🎶 Everything, Everywhere
        </h1>
        <p className="text-center text-music-secondary mb-4">
          Please login to continue listening to your favorite songs!.
        </p>
        <Login />
        <p className="text-center text-sm text-music-secondary mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-music-primary hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
