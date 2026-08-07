import logger from '../utils/logger.js';

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  logger.error(err.message);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    error = ApiError.badRequest('Resource not found');
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error = ApiError.conflict(`${field} already exists`);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((val) => ({
      field: val.path,
      message: val.message,
    }));
    error = ApiError.badRequest('Validation failed', messages);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Internal Server Error',
    errors: error.errors || [],
  });
};

export default errorHandler;
