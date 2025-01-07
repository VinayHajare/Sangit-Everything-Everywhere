import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import tokenManager from "../utils/tokenManager";
import api from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track authentication state

  useEffect(() => {
    const token = tokenManager.getToken();
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decode the token
        console.log("Decoded Token: ", decodedToken);
        const isTokenExpired = decodedToken.exp * 1000 < Date.now(); // Check expiration
        if (isTokenExpired) {
          tokenManager.clearToken(); // Clear expired token
          setUser(null); // Reset user session
          setLoading(false);
          return;
        }
  
        const username = decodedToken?.sub;
        if (username) {
          const fetchUser = async () => {
            try {
              const response = await api.get(`/profile/${username}`); // Fetch user data
              setUser(response.data); // Restore user session
            } catch (error) {
              console.error("Fetch User Failed: ", error);
              tokenManager.clearToken(); // Clear token if fetching fails
              setUser(null);
            } finally {
              setLoading(false);
            }
          };
          fetchUser();
        }
      } catch (error) {
        console.error("Decode Token Failed: ", error);
        tokenManager.clearToken(); // Clear invalid token
        setUser(null);
        setLoading(false);
      }
    } else {
      setLoading(false);
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
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
