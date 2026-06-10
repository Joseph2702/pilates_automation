import { Page } from '@playwright/test';
import { uiConfig } from '../../../shared/config/ui.config';

export class AdminLoginPage {
  constructor(private page: Page) {}

  // Locators
  getEmailInput() {
    return this.page.locator('input[name="email"]');
  }

  getPasswordInput() {
    return this.page.locator('input[name="password"]');
  }

  getLoginButton() {
    return this.page.locator('button[type="submit"]');
  }

  getErrorMessage() {
    return this.page.locator('[role="alert"]');
  }

  getPageTitle() {
    return this.page.locator('h1, h2');
  }

  // Actions
  async navigate() {
    await this.page.goto(uiConfig.adminRoutes.login);
    await this.page.waitForLoadState('networkidle');
  }

  async fillEmail(email: string) {
    await this.getEmailInput().fill(email);
  }

  async fillPassword(password: string) {
    await this.getPasswordInput().fill(password);
  }

  async clickLoginButton() {
    await this.getLoginButton().click();
  }

  async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLoginButton();
    // Wait for navigation after login
    await this.page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {
      // Navigation might not happen in some cases
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

  async isEmailInputVisible() {
    return await this.getEmailInput().isVisible();
  }

  async isPasswordInputVisible() {
    return await this.getPasswordInput().isVisible();
  }

  async isLoginButtonVisible() {
    return await this.getLoginButton().isVisible();
  }

  async isLoginButtonEnabled() {
    return await this.getLoginButton().isEnabled();
  }
}

export default AdminLoginPage;
