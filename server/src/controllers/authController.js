import authService from '../services/authService.js';
import { sendTokenResponse } from '../utils/helpers.js';
import ApiResponse from '../utils/ApiResponse.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await authService.register({ name, email, password });
    sendTokenResponse(user, 201, res, 'Registration successful');
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authService.login({ email, password });
    sendTokenResponse(user, 200, res, 'Login successful');
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res
      .cookie('token', '', {
        httpOnly: true,
        expires: new Date(0),
      })
      .status(200)
      .json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await authService.getProfile(req.user._id);
    ApiResponse.success(res, { user }, 'Profile fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const user = await authService.updateProfile(req.user._id, req.body);
    ApiResponse.success(res, { user }, 'Profile updated successfully');
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    await authService.changePassword(req.user._id, { currentPassword, newPassword });
    ApiResponse.success(res, null, 'Password changed successfully');
  } catch (error) {
    next(error);
  }
};

export const uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a file' });
    }
    const avatarPath = `/uploads/${req.file.filename}`;
    const user = await authService.updateAvatar(req.user._id, avatarPath);
    ApiResponse.success(res, { user }, 'Avatar uploaded successfully');
  } catch (error) {
    next(error);
  }
};
