import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Try to load .env.test if it exists, but don't fail if it doesn't
// This allows CI/CD to use environment variables without needing a file
const envTestPath = path.resolve(process.cwd(), '.env.test');
if (fs.existsSync(envTestPath)) {
  dotenv.config({ path: envTestPath });
}

/**
 * Environment configuration
 * 
 * Priority order:
 * 1. Environment variables (process.env) - set by Jenkins/CI or .env.test
 * 2. Hardcoded defaults for local development
 */
export const envConfig = {
  // Base URLs - CRITICAL: These must come from environment in CI/CD
  BASE_URL: process.env.BASE_URL || 'http://localhost:8000',
  API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:8000/api',

  // Database
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: parseInt(process.env.DB_PORT || '5432', 10),
  DB_NAME: process.env.DB_NAME || 'pilates_test',
  DB_USER: process.env.DB_USER || 'linkit',
  DB_PASSWORD: process.env.DB_PASSWORD || '',

  // Test Data - CRITICAL: These must come from environment in CI/CD
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@pilates.com',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'admin123',
  CUSTOMER_EMAIL: process.env.CUSTOMER_EMAIL || 'customer@test.com',
  CUSTOMER_PASSWORD: process.env.CUSTOMER_PASSWORD || 'password',
  INSTRUCTOR_EMAIL: process.env.INSTRUCTOR_EMAIL || 'jono@femm.com',
  INSTRUCTOR_PASSWORD: process.env.INSTRUCTOR_PASSWORD || 'password',

  // Timeouts
  TIMEOUT: parseInt(process.env.TIMEOUT || '30000', 10),
  NAVIGATION_TIMEOUT: parseInt(process.env.NAVIGATION_TIMEOUT || '30000', 10),

  // Environment
  ENV: process.env.ENV || 'test',
  DEBUG: process.env.DEBUG === 'true',

  // Helper to validate configuration
  validate(): void {
    const errors: string[] = [];
    
    // Check critical URLs
    if (!this.BASE_URL || this.BASE_URL === 'undefined') {
      errors.push('BASE_URL is not set');
    }
    if (!this.API_BASE_URL || this.API_BASE_URL === 'undefined') {
      errors.push('API_BASE_URL is not set');
    }
    
    if (errors.length > 0) {
      console.error('❌ Configuration Errors:');
      errors.forEach(err => console.error(`  - ${err}`));
      console.error('\nℹ️  For CI/CD, ensure these environment variables are set in Jenkinsfile');
      console.error('ℹ️  For local development, create a .env.test file with these values');
      throw new Error('Invalid environment configuration');
    }
  }
};

// Validate on import
envConfig.validate();

export default envConfig;
