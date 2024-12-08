import { jwtDecode } from 'jwt-decode'; // Correct import for jwt-decode
import { message } from 'antd'; 
import { loginSuccess, logout, setUser, signupSuccess } from '../reducers/authReducer';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/auth`; // Set the base URL for your API

// Utility function to handle API errors
const handleApiError = (error) => {
  if (error.response?.data?.message) {
    message.error(error.response.data.message);
  } else {
    message.error("An unexpected error occurred. Please try again.");
  }
  throw error;
};

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
    handleApiError(error);
  }
};

// Login Action
export const login = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);

    const { token, role, email_verified, profile_complete } = response.data;

    if (!token) {
      throw new Error("No token returned from login API");
    }

    // Save token and user info to localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({ role, email_verified, profile_complete }));

    // Dispatch login success action
    dispatch(loginSuccess({ user: { role, email_verified, profile_complete }, token }));

    // Set axios auth headers for subsequent requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Check token expiration
    const expirationTime = jwtDecode(token).exp * 1000;
    setTokenExpiryTimer(expirationTime, dispatch);

    return { role, email_verified, profile_complete };

  } catch (error) {
    handleApiError(error);
  }
};

// Set Token Expiry Timer
const setTokenExpiryTimer = (expirationTime, dispatch) => {
  const timeout = expirationTime - Date.now();
  setTimeout(() => {
    dispatch(logoutUser());
    message.info("Session expired. Please log in again.");
  }, timeout);
};

// Check Token Expiration Function
export const checkTokenExpiration = (token, dispatch) => {
  try {
    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000; // Convert exp to milliseconds
    const currentTime = Date.now();

    if (currentTime >= expirationTime) {
      dispatch(logout());
      localStorage.removeItem('token'); // Remove token from localStorage
      localStorage.removeItem('user'); // Remove user data from localStorage
    } else {
      const user = JSON.parse(localStorage.getItem('user'));
      dispatch(setUser(user)); // Dispatch user info to the Redux store
    }
  } catch (error) {
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
