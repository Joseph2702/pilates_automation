import { test, expect } from '@playwright/test';
import { AdminLoginPage } from '../../../../../ui/pages/admin/login.page';
import { AdminDashboardPage } from '../../../../../ui/pages/admin/dashboard.page';
import { PackagesListPage } from '../../../../../ui/pages/admin/packages/packages-list.page';
import { PackagesFormPage } from '../../../../../ui/pages/admin/packages/packages-form.page';
import { envConfig } from '../../../../../shared/config/env.config';
import { RandomUtil } from '../../../../../shared/utils/random.util';

test.describe('UI - Admin Packages Create (Positive Scenarios)', () => {
  let loginPage: AdminLoginPage;
  let dashboardPage: AdminDashboardPage;
  let packagesListPage: PackagesListPage;
  let packagesFormPage: PackagesFormPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new AdminLoginPage(page);
    dashboardPage = new AdminDashboardPage(page);
    packagesListPage = new PackagesListPage(page);
    packagesFormPage = new PackagesFormPage(page);

    // Login as admin
    await loginPage.navigate();
    await loginPage.login(envConfig.ADMIN_EMAIL, envConfig.ADMIN_PASSWORD);
    await dashboardPage.isLoaded();
  });

  test('Navigate to packages page', async () => {
    await packagesListPage.navigate();

    expect(await packagesListPage.isLoaded()).toBe(true);
    expect(await packagesListPage.isTableVisible()).toBe(true);
    expect(await packagesListPage.isCreateButtonVisible()).toBe(true);
  });

  test('Create package with valid data', async ({ page }) => {
    await packagesListPage.navigate();
    await packagesListPage.clickCreateButton();

    const packageData = {
      name: `Test Package ${RandomUtil.generateString(5)}`,
      description: 'This is a test package',
      price: '250000',
      duration_days: '30',
      credit_session: '10',
    };

    await packagesFormPage.submitForm(packageData);

    // Verify success message or redirect to list
    expect(await packagesListPage.isLoaded()).toBe(true);
  });

  test('Create multiple packages with different data', async () => {
    const testPackages = [
      {
        name: 'Basic Package',
        description: 'Entry level package',
        price: '100000',
        duration_days: '7',
        credit_session: '3',
      },
      {
        name: 'Standard Package',
        description: 'Standard membership',
        price: '250000',
        duration_days: '30',
        credit_session: '10',
      },
      {
        name: 'Premium Package',
        description: 'Premium membership',
        price: '500000',
        duration_days: '90',
        credit_session: '30',
      },
    ];

    for (const pkgData of testPackages) {
      await packagesListPage.navigate();
      await packagesListPage.clickCreateButton();

      const packageData = {
        ...pkgData,
        name: `${pkgData.name} ${RandomUtil.generateString(3)}`,
      };

      await packagesFormPage.submitForm(packageData);
      expect(await packagesListPage.isLoaded()).toBe(true);
    }
  });

  test('Form fields are populated correctly', async () => {
    await packagesListPage.navigate();
    await packagesListPage.clickCreateButton();

    const testData = {
      name: 'Test Package',
      description: 'Test Description',
      price: '150000',
      duration_days: '15',
      credit_session: '5',
    };

    await packagesFormPage.fillForm(testData);

    expect(await packagesFormPage.getNameValue()).toBe(testData.name);
    expect(await packagesFormPage.getPriceValue()).toBe(testData.price);
    expect(await packagesFormPage.getDurationValue()).toBe(testData.duration_days);
    expect(await packagesFormPage.getCreditsValue()).toBe(testData.credit_session);
  });

  test('Cancel button returns to packages list', async () => {
    await packagesListPage.navigate();
    await packagesListPage.clickCreateButton();

    const testData = {
      name: 'Cancel Test Package',
      description: 'This should not be saved',
      price: '100000',
      duration_days: '10',
      credit_session: '5',
    };

    await packagesFormPage.fillForm(testData);
    await packagesFormPage.clickCancel();

    expect(await packagesListPage.isLoaded()).toBe(true);
  });

  test('Create package with various price points', async () => {
    const pricePoints = ['50000', '150000', '300000', '500000', '1000000'];

    for (const price of pricePoints) {
      await packagesListPage.navigate();
      await packagesListPage.clickCreateButton();

      const packageData = {
        name: `Package ${price} ${RandomUtil.generateString(3)}`,
        description: 'Price test package',
        price,
        duration_days: '30',
        credit_session: '10',
      };

      await packagesFormPage.submitForm(packageData);
      expect(await packagesListPage.isLoaded()).toBe(true);
    }
  });
});
