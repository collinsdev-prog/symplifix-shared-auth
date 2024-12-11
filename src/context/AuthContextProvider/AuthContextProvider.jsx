import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { loginService, signupService, validateTokenService } from "../services/authServices"; // Import authentication services

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user information
  const [loading, setLoading] = useState(true); // Track authentication status
  const navigate = useNavigate();

  // Handle login
  const login = async (credentials) => {
    try {
      const response = await loginService(credentials);
      const { token, user: loggedInUser } = response;

      // Save token and user info
      localStorage.setItem("authToken", token);
      setUser(loggedInUser);

      message.success("Login successful!");
      routeBasedOnRole(loggedInUser.role);
    } catch (error) {
      message.error("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  // Handle signup
  const signup = async (userData) => {
    try {
      const response = await signupService(userData);
      message.success("Signup successful! Please verify your email.");
      navigate(`/verify-email?token=${response.token}`);
    } catch (error) {
      message.error("Signup failed. Please try again.");
      console.error("Signup error:", error);
    }
  };

  // Route user based on their role
  const routeBasedOnRole = (role) => {
    switch (role) {
      case "admin":
        navigate("/admin-dashboard");
        break;
      case "farmer":
        navigate("/farmer-dashboard");
        break;
      case "warehouse_owner":
        navigate("/warehouse-owner-dashboard");
        break;
      case "tractor_owner":
        navigate("/tractor-owner-dashboard");
        break;
      case "derisking_company":
        navigate("/derisking-company-dashboard");
        break;
      case "buyer":
        navigate("/buyer-dashboard");
        break;
      default:
        message.error("Invalid user role.");
        break;
    }
  };

  // Validate token on app load
  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await validateTokenService(token);
        setUser(response.user);
      } catch (error) {
        console.error("Token validation failed:", error);
        localStorage.removeItem("authToken");
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
