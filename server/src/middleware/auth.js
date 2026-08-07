import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import ApiError from '../utils/ApiError.js';
import User from '../models/User.js';

const auth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      throw ApiError.unauthorized('Not authenticated. Please log in.');
    }

    const decoded = jwt.verify(token, config.jwtSecret);
    const user = await User.findById(decoded.id);

    if (!user) {
      throw ApiError.unauthorized('User no longer exists.');
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return next(ApiError.unauthorized('Invalid token.'));
    }
    if (error.name === 'TokenExpiredError') {
      return next(ApiError.unauthorized('Token expired. Please log in again.'));
    }
    next(error);
  }
};

export default auth;
