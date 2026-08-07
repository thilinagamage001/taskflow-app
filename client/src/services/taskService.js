import api from './api';

const taskService = {
  getTasks: async (params = {}) => {
    const cleanedParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== '' && v !== null && v !== undefined)
    );
    const response = await api.get('/tasks', { params: cleanedParams });
    return response.data;
  },

  getTask: async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  createTask: async (data) => {
    const response = await api.post('/tasks', data);
    return response.data;
  },

  updateTask: async (id, data) => {
    const response = await api.put(`/tasks/${id}`, data);
    return response.data;
  },

  deleteTask: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },

  duplicateTask: async (id) => {
    const response = await api.post(`/tasks/${id}/duplicate`);
    return response.data;
  },

  getDashboardStats: async () => {
    const response = await api.get('/tasks/dashboard');
    return response.data;
  },
};

export default taskService;
