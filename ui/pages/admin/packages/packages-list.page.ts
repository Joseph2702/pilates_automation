import { Page } from '@playwright/test';
import { uiConfig } from '../../../../shared/config/ui.config';

export class PackagesListPage {
  constructor(private page: Page) {}

  // Locators
  getPageTitle() {
    return this.page.locator('h1, h2');
  }

  getCreateButton() {
    return this.page.locator('button:has-text("Create"), button:has-text("Tambah"), button:has-text("Add")');
  }

  getTable() {
    return this.page.locator('table');
  }

  getTableRows() {
    return this.page.locator('table tbody tr');
  }

  getEditButton(packageName: string) {
    return this.page.locator(`tr:has-text("${packageName}") button:has-text("Edit")`);
  }

  getDeleteButton(packageName: string) {
    return this.page.locator(`tr:has-text("${packageName}") button:has-text("Delete")`);
  }

  getSearchInput() {
    return this.page.locator('input[placeholder*="Search"], input[placeholder*="search"]');
  }

  getPaginationInfo() {
    return this.page.locator('[data-testid="pagination"], text=/Showing/');
  }

  // Actions
  async navigate() {
    await this.page.goto(uiConfig.adminRoutes.packages);
    await this.page.waitForLoadState('networkidle');
  }

  async clickCreateButton() {
    await this.getCreateButton().click();
    await this.page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {
      // Navigation might not happen
    });
  }

  async clickEditButton(packageName: string) {
    await this.getEditButton(packageName).click();
    await this.page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {
      // Navigation might not happen
    });
  }

  async clickDeleteButton(packageName: string) {
    await this.getDeleteButton(packageName).click();
  }

  async searchPackage(query: string) {
    const searchInput = this.getSearchInput();
    if (await searchInput.isVisible()) {
      await searchInput.fill(query);
      await this.page.keyboard.press('Enter');
      await this.page.waitForLoadState('networkidle');
    }
  }

  // Validations
  async isLoaded() {
    await this.page.waitForLoadState('networkidle');
    return await this.getPageTitle().isVisible();
  }

  async isTableVisible() {
    return await this.getTable().isVisible();
  }

  async getTableRowCount() {
    return await this.getTableRows().count();
  }

  async isPackageInList(packageName: string) {
    return await this.page.locator(`text="${packageName}"`).isVisible();
  }

  async isCreateButtonVisible() {
    return await this.getCreateButton().isVisible();
  }

  async isCreateButtonEnabled() {
    return await this.getCreateButton().isEnabled();
  }

  async getPageTitleText() {
    return await this.getPageTitle().textContent();
  }
}

export default PackagesListPage;
