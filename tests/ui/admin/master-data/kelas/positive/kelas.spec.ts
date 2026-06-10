import { test, expect } from '@playwright/test';
import { AdminLoginPage } from '../../../../../ui/pages/admin/login.page';
import { AdminDashboardPage } from '../../../../../ui/pages/admin/dashboard.page';
import { KelasListPage } from '../../../../../ui/pages/admin/kelas/kelas-list.page';
import { KelasFormPage } from '../../../../../ui/pages/admin/kelas/kelas-form.page';
import { envConfig } from '../../../../../shared/config/env.config';
import { RandomUtil } from '../../../../../shared/utils/random.util';

test.describe('UI - Admin Kelas (Positive Scenarios)', () => {
  let loginPage: AdminLoginPage;
  let dashboardPage: AdminDashboardPage;
  let kelasListPage: KelasListPage;
  let kelasFormPage: KelasFormPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new AdminLoginPage(page);
    dashboardPage = new AdminDashboardPage(page);
    kelasListPage = new KelasListPage(page);
    kelasFormPage = new KelasFormPage(page);

    // Login as admin
    await loginPage.navigate();
    await loginPage.login(envConfig.ADMIN_EMAIL, envConfig.ADMIN_PASSWORD);
    await dashboardPage.isLoaded();
  });

  test('Navigate to kelas list page', async () => {
    await kelasListPage.navigate();

    expect(await kelasListPage.isLoaded()).toBe(true);
    expect(await kelasListPage.isTableVisible()).toBe(true);
    expect(await kelasListPage.isCreateButtonVisible()).toBe(true);
  });

  test('Display kelas list with data', async () => {
    await kelasListPage.navigate();

    const rowCount = await kelasListPage.getTableRowCount();
    expect(rowCount).toBeGreaterThan(0);
  });

  test('Create kelas with valid data', async () => {
    await kelasListPage.navigate();
    await kelasListPage.clickCreateButton();

    const kelasData = {
      name: `Kelas ${RandomUtil.generateString(5)}`,
      description: 'Test kelas description',
    };

    await kelasFormPage.submitForm(kelasData);

    // Should redirect to list
    expect(await kelasListPage.isLoaded()).toBe(true);
  });

  test('Create multiple kelas with different names', async () => {
    const testKelas = [
      'Yoga Pagi',
      'Pilates Pemula',
      'Zumba Malam',
      'Stretching',
      'Core Training',
    ];

    for (const kelasName of testKelas) {
      await kelasListPage.navigate();
      await kelasListPage.clickCreateButton();

      const kelasData = {
        name: `${kelasName} ${RandomUtil.generateString(3)}`,
        description: 'Test description',
      };

      await kelasFormPage.submitForm(kelasData);
      expect(await kelasListPage.isLoaded()).toBe(true);
    }
  });

  test('Form fields populated correctly', async () => {
    await kelasListPage.navigate();
    await kelasListPage.clickCreateButton();

    const testData = {
      name: 'Test Kelas',
      description: 'Test Description',
    };

    await kelasFormPage.fillForm(testData);

    expect(await kelasFormPage.getNameValue()).toBe(testData.name);
    expect(await kelasFormPage.getDescriptionValue()).toBe(testData.description);
  });

  test('Cancel button returns to kelas list', async () => {
    await kelasListPage.navigate();
    await kelasListPage.clickCreateButton();

    const testData = {
      name: 'Cancel Test Kelas',
      description: 'This should not be saved',
    };

    await kelasFormPage.fillForm(testData);
    await kelasFormPage.clickCancel();

    expect(await kelasListPage.isLoaded()).toBe(true);
  });

  test('Search kelas functionality', async () => {
    await kelasListPage.navigate();

    const initialCount = await kelasListPage.getTableRowCount();
    expect(initialCount).toBeGreaterThan(0);

    // Search for kelas
    await kelasListPage.searchKelas('Yoga');
    await kelasListPage.page.waitForLoadState('networkidle');

    const filteredCount = await kelasListPage.getTableRowCount();
    expect(filteredCount).toBeLessThanOrEqual(initialCount);
  });
});
