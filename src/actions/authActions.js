import axios from 'axios';
import { message } from 'antd';
import { loginStart, loginSuccess, loginFailure, logout, setTokenExpiry, clearError } from '../reducers/authReducer';
import jwtDecode from 'jwt-decode';

const API_URL = `${import.meta.env.VITE_API_URL}/auth`; // Base URL for API

// Utility function for handling API errors
const handleApiError = (error, dispatch) => {
  const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
  dispatch(clearError());
  message.error(errorMessage);
};

// Utility: Role-to-URL mapping
const roleToDashboardUrl = {
  admin: `${import.meta.env.VITE_DASHBOARD_BASE_URL}${import.meta.env.VITE_ADMIN_DASHBOARD_PATH}`,
  farmer: `${import.meta.env.VITE_DASHBOARD_BASE_URL}${import.meta.env.VITE_FARMER_DASHBOARD_PATH}`,
  "warehouse-manager": `${import.meta.env.VITE_DASHBOARD_BASE_URL}${import.meta.env.VITE_WAREHOUSE_MANAGER_DASHBOARD_PATH}`,
  "tractor-manager": `${import.meta.env.VITE_DASHBOARD_BASE_URL}${import.meta.env.VITE_TRACTOR_MANAGER_DASHBOARD_PATH}`,
  "derisking-company": `${import.meta.env.VITE_DASHBOARD_BASE_URL}${import.meta.env.VITE_DERISKING_COMPANY_DASHBOARD_PATH}`,
  buyer: `${import.meta.env.VITE_DASHBOARD_BASE_URL}${import.meta.env.VITE_BUYER_DASHBOARD_PATH}`,
};

export default roleToDashboardUrl;


// Signup Action
export const signup = (userData) => async (dispatch) => {
  dispatch(signupStart());
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    const { token, user } = response.data;

    // Store token and user data in localStorage
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    dispatch(signupSuccess({ token, user }));
    message.success('Signup successful! Please verify your email.');
  } catch (error) {
    handleApiError(error, dispatch);
    dispatch(signupFailure(error));
  }
};

// Login Action
export const login = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    const { token, user } = response.data;

    // Store token securely
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    dispatch(loginSuccess({ token, user }));

    // Check Token Expiration
    checkTokenExpiration(token, dispatch);

    // Redirect to the appropriate dashboard
    const dashboardUrl = roleToDashboardUrl[user.role] || import.meta.env.VITE_BASE_URL;
    window.location.href = `${dashboardUrl}?token=${encodeURIComponent(token)}`;
  } catch (error) {
    handleApiError(error, dispatch);
    dispatch(loginFailure(error));
  }
};

// Check Token Expiration
export const checkTokenExpiration = (token, dispatch) => {
  const decodedToken = jwtDecode(token);
  const expirationTime = decodedToken.exp * 1000;
  const currentTime = Date.now();

  if (currentTime >= expirationTime) {
    dispatch(logoutUser());
    message.info("Session expired. Please log in again.");
  } else {
    const timeLeft = expirationTime - currentTime;
    dispatch(setTokenExpiry(expirationTime));

    // Optionally, refresh token before expiration
    setTimeout(() => {
      dispatch(logoutUser());
    }, timeLeft);
  }
};

// Logout Action
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  axios.defaults.headers.common["Authorization"] = "";
  dispatch(logout());
};
