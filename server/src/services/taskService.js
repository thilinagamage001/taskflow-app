import Task from '../models/Task.js';
import ApiError from '../utils/ApiError.js';

const createTask = async (userId, taskData) => {
  const task = await Task.create({ ...taskData, userId });
  return task;
};

const getTasks = async (userId, filters = {}) => {
  const {
    page = 1,
    limit = 10,
    status,
    priority,
    category,
    search,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    isFavorite,
  } = filters;

  const query = { userId };

  if (status) query.status = status;
  if (priority) query.priority = priority;
  if (category) query.category = category;
  if (isFavorite !== undefined) query.isFavorite = isFavorite === 'true';

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { tags: { $regex: search, $options: 'i' } },
    ];
  }

  const sortOptions = {};
  if (sortBy === 'priority') {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    sortOptions.priority = sortOrder === 'asc' ? 1 : -1;
  } else {
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [tasks, total] = await Promise.all([
    Task.find(query).sort(sortOptions).skip(skip).limit(parseInt(limit)).lean(),
    Task.countDocuments(query),
  ]);

  return {
    tasks,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / parseInt(limit)),
    },
  };
};

const getTaskById = async (userId, taskId) => {
  const task = await Task.findOne({ _id: taskId, userId });
  if (!task) {
    throw ApiError.notFound('Task not found');
  }
  return task;
};

const updateTask = async (userId, taskId, updates) => {
  const task = await Task.findOneAndUpdate(
    { _id: taskId, userId },
    { $set: updates },
    { new: true, runValidators: true }
  );
  if (!task) {
    throw ApiError.notFound('Task not found');
  }
  return task;
};

const deleteTask = async (userId, taskId) => {
  const task = await Task.findOneAndDelete({ _id: taskId, userId });
  if (!task) {
    throw ApiError.notFound('Task not found');
  }
  return task;
};

const duplicateTask = async (userId, taskId) => {
  const original = await Task.findOne({ _id: taskId, userId });
  if (!original) {
    throw ApiError.notFound('Task not found');
  }

  const taskData = original.toObject();
  delete taskData._id;
  delete taskData.createdAt;
  delete taskData.updatedAt;
  taskData.title = `${original.title} (Copy)`;
  taskData.status = 'pending';

  const task = await Task.create(taskData);
  return task;
};

const getDashboardStats = async (userId) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [
    totalTasks,
    completedTasks,
    pendingTasks,
    inProgressTasks,
    overdueTasks,
    dueTodayTasks,
    categoryStats,
    recentTasks,
    priorityStats,
  ] = await Promise.all([
    Task.countDocuments({ userId }),
    Task.countDocuments({ userId, status: 'completed' }),
    Task.countDocuments({ userId, status: 'pending' }),
    Task.countDocuments({ userId, status: 'in-progress' }),
    Task.countDocuments({
      userId,
      status: { $ne: 'completed' },
      dueDate: { $lt: today },
    }),
    Task.countDocuments({
      userId,
      dueDate: { $gte: today, $lt: tomorrow },
    }),
    Task.aggregate([
      { $match: { userId: userId } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
    Task.find({ userId }).sort({ createdAt: -1 }).limit(5).lean(),
    Task.aggregate([
      { $match: { userId: userId } },
      { $group: { _id: '$priority', count: { $sum: 1 } } },
    ]),
  ]);

  return {
    totalTasks,
    completedTasks,
    pendingTasks,
    inProgressTasks,
    overdueTasks,
    dueTodayTasks,
    categoryStats,
    recentTasks,
    priorityStats,
  };
};

export default {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  duplicateTask,
  getDashboardStats,
};
