import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Try loading user from localStorage
const savedUser = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: savedUser || null,
  isAuthenticated: !!savedUser,
  loading: false,
  error: null,
};

// Async login action (simulate API)
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // simulate delay

    if (email === 'admin@ivf.com' && password === 'admin123') {
      const userData = {
        id: '1',
        name: 'Super Admin',
        email: 'admin@ivf.com',
        role: 'admin',
      };
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    }

    return thunkAPI.rejectWithValue('Invalid email or password');
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      localStorage.removeItem('user');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload || 'Login failed';
      });
  }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
