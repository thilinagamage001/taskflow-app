import dotenv from 'dotenv';

dotenv.config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 5000,
  mongoose: {
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/taskflow',
    options: {},
  },
  jwtSecret: process.env.JWT_SECRET || 'fallback_secret',
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  uploadDir: process.env.UPLOAD_DIR || 'uploads',
};

export default config;
