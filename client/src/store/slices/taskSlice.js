import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import taskService from '../../services/taskService';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (params, { rejectWithValue }) => {
  try {
    const response = await taskService.getTasks(params);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'Failed to fetch tasks' });
  }
});

export const fetchTask = createAsyncThunk('tasks/fetchTask', async (id, { rejectWithValue }) => {
  try {
    const response = await taskService.getTask(id);
    return response.data.task;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'Failed to fetch task' });
  }
});

export const createTask = createAsyncThunk('tasks/createTask', async (data, { rejectWithValue }) => {
  try {
    const response = await taskService.createTask(data);
    return response.data.task;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'Failed to create task' });
  }
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await taskService.updateTask(id, data);
    return response.data.task;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'Failed to update task' });
  }
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id, { rejectWithValue }) => {
  try {
    await taskService.deleteTask(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'Failed to delete task' });
  }
});

export const duplicateTask = createAsyncThunk('tasks/duplicateTask', async (id, { rejectWithValue }) => {
  try {
    const response = await taskService.duplicateTask(id);
    return response.data.task;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'Failed to duplicate task' });
  }
});

export const fetchDashboardStats = createAsyncThunk('tasks/fetchDashboardStats', async (_, { rejectWithValue }) => {
  try {
    const response = await taskService.getDashboardStats();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'Failed to fetch dashboard stats' });
  }
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    currentTask: null,
    dashboardStats: null,
    pagination: { page: 1, limit: 10, total: 0, pages: 0 },
    loading: false,
    error: null,
  },
  reducers: {
    clearTaskError: (state) => {
      state.error = null;
    },
    clearCurrentTask: (state) => {
      state.currentTask = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.tasks;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch tasks';
      })
      .addCase(fetchTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTask.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTask = action.payload;
      })
      .addCase(fetchTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(createTask.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.payload?.message;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const idx = state.tasks.findIndex((t) => t._id === action.payload._id);
        if (idx !== -1) state.tasks[idx] = action.payload;
        if (state.currentTask?._id === action.payload._id) {
          state.currentTask = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.payload?.message;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.payload?.message;
      })
      .addCase(duplicateTask.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.dashboardStats = action.payload;
      });
  },
});

export const { clearTaskError, clearCurrentTask } = taskSlice.actions;
export default taskSlice.reducer;
