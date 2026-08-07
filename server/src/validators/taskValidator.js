import { body, param, query } from 'express-validator';

export const createTaskValidator = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 200 }).withMessage('Title cannot exceed 200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 2000 }).withMessage('Description cannot exceed 2000 characters'),
  body('status')
    .optional()
    .isIn(['pending', 'in-progress', 'completed']).withMessage('Invalid status'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),
  body('dueDate')
    .optional({ values: 'null' })
    .isISO8601().withMessage('Please provide a valid date'),
  body('category')
    .optional()
    .isIn(['work', 'personal', 'study', 'health', 'shopping', 'finance']).withMessage('Invalid category'),
  body('tags')
    .optional()
    .isArray().withMessage('Tags must be an array'),
  body('tags.*')
    .optional()
    .isString().withMessage('Each tag must be a string')
    .trim()
    .isLength({ max: 30 }).withMessage('Each tag cannot exceed 30 characters'),
  body('isFavorite')
    .optional()
    .isBoolean().withMessage('isFavorite must be a boolean'),
];

export const updateTaskValidator = [
  param('id')
    .isMongoId().withMessage('Invalid task ID'),
  body('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 }).withMessage('Title must be between 1 and 200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 2000 }).withMessage('Description cannot exceed 2000 characters'),
  body('status')
    .optional()
    .isIn(['pending', 'in-progress', 'completed']).withMessage('Invalid status'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),
  body('dueDate')
    .optional({ values: 'null' })
    .isISO8601().withMessage('Please provide a valid date'),
  body('category')
    .optional()
    .isIn(['work', 'personal', 'study', 'health', 'shopping', 'finance']).withMessage('Invalid category'),
  body('tags')
    .optional()
    .isArray().withMessage('Tags must be an array'),
  body('isFavorite')
    .optional()
    .isBoolean().withMessage('isFavorite must be a boolean'),
];

export const taskIdValidator = [
  param('id')
    .isMongoId().withMessage('Invalid task ID'),
];

export const getTasksValidator = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('status')
    .optional()
    .isIn(['pending', 'in-progress', 'completed']).withMessage('Invalid status'),
  query('priority')
    .optional()
    .isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),
  query('category')
    .optional()
    .isIn(['work', 'personal', 'study', 'health', 'shopping', 'finance']).withMessage('Invalid category'),
  query('sortBy')
    .optional()
    .isIn(['createdAt', 'updatedAt', 'dueDate', 'priority', 'title']).withMessage('Invalid sort field'),
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc']).withMessage('Sort order must be asc or desc'),
  query('search')
    .optional()
    .isString().withMessage('Search must be a string'),
];
