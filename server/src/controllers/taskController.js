import taskService from '../services/taskService.js';
import ApiResponse from '../utils/ApiResponse.js';

export const createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.user._id, req.body);
    ApiResponse.created(res, { task }, 'Task created successfully');
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const result = await taskService.getTasks(req.user._id, req.query);
    ApiResponse.success(res, result, 'Tasks fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const getTask = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.user._id, req.params.id);
    ApiResponse.success(res, { task }, 'Task fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await taskService.updateTask(req.user._id, req.params.id, req.body);
    ApiResponse.success(res, { task }, 'Task updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    await taskService.deleteTask(req.user._id, req.params.id);
    ApiResponse.success(res, null, 'Task deleted successfully');
  } catch (error) {
    next(error);
  }
};

export const duplicateTask = async (req, res, next) => {
  try {
    const task = await taskService.duplicateTask(req.user._id, req.params.id);
    ApiResponse.created(res, { task }, 'Task duplicated successfully');
  } catch (error) {
    next(error);
  }
};

export const getDashboardStats = async (req, res, next) => {
  try {
    const stats = await taskService.getDashboardStats(req.user._id);
    ApiResponse.success(res, stats, 'Dashboard stats fetched successfully');
  } catch (error) {
    next(error);
  }
};
