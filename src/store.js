import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';

const store = configureStore({
  reducer: {
    auth: authReducer, // Register the auth reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check if necessary (for actions like setting JWT tokens)
    }),
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools only in development mode
});

export default store;
