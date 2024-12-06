import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    token: null,
  },
  reducers: {
    // Reducer for successful login
    loginSuccess(state, action) {
      state.isAuthenticated = true; 
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    // Reducer for successful signup
    signupSuccess(state, action) {
      state.isAuthenticated = false; // set to false until email verification is done
      state.user = action.payload.user; // Set user details
      state.token = action.payload.token; // Set token
    },

    // Reducer for logout
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },

    // Reducer for setting user info after checking token or other actions
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

// Export the action creators
export const { loginSuccess, signupSuccess, logout, setUser } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
