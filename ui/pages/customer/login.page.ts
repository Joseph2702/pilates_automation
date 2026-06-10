import { Page } from '@playwright/test';
import { uiConfig } from '../../../shared/config/ui.config';

export class CustomerLoginPage {
  constructor(private page: Page) {}

  // Locators
  getEmailInput() {
    return this.page.locator('input[name="email"], input[type="email"]');
  }

  getPasswordInput() {
    return this.page.locator('input[name="password"], input[type="password"]');
  }

  getLoginButton() {
    return this.page.locator('button[type="submit"]:has-text("Login"), button[type="submit"]:has-text("Sign In")');
  }

  getRegisterLink() {
    return this.page.locator('a:has-text("Register"), a:has-text("Sign Up"), a:has-text("Create Account")');
  }

  getErrorMessage() {
    return this.page.locator('[role="alert"]');
  }

  getPageTitle() {
    return this.page.locator('h1, h2');
  }

  getForgotPasswordLink() {
    return this.page.locator('a:has-text("Forgot"), a:has-text("forgot")');
  }

  // Actions
  async navigate() {
    await this.page.goto(uiConfig.customerRoutes.login);
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
    await this.page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {
      // Navigation might not happen
    });
  }

  async clickRegisterLink() {
    await this.getRegisterLink().click();
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

  async isRegisterLinkVisible() {
    return await this.getRegisterLink().isVisible();
  }

  async isForgotPasswordLinkVisible() {
    const link = this.getForgotPasswordLink();
    return await link.isVisible().catch(() => false);
  }
}

export default CustomerLoginPage;
