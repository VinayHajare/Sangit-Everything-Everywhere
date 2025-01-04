import React from "react";
import { Link } from "react-router-dom";
import Register from "../components/Auth/Register";

const ResgisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-music-background">
      <div className="bg-gray-900 text-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-music-primary">
          Create an Account
        </h1>
        <p className="text-center text-music-secondary mb-4">
          Sign up to start listening to your favorite songs!
        </p>
        <Register />
        <p className="text-center text-sm text-music-secondary mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-music-primary hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResgisterPage;