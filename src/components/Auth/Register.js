import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    bio: "",
    profilePicture: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const HandleRegister = async (e) => {
    e.preventDefault();
    // Validate form data
    if (!formData.username || !formData.email || !formData.password) {
      setErrorMessage("All fields are required");
      return;
    }

    try {
      await api.post("/auth/signup", formData);

      setSuccessMessage("Registration successful! Please login."); // response.data.message
      setErrorMessage("");

      setFormData({
        username: "",
        email: "",
        password: "",
        bio: "",
        profilePicture: "",
      });

      setShouldRedirect(true);
    } catch (error) {
      setErrorMessage("Registration failed. Please try again."); // error.response.data.message
      setSuccessMessage("");
    }
  };

  useEffect(() => {
    if (shouldRedirect) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);
      // Cleanup the timeout if component unmounts before timeout completes
      return () => clearTimeout(timer);
    }
  }, [shouldRedirect, navigate]);

  return (
    <div className="flex justify-center items-center bg-music-background text-white">
      <form onSubmit={HandleRegister}>
        <h2 className="text-2xl font-bold mb-6 text-music-primary">
          Create an Account
        </h2>
        {errorMessage && (
          <p className="mb-4 text-red-500 text-sm">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="mb-4 text-green-500 text-sm">{successMessage}</p>
        )}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full mb-4 p-2 bg-gray-900 text-white rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 p-2 bg-gray-900 text-white rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-4 p-2 bg-gray-900 text-white rounded"
        />
        <textarea
          name="bio"
          placeholder="Short Bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full mb-4 p-2 bg-gray-900 text-white rounded"
        />
        <input
          type="url"
          name="profilePicture"
          placeholder="Profile Picture URL"
          value={formData.profilePicture}
          onChange={handleChange}
          className="w-full mb-4 p-2 bg-gray-900 text-white rounded"
        />
        <button
          type="submit"
          className="w-full bg-music-primary p-2 rounded hover:bg-green-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
