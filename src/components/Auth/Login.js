import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/dashboard"); // Redirect after successful login
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center bg-music-background text-white">
      <form onSubmit={handleLogin} className="w-96 p-6 rounded bg-gray-800">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 bg-gray-900 text-white rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 bg-gray-900 text-white rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="w-full bg-music-primary p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
