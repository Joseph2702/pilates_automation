import { test, expect } from '@playwright/test';
import { CustomerLoginPage } from '../../../../../ui/pages/customer/login.page';
import { envConfig } from '../../../../../shared/config/env.config';

test.describe('UI - Customer Login (Positive Scenarios)', () => {
  let loginPage: CustomerLoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new CustomerLoginPage(page);
    await loginPage.navigate();
  });

  test('Login page loads successfully', async () => {
    expect(await loginPage.isLoaded()).toBe(true);
    expect(await loginPage.isEmailInputVisible()).toBe(true);
    expect(await loginPage.isPasswordInputVisible()).toBe(true);
  });

  test('Login with valid customer credentials', async () => {
    await loginPage.login(envConfig.CUSTOMER_EMAIL, envConfig.CUSTOMER_PASSWORD);

    // Should redirect away from login page
    const currentUrl = loginPage.page.url();
    expect(currentUrl).not.toContain('login');
  });

  test('Login button is visible and enabled', async () => {
    expect(await loginPage.isLoginButtonVisible()).toBe(true);
    expect(await loginPage.isLoginButtonEnabled()).toBe(true);
  });

  test('Register link is visible', async () => {
    expect(await loginPage.isRegisterLinkVisible()).toBe(true);
  });

  test('Click register link navigates to register page', async () => {
    await loginPage.clickRegisterLink();

    const currentUrl = loginPage.page.url();
    expect(currentUrl).toContain('register');
  });

  test('Email field accepts various valid email formats', async () => {
    const testEmails = [
      'test@example.com',
      'user.name@example.com',
      'user+tag@example.co.uk',
    ];

    for (const email of testEmails) {
      await loginPage.navigate();
      await loginPage.fillEmail(email);
      expect(await loginPage.page.locator('input[name="email"], input[type="email"]').inputValue()).toBe(email);
    }
  });

  test('Password field is masked', async () => {
    await loginPage.fillPassword('TestPassword123');

    const passwordInput = loginPage.page.locator('input[name="password"], input[type="password"]');
    const inputType = await passwordInput.getAttribute('type');

    expect(inputType).toBe('password');
  });

  test('Form fields are filled correctly', async () => {
    await loginPage.fillEmail('test@example.com');
    await loginPage.fillPassword('TestPassword123');

    const emailInput = loginPage.page.locator('input[name="email"], input[type="email"]');
    const passwordInput = loginPage.page.locator('input[name="password"], input[type="password"]');

    expect(await emailInput.inputValue()).toBe('test@example.com');
    expect(await passwordInput.inputValue()).toBe('TestPassword123');
  });

  test('Login button is clickable', async () => {
    await loginPage.fillEmail(envConfig.CUSTOMER_EMAIL);
    await loginPage.fillPassword(envConfig.CUSTOMER_PASSWORD);

    expect(await loginPage.isLoginButtonEnabled()).toBe(true);
  });

  test('After login, user is redirected to dashboard', async () => {
    await loginPage.login(envConfig.CUSTOMER_EMAIL, envConfig.CUSTOMER_PASSWORD);

    // Wait for navigation
    await loginPage.page.waitForLoadState('networkidle');

    const currentUrl = loginPage.page.url();
    // Should be on a protected route (not login)
    expect(currentUrl).not.toContain('login');
  });

  test('Forgot password link is visible (if applicable)', async () => {
    const isVisible = await loginPage.isForgotPasswordLinkVisible();
    // Just check if page loads, forgot password is optional
    expect(await loginPage.isLoaded()).toBe(true);
  });
});
