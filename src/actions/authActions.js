import axios from 'axios';
import { message } from 'antd';
import { loginStart, loginSuccess, loginFailure, signupStart, signupSuccess, signupFailure, logout, setTokenExpiry, clearError } from '../reducers/authReducer';
import { jwtDecode } from 'jwt-decode';


const API_URL = `${import.meta.env.VITE_API_URL}/auth`; // Base URL for API

// Utility function for handling API errors
const handleApiError = (error, dispatch) => {
  const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
  dispatch(clearError());
  message.error(errorMessage);
};

// Signup Action
export const signup = (userData) => async (dispatch) => {
  dispatch(signupStart());
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    const { token, user } = response.data;
    localStorage.setItem('token', token); 
    localStorage.setItem('user', JSON.stringify(user)); // Store user data in local storage
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
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user)); // Store user data in local storage
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    dispatch(loginSuccess({ token, user }));
    checkTokenExpiration(token, dispatch);
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
    dispatch(logout());
    message.info('Session expired. Please log in again.');
  } else {
    dispatch(setTokenExpiry(expirationTime));
    setTimeout(() => dispatch(logout()), expirationTime - currentTime);
  }
};

// Check Token Expiration on page load
const token = localStorage.getItem('token');
if (token) {
  checkTokenExpiration(token, dispatch);
}

// Logout Action
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  axios.defaults.headers.common['Authorization'] = '';
  dispatch(logout());
};
