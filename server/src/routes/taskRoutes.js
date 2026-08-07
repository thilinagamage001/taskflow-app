import { Router } from 'express';
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  duplicateTask,
  getDashboardStats,
} from '../controllers/taskController.js';
import auth from '../middleware/auth.js';
import { createTaskValidator, updateTaskValidator, taskIdValidator, getTasksValidator } from '../validators/taskValidator.js';
import validate from '../middleware/validate.js';

const router = Router();

router.use(auth);

router.get('/dashboard', getDashboardStats);
router.get('/', getTasksValidator, validate, getTasks);
router.get('/:id', taskIdValidator, validate, getTask);
router.post('/', createTaskValidator, validate, createTask);
router.put('/:id', updateTaskValidator, validate, updateTask);
router.delete('/:id', taskIdValidator, validate, deleteTask);
router.post('/:id/duplicate', taskIdValidator, validate, duplicateTask);

export default router;
