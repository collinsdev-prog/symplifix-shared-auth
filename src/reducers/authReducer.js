import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { message } from 'antd';

// Initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null, 
  loading: false,
  error: null,
  tokenExpiry: null,  // Token expiry time in milliseconds
};

// Slice for authentication
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      const { token, user } = action.payload;
      state.isAuthenticated = true;
      state.user = user;
      state.token = token;
      state.role = user.role;
      state.loading = false;
      const decodedToken = jwtDecode(token);
      state.tokenExpiry = decodedToken.exp * 1000; // Store expiration time in ms
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signupStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signupSuccess: (state, action) => {
      state.isAuthenticated = false; // Wait for email verification
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      const decodedToken = jwtDecode(action.payload.token);
      state.tokenExpiry = decodedToken.exp * 1000; // Store expiration time in ms
    },
    signupFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.tokenExpiry = null; // Clear token expiry on logout
      state.loading = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setTokenExpiry: (state, action) => {
      state.tokenExpiry = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  logout,
  setUser,
  setTokenExpiry,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
