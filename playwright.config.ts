import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'reports/html-report' }],
    ['json', { outputFile: 'reports/test-results.json' }],
    ['junit', { outputFile: 'reports/junit.xml' }],
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],

  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:8000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000,
    navigationTimeout: 30000,
    extraHTTPHeaders: {
        'ngrok-skip-browser-warning': 'true',   // ← TAMBAH INI
    },
  },

  globalTimeout: 30 * 60 * 1000,
  timeout: 30 * 1000,

  projects: [
    {
      name: 'api-smoke',
      testDir: './tests/api/auth',
      use: { browserName: 'chromium' },
    },
    {
      name: 'api-regression',
      testDir: './tests/api',
      use: { browserName: 'chromium' },
    },

    // ─── UI TESTS ───
    {
      name: 'ui-smoke',
      testDir: './tests/ui/customer/auth',
      use: {
        browserName: 'chromium',
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
      },
    },
    {
      name: 'ui-regression',
      testDir: './tests/ui',
      use: {
        browserName: 'chromium',
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
      },
    },
  ],
});
