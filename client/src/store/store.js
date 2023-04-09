import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import pizzaReducer from '../features/pizza/pizzaSlice'

// Redux store to hold global state
export const store = configureStore({
  reducer: {
    auth: authReducer,
    pizza: pizzaReducer
  },
});