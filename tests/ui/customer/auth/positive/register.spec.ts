import { test, expect } from '@playwright/test';
import { CustomerRegisterPage } from '../../../../../ui/pages/customer/register.page';
import { RandomUtil } from '../../../../../shared/utils/random.util';

test.describe('UI - Customer Register (Positive Scenarios)', () => {
  let registerPage: CustomerRegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new CustomerRegisterPage(page);
    await registerPage.navigate();
  });

  test('Register page loads successfully', async () => {
    expect(await registerPage.isLoaded()).toBe(true);
    expect(await registerPage.isFormVisible()).toBe(true);
  });

  test('Register with valid data', async () => {
    const formData = {
      name: 'Test Customer',
      email: RandomUtil.generateEmail(),
      phone: RandomUtil.generatePhoneNumber(),
      password: 'Password123!',
      password_confirmation: 'Password123!',
    };

    await registerPage.submitForm(formData);

    // Should redirect to dashboard or home
    const currentUrl = registerPage.page.url();
    expect(currentUrl).not.toContain('register');
  });

  test('Form fields are populated correctly', async () => {
    const formData = {
      name: 'John Doe',
      email: RandomUtil.generateEmail(),
      phone: RandomUtil.generatePhoneNumber(),
      password: 'Password123!',
      password_confirmation: 'Password123!',
    };

    await registerPage.fillForm(formData);

    expect(await registerPage.getNameValue()).toBe(formData.name);
    expect(await registerPage.getEmailValue()).toBe(formData.email);
    expect(await registerPage.getPhoneValue()).toBe(formData.phone);
  });

  test('Register with various names', async () => {
    const testNames = ['John Doe', 'Muhammad Ali', 'Ana García', '李明'];

    for (const name of testNames) {
      const formData = {
        name,
        email: RandomUtil.generateEmail(),
        phone: RandomUtil.generatePhoneNumber(),
        password: 'Password123!',
        password_confirmation: 'Password123!',
      };

      await registerPage.navigate();
      await registerPage.submitForm(formData);

      // Verify redirect
      const currentUrl = registerPage.page.url();
      expect(currentUrl).not.toContain('register');
    }
  });

  test('Register with different phone numbers', async () => {
    const testPhones = ['628123456789', '6281234567890', '6289876543210'];

    for (const phone of testPhones) {
      const formData = {
        name: 'Test Customer',
        email: RandomUtil.generateEmail(),
        phone,
        password: 'Password123!',
        password_confirmation: 'Password123!',
      };

      await registerPage.navigate();
      await registerPage.submitForm(formData);

      // Verify redirect
      const currentUrl = registerPage.page.url();
      expect(currentUrl).not.toContain('register');
    }
  });

  test('Login link is visible', async () => {
    expect(await registerPage.isLoginLinkVisible()).toBe(true);
  });

  test('Click login link navigates to login page', async () => {
    await registerPage.clickLoginLink();

    const currentUrl = registerPage.page.url();
    expect(currentUrl).toContain('login');
  });

  test('Register button is enabled', async () => {
    const formData = {
      name: 'Test Customer',
      email: RandomUtil.generateEmail(),
      phone: RandomUtil.generatePhoneNumber(),
      password: 'Password123!',
      password_confirmation: 'Password123!',
    };

    await registerPage.fillForm(formData);
    expect(await registerPage.isRegisterButtonEnabled()).toBe(true);
  });

  test('Register with minimum valid data', async () => {
    const formData = {
      name: 'A',
      email: RandomUtil.generateEmail(),
      phone: '628123456789',
      password: 'Pass123!',
      password_confirmation: 'Pass123!',
    };

    await registerPage.submitForm(formData);

    const currentUrl = registerPage.page.url();
    expect(currentUrl).not.toContain('register');
  });
});
