import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  username: string;
  email: string;
  isVerified: boolean;
  
  // Profile fields
  firstName?: string;
  lastName?: string;
  avatar?: string;
  bio?: string;
  
  // Learning progress
  currentLevel: number;
  xp: number;
  streak: number;
  lastActiveDate?: string;
  
  // User role
  role: 'user' | 'admin' | 'instructor';
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      // Store token in localStorage
      localStorage.setItem('token', action.payload.token);
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.token = typeof window !== 'undefined' ? localStorage.getItem('token') : state.token;
      state.isAuthenticated = true;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      // Remove token from localStorage
      localStorage.removeItem('token');
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setCredentials, setUser, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
