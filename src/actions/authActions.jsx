import{ jwtDecode } from 'jwt-decode'; // Correct import for jwt-decode
import { message } from 'antd'; 
import { loginSuccess, logout, setUser, signupSuccess } from '../reducers/authReducer.js';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/auth`; // Set the base URL for your API
import { StrictMode } from 'react';

// Signup Action
export const signup = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);  // Use API endpoint
    const { token, role, email_verified, profile_complete } = response.data;

    // Save token to localStorage
    localStorage.setItem('token', token);

    // Dispatch signup success action
    dispatch(signupSuccess({ user: { role, email_verified, profile_complete }, token }));

    message.success("Signup successful! Please verify your email.");
    return response.data;  // Return data for further use
  } catch (error) {
    console.error('Signup failed:', error.response?.data || error);  // Log error
    message.error(error.response?.data?.message || "Signup failed. Please try again.");
    throw error;
  }
};


// Login Action
export const login = (credentials) => async (dispatch) => {
  try {
    // Debug: Check the credentials being sent
    console.log("Sending credentials to login API:", credentials);

    // Make API request
    const response = await axios.post(`${API_URL}/login`, credentials);

    // Debug: Log the response received
    console.log("Login API Response:", response);

    const { token, role, email_verified, profile_complete } = response.data;

    // Check if the token is actually returned
    if (!token) {
      throw new Error("No token returned from login API");
    }

    // Save token and user info to localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({ role, email_verified, profile_complete }));

    // Dispatch login success action
    dispatch(loginSuccess({ user: { role, email_verified, profile_complete }, token }));

    // Debug: Ensure that the token and user were saved correctly
    console.log("User saved to localStorage:", localStorage.getItem('user'));

    // Set axios auth headers for subsequent requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Check token expiration
    checkTokenExpiration(token, dispatch);

    // Debug: Log what is returned for use in the component (role, email_verified, profile_complete)
    console.log("Login successful, user role:", role, "Email Verified:", email_verified, "Profile Complete:", profile_complete);

    // Return user data for further use (redirect, etc.)
    return { role, email_verified, profile_complete };

  } catch (error) {
    // Handle specific cases of failed login
    if (error.response && error.response.status === 400) {
      message.error("Invalid email or password. Please try again.");
    } else if (error.response && error.response.status === 403) {
      message.error("Your email is not verified.");
    } else {
      message.error("Login failed. Please check your credentials.");
    }

    // Log error details for debugging
    console.error("Login error details:", error.response ? error.response.data : error.message);
    throw error; // Rethrow error for handling in the component
  }
};

// Check Token Expiration Function
export const checkTokenExpiration = (token, dispatch) => {
  try {
    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000; // Convert exp to milliseconds
    const currentTime = Date.now();

    console.log("Token expiration time:", expirationTime, "Current time:", currentTime);

    if (currentTime >= expirationTime) {
      // Token has expired
      console.warn("Token has expired, logging out...");
      dispatch(logout());
      localStorage.removeItem('token'); // Remove token from localStorage
      localStorage.removeItem('user'); // Remove user data from localStorage
    } else {
      // Set user info from localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      dispatch(setUser(user)); // Dispatch user info to the Redux store
      console.log("User info restored from localStorage:", user);
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    dispatch(logout());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};


// Logout Action
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  dispatch(logout()); // Log the user out
};
