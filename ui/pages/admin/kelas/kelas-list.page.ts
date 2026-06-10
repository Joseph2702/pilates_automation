import { Page } from '@playwright/test';
import { uiConfig } from '../../../../shared/config/ui.config';

export class KelasListPage {
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

  getEditButton(kelasName: string) {
    return this.page.locator(`tr:has-text("${kelasName}") button:has-text("Edit")`);
  }

  getDeleteButton(kelasName: string) {
    return this.page.locator(`tr:has-text("${kelasName}") button:has-text("Delete")`);
  }

  getSearchInput() {
    return this.page.locator('input[placeholder*="Search"], input[placeholder*="search"]');
  }

  // Actions
  async navigate() {
    await this.page.goto(uiConfig.adminRoutes.kelas);
    await this.page.waitForLoadState('networkidle');
  }

  async clickCreateButton() {
    await this.getCreateButton().click();
    await this.page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {});
  }

  async clickEditButton(kelasName: string) {
    await this.getEditButton(kelasName).click();
    await this.page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {});
  }

  async clickDeleteButton(kelasName: string) {
    await this.getDeleteButton(kelasName).click();
  }

  async searchKelas(query: string) {
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

  async isKelasInList(kelasName: string) {
    return await this.page.locator(`text="${kelasName}"`).isVisible();
  }

  async isCreateButtonVisible() {
    return await this.getCreateButton().isVisible();
  }
}

export default KelasListPage;
