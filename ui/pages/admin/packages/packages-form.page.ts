import { Page } from '@playwright/test';

export interface PackageFormData {
  name: string;
  description: string;
  price: string;
  duration_days: string;
  credit_session: string;
}

export class PackagesFormPage {
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

  getPriceInput() {
    return this.page.locator('input[name="price"]');
  }

  getDurationInput() {
    return this.page.locator('input[name="duration_days"]');
  }

  getCreditsInput() {
    return this.page.locator('input[name="credit_session"]');
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

  async fillPrice(price: string) {
    await this.getPriceInput().fill(price);
  }

  async fillDuration(duration: string) {
    await this.getDurationInput().fill(duration);
  }

  async fillCredits(credits: string) {
    await this.getCreditsInput().fill(credits);
  }

  async fillForm(data: PackageFormData) {
    await this.fillName(data.name);
    await this.fillDescription(data.description);
    await this.fillPrice(data.price);
    await this.fillDuration(data.duration_days);
    await this.fillCredits(data.credit_session);
  }

  async clearForm() {
    await this.getNameInput().clear();
    await this.getDescriptionInput().clear();
    await this.getPriceInput().clear();
    await this.getDurationInput().clear();
    await this.getCreditsInput().clear();
  }

  async clickSubmit() {
    await this.getSubmitButton().click();
    await this.page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {
      // Navigation might not happen
    });
  }

  async clickCancel() {
    await this.getCancelButton().click();
    await this.page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {
      // Navigation might not happen
    });
  }

  async submitForm(data: PackageFormData) {
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
      (await this.getPriceInput().isVisible())
    );
  }

  async getErrorText() {
    return await this.getErrorMessage().textContent();
  }

  async isNameInputFocused() {
    return await this.getNameInput().evaluate((el) => el === document.activeElement);
  }

  async getNameValue() {
    return await this.getNameInput().inputValue();
  }

  async getPriceValue() {
    return await this.getPriceInput().inputValue();
  }

  async getDurationValue() {
    return await this.getDurationInput().inputValue();
  }

  async getCreditsValue() {
    return await this.getCreditsInput().inputValue();
  }
}

export default PackagesFormPage;
