import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import tokenManager from "../utils/tokenManager";
import api from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = tokenManager.getToken();
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const username = decodedToken?.username;
        if (username) {
          const fetchUser = async () => {
            try {
              const response = await api.get(`/profile/${username}`);
              setUser(response.data);
            } catch (error) {
              console.error("Fetch User Failed: ", error);
              setUser(null);
            }
          };
          fetchUser();
        }
      } catch (error) {
        console.error("Decode Token Failed: ", error);
        tokenManager.clearToken();
        setUser(null);
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      tokenManager.setToken(response.data.token);
      setUser(response.data.user);
    } catch (error) {
      console.error("Login Failed: ", error);
    }
  };

  const logout = () => {
    tokenManager.clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
