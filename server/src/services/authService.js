import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';

const register = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw ApiError.conflict('Email already registered');
  }

  const user = await User.create({ name, email, password });
  return user;
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  return user;
};

const getProfile = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw ApiError.notFound('User not found');
  }
  return user;
};

const updateProfile = async (userId, updates) => {
  const user = await User.findById(userId);
  if (!user) {
    throw ApiError.notFound('User not found');
  }

  if (updates.email && updates.email !== user.email) {
    const existingUser = await User.findOne({ email: updates.email });
    if (existingUser) {
      throw ApiError.conflict('Email already in use');
    }
  }

  Object.assign(user, updates);
  await user.save();
  return user;
};

const changePassword = async (userId, { currentPassword, newPassword }) => {
  const user = await User.findById(userId).select('+password');
  if (!user) {
    throw ApiError.notFound('User not found');
  }

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    throw ApiError.badRequest('Current password is incorrect');
  }

  user.password = newPassword;
  await user.save();
  return user;
};

const updateAvatar = async (userId, avatarPath) => {
  const user = await User.findById(userId);
  if (!user) {
    throw ApiError.notFound('User not found');
  }

  user.avatar = avatarPath;
  await user.save();
  return user;
};

export default { register, login, getProfile, updateProfile, changePassword, updateAvatar };
