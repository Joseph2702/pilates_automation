import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

export const envConfig = {
  // Base URLs
  BASE_URL: process.env.BASE_URL || 'http://localhost:8000',
  API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:8000/api',

  // Database
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: parseInt(process.env.DB_PORT || '5432', 10),
  DB_NAME: process.env.DB_NAME || 'pilates_test',
  DB_USER: process.env.DB_USER || 'linkit',
  DB_PASSWORD: process.env.DB_PASSWORD || '',


  // Test Data
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@pilates.com',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'admin123',
  CUSTOMER_EMAIL: process.env.CUSTOMER_EMAIL || 'johnpantau@gmail.com',
  CUSTOMER_PASSWORD: process.env.CUSTOMER_PASSWORD || 'password',
  INSTRUCTOR_EMAIL: process.env.INSTRUCTOR_EMAIL || 'jono@femm.com',
  INSTRUCTOR_PASSWORD: process.env.INSTRUCTOR_PASSWORD || 'password',

  // Timeouts
  TIMEOUT: parseInt(process.env.TIMEOUT || '30000', 10),
  NAVIGATION_TIMEOUT: parseInt(process.env.NAVIGATION_TIMEOUT || '30000', 10),

  // Environment
  ENV: process.env.ENV || 'test',
  DEBUG: process.env.DEBUG === 'true',
};

export default envConfig;
