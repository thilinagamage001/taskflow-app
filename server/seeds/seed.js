import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

import User from '../src/models/User.js';
import Task from '../src/models/Task.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/taskflow';

const sampleTasks = [
  {
    title: 'Complete project proposal',
    description: 'Write and submit the Q1 project proposal for the new client portal.',
    status: 'in-progress',
    priority: 'high',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    category: 'work',
    tags: ['proposal', 'client', 'q1'],
  },
  {
    title: 'Review pull requests',
    description: 'Review and approve pending pull requests from the team.',
    status: 'pending',
    priority: 'medium',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    category: 'work',
    tags: ['code-review', 'github'],
  },
  {
    title: 'Grocery shopping',
    description: 'Buy vegetables, fruits, milk, and other household items.',
    status: 'pending',
    priority: 'low',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    category: 'shopping',
    tags: ['groceries', 'weekly'],
  },
  {
    title: 'Morning workout routine',
    description: 'Complete 30-minute cardio and strength training session.',
    status: 'completed',
    priority: 'medium',
    dueDate: new Date(),
    category: 'health',
    tags: ['exercise', 'daily'],
  },
  {
    title: 'Read "Clean Code" chapters 5-8',
    description: 'Continue reading Clean Code by Robert C. Martin.',
    status: 'in-progress',
    priority: 'medium',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    category: 'study',
    tags: ['reading', 'programming'],
  },
  {
    title: 'Pay electricity bill',
    description: 'Pay the monthly electricity bill before the due date.',
    status: 'pending',
    priority: 'high',
    dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    category: 'finance',
    tags: ['bills', 'utilities'],
  },
  {
    title: 'Schedule dentist appointment',
    description: 'Call and schedule a dental checkup for next month.',
    status: 'pending',
    priority: 'low',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    category: 'health',
    tags: ['appointment', 'dental'],
  },
  {
    title: 'Prepare presentation slides',
    description: 'Create slides for the upcoming team meeting about Q2 roadmap.',
    status: 'in-progress',
    priority: 'high',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    category: 'work',
    tags: ['presentation', 'meeting'],
  },
  {
    title: 'Learn React hooks',
    description: 'Study useState, useEffect, useContext, and custom hooks.',
    status: 'completed',
    priority: 'medium',
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    category: 'study',
    tags: ['react', 'javascript'],
  },
  {
    title: 'Update portfolio website',
    description: 'Add recent projects and update the about section.',
    status: 'pending',
    priority: 'low',
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    category: 'personal',
    tags: ['portfolio', 'website'],
  },
  {
    title: 'Organize home office',
    description: 'Declutter and organize the home office workspace.',
    status: 'pending',
    priority: 'low',
    dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
    category: 'personal',
    tags: ['organization', 'home'],
  },
  {
    title: 'Fix authentication bug',
    description: 'Investigate and fix the JWT token refresh issue reported by QA.',
    status: 'completed',
    priority: 'high',
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    category: 'work',
    tags: ['bug', 'authentication'],
  },
  {
    title: 'Plan weekend trip',
    description: 'Research destinations and book accommodation for the weekend getaway.',
    status: 'pending',
    priority: 'low',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    category: 'personal',
    tags: ['travel', 'weekend'],
  },
  {
    title: 'Complete online course module',
    description: 'Finish Module 3 of the Node.js advanced concepts course.',
    status: 'in-progress',
    priority: 'medium',
    dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    category: 'study',
    tags: ['course', 'nodejs'],
  },
  {
    title: 'Investment portfolio review',
    description: 'Review and rebalance investment portfolio with financial advisor.',
    status: 'pending',
    priority: 'medium',
    dueDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
    category: 'finance',
    tags: ['investment', 'planning'],
  },
  {
    title: 'Run 5K training',
    description: 'Complete Week 4 of the Couch to 5K training program.',
    status: 'pending',
    priority: 'medium',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    category: 'health',
    tags: ['running', 'training'],
  },
  {
    title: 'Code refactoring sprint',
    description: 'Refactor legacy code in the payment module to improve maintainability.',
    status: 'pending',
    priority: 'high',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    category: 'work',
    tags: ['refactoring', 'code-quality'],
  },
  {
    title: 'Buy birthday gift for friend',
    description: 'Find and purchase a birthday gift. Party is on the 25th.',
    status: 'pending',
    priority: 'medium',
    dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
    category: 'shopping',
    tags: ['gift', 'birthday'],
  },
  {
    title: 'Meditation practice',
    description: 'Complete 20-minute guided meditation session.',
    status: 'completed',
    priority: 'low',
    dueDate: new Date(),
    category: 'health',
    tags: ['meditation', 'mindfulness'],
  },
  {
    title: 'Write technical blog post',
    description: 'Draft a blog post about building REST APIs with Node.js and Express.',
    status: 'in-progress',
    priority: 'medium',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    category: 'personal',
    tags: ['writing', 'blog', 'nodejs'],
  },
];

const seed = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    logger.info('Connected to MongoDB');

    await User.deleteMany({});
    await Task.deleteMany({});
    logger.info('Cleared existing data');

    const user = await User.create({
      name: 'Demo User',
      email: 'demo@taskflow.com',
      password: 'Demo1234',
    });
    logger.info(`Created user: ${user.email}`);

    const tasks = sampleTasks.map((task) => ({
      ...task,
      userId: user._id,
    }));

    await Task.insertMany(tasks);
    logger.info(`Created ${tasks.length} sample tasks`);

    logger.info('\n--- Seed Complete ---');
    logger.info('Login credentials:');
    logger.info('  Email: demo@taskflow.com');
    logger.info('  Password: Demo1234');

    process.exit(0);
  } catch (error) {
    logger.error('Seed failed:', error.message);
    process.exit(1);
  }
};

const logger = {
  info: (...args) => console.log('[INFO]', ...args),
  error: (...args) => console.error('[ERROR]', ...args),
};

seed();
