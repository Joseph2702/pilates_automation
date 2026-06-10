import { Page } from '@playwright/test';
import { uiConfig } from '../../../shared/config/ui.config';

export interface RegisterFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
}

export class CustomerRegisterPage {
  constructor(private page: Page) {}

  // Locators
  getNameInput() {
    return this.page.locator('input[name="name"]');
  }

  getEmailInput() {
    return this.page.locator('input[name="email"], input[type="email"]');
  }

  getPhoneInput() {
    return this.page.locator('input[name="phone"], input[type="tel"]');
  }

  getPasswordInput() {
    return this.page.locator('input[name="password"]');
  }

  getPasswordConfirmInput() {
    return this.page.locator('input[name="password_confirmation"]');
  }

  getRegisterButton() {
    return this.page.locator('button[type="submit"]:has-text("Register"), button[type="submit"]:has-text("Sign Up")');
  }

  getLoginLink() {
    return this.page.locator('a:has-text("Login"), a:has-text("Sign In")');
  }

  getErrorMessage() {
    return this.page.locator('[role="alert"]');
  }

  getPageTitle() {
    return this.page.locator('h1, h2');
  }

  // Actions
  async navigate() {
    await this.page.goto(uiConfig.customerRoutes.register);
    await this.page.waitForLoadState('networkidle');
  }

  async fillName(name: string) {
    await this.getNameInput().fill(name);
  }

  async fillEmail(email: string) {
    await this.getEmailInput().fill(email);
  }

  async fillPhone(phone: string) {
    await this.getPhoneInput().fill(phone);
  }

  async fillPassword(password: string) {
    await this.getPasswordInput().fill(password);
  }

  async fillPasswordConfirm(password: string) {
    await this.getPasswordConfirmInput().fill(password);
  }

  async fillForm(data: RegisterFormData) {
    await this.fillName(data.name);
    await this.fillEmail(data.email);
    await this.fillPhone(data.phone);
    await this.fillPassword(data.password);
    await this.fillPasswordConfirm(data.password_confirmation);
  }

  async clickRegisterButton() {
    await this.getRegisterButton().click();
    await this.page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {
      // Navigation might not happen
    });
  }

  async submitForm(data: RegisterFormData) {
    await this.fillForm(data);
    await this.clickRegisterButton();
  }

  async clickLoginLink() {
    await this.getLoginLink().click();
    await this.page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {
      // Navigation might not happen
    });
  }

  async getErrorText() {
    return await this.getErrorMessage().textContent();
  }

  // Validations
  async isLoaded() {
    await this.page.waitForLoadState('networkidle');
    return await this.getPageTitle().isVisible();
  }

  async isFormVisible() {
    return (
      (await this.getNameInput().isVisible()) &&
      (await this.getEmailInput().isVisible()) &&
      (await this.getPhoneInput().isVisible())
    );
  }

  async getNameValue() {
    return await this.getNameInput().inputValue();
  }

  async getEmailValue() {
    return await this.getEmailInput().inputValue();
  }

  async getPhoneValue() {
    return await this.getPhoneInput().inputValue();
  }

  async isRegisterButtonEnabled() {
    return await this.getRegisterButton().isEnabled();
  }

  async isLoginLinkVisible() {
    return await this.getLoginLink().isVisible();
  }
}

export default CustomerRegisterPage;
