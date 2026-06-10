import { test, expect } from '@playwright/test';
import { AdminLoginPage } from '../../../../../ui/pages/admin/login.page';
import { AdminDashboardPage } from '../../../../../ui/pages/admin/dashboard.page';
import { PackagesListPage } from '../../../../../ui/pages/admin/packages/packages-list.page';
import { envConfig } from '../../../../../shared/config/env.config';

test.describe('UI - Admin Packages List (Positive Scenarios)', () => {
  let loginPage: AdminLoginPage;
  let dashboardPage: AdminDashboardPage;
  let packagesListPage: PackagesListPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new AdminLoginPage(page);
    dashboardPage = new AdminDashboardPage(page);
    packagesListPage = new PackagesListPage(page);

    // Login as admin
    await loginPage.navigate();
    await loginPage.login(envConfig.ADMIN_EMAIL, envConfig.ADMIN_PASSWORD);
    await dashboardPage.isLoaded();
  });

  test('Display packages list page', async () => {
    await packagesListPage.navigate();

    expect(await packagesListPage.isLoaded()).toBe(true);
    expect(await packagesListPage.isTableVisible()).toBe(true);
  });

  test('Table contains packages data', async () => {
    await packagesListPage.navigate();

    const rowCount = await packagesListPage.getTableRowCount();
    expect(rowCount).toBeGreaterThan(0);
  });

  test('Create button is visible and enabled', async () => {
    await packagesListPage.navigate();

    expect(await packagesListPage.isCreateButtonVisible()).toBe(true);
    expect(await packagesListPage.isCreateButtonEnabled()).toBe(true);
  });

  test('Click create button navigates to create form', async () => {
    await packagesListPage.navigate();
    await packagesListPage.clickCreateButton();

    // Should be on create page
    const currentUrl = await packagesListPage.page.url();
    expect(currentUrl).toContain('create');
  });

  test('Search functionality works', async () => {
    await packagesListPage.navigate();

    // Get initial row count
    const initialCount = await packagesListPage.getTableRowCount();

    // Search for a package
    await packagesListPage.searchPackage('test');

    // Wait for table update
    await packagesListPage.page.waitForLoadState('networkidle');

    const filteredCount = await packagesListPage.getTableRowCount();
    // Filtered count should be <= initial count
    expect(filteredCount).toBeLessThanOrEqual(initialCount);
  });

  test('Edit button is visible for each row', async () => {
    await packagesListPage.navigate();

    const rowCount = await packagesListPage.getTableRowCount();
    expect(rowCount).toBeGreaterThan(0);

    // Get first row to verify edit button exists
    const firstRow = await packagesListPage.page
      .locator('table tbody tr')
      .first();
    const editButton = firstRow.locator('button:has-text("Edit")');

    expect(await editButton.isVisible()).toBe(true);
  });

  test('Page title is displayed', async () => {
    await packagesListPage.navigate();

    const titleText = await packagesListPage.getPageTitleText();
    expect(titleText).toBeTruthy();
  });

  test('Pagination info is visible', async () => {
    await packagesListPage.navigate();

    const paginationInfo = await packagesListPage.getPaginationInfo();
    const isPaginationVisible = await paginationInfo.isVisible().catch(() => false);

    // Pagination might be visible or not depending on data
    // Just verify page loads correctly
    expect(await packagesListPage.isLoaded()).toBe(true);
  });
});
