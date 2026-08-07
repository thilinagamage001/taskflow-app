import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';

export const register = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
  try {
    const response = await authService.register(data);
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'Registration failed' });
  }
});

export const login = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
  try {
    const response = await authService.login(data);
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'Login failed' });
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await authService.logout();
    localStorage.removeItem('token');
  } catch (error) {
    localStorage.removeItem('token');
    return rejectWithValue(error.response?.data || { message: 'Logout failed' });
  }
});

export const loadUser = createAsyncThunk('auth/loadUser', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return rejectWithValue({ message: 'No token' });
    const response = await authService.getProfile();
    return { user: response.data.user, token };
  } catch (error) {
    localStorage.removeItem('token');
    return rejectWithValue(error.response?.data || { message: 'Failed to load user' });
  }
});

export const updateProfile = createAsyncThunk('auth/updateProfile', async (data, { rejectWithValue }) => {
  try {
    const response = await authService.updateProfile(data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'Update failed' });
  }
});

export const uploadAvatar = createAsyncThunk('auth/uploadAvatar', async (file, { rejectWithValue }) => {
  try {
    const response = await authService.uploadAvatar(file);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'Upload failed' });
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: false,
    loading: true,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Registration failed';
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Login failed';
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loadUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
