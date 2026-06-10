import { Page } from '@playwright/test';

export interface KelasFormData {
  name: string;
  description: string;
}

export class KelasFormPage {
  constructor(private page: Page) {}

  // Locators
  getPageTitle() {
    return this.page.locator('h1, h2');
  }

  getNameInput() {
    return this.page.locator('input[name="name"]');
  }

  getDescriptionInput() {
    return this.page.locator('textarea[name="description"]');
  }

  getSubmitButton() {
    return this.page.locator('button[type="submit"]');
  }

  getCancelButton() {
    return this.page.locator('button:has-text("Cancel"), a:has-text("Cancel")');
  }

  getErrorMessage() {
    return this.page.locator('[role="alert"]');
  }

  // Actions
  async fillName(name: string) {
    await this.getNameInput().fill(name);
  }

  async fillDescription(description: string) {
    await this.getDescriptionInput().fill(description);
  }

  async fillForm(data: KelasFormData) {
    await this.fillName(data.name);
    await this.fillDescription(data.description);
  }

  async clickSubmit() {
    await this.getSubmitButton().click();
    await this.page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {});
  }

  async clickCancel() {
    await this.getCancelButton().click();
    await this.page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {});
  }

  async submitForm(data: KelasFormData) {
    await this.fillForm(data);
    await this.clickSubmit();
  }

  // Validations
  async isLoaded() {
    await this.page.waitForLoadState('networkidle');
    return await this.getPageTitle().isVisible();
  }

  async isFormVisible() {
    return (
      (await this.getNameInput().isVisible()) &&
      (await this.getDescriptionInput().isVisible())
    );
  }

  async getNameValue() {
    return await this.getNameInput().inputValue();
  }

  async getDescriptionValue() {
    return await this.getDescriptionInput().inputValue();
  }
}

export default KelasFormPage;
