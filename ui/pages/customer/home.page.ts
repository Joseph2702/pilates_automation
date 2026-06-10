import { Page } from '@playwright/test';
import { uiConfig } from '../../../shared/config/ui.config';

export class CustomerHomePage {
  constructor(private page: Page) {}

  // Locators
  getPageTitle() {
    return this.page.locator('h1, h2');
  }

  getClassesLink() {
    return this.page.locator('a:has-text("Classes"), a:has-text("Kelas")');
  }

  getPackagesLink() {
    return this.page.locator('a:has-text("Packages"), a:has-text("Paket")');
  }

  getArticlesLink() {
    return this.page.locator('a:has-text("Articles"), a:has-text("Artikel")');
  }

  getLoginLink() {
    return this.page.locator('a:has-text("Login"), a:has-text("Sign In")');
  }

  getRegisterLink() {
    return this.page.locator('a:has-text("Register"), a:has-text("Sign Up")');
  }

  getProfileLink() {
    return this.page.locator('a:has-text("Profile")');
  }

  getLogoutButton() {
    return this.page.locator('button:has-text("Logout")');
  }

  getNavbar() {
    return this.page.locator('nav');
  }

  // Actions
  async navigate() {
    await this.page.goto(uiConfig.customerRoutes.home);
    await this.page.waitForLoadState('networkidle');
  }

  async clickClassesLink() {
    await this.getClassesLink().click();
    await this.page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {
      // Navigation might not happen
    });
  }

  async clickPackagesLink() {
    await this.getPackagesLink().click();
    await this.page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {
      // Navigation might not happen
    });
  }

  async clickArticlesLink() {
    await this.getArticlesLink().click();
    await this.page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {
      // Navigation might not happen
    });
  }

  async clickLoginLink() {
    await this.getLoginLink().click();
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

  async clickProfileLink() {
    await this.getProfileLink().click();
    await this.page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {
      // Navigation might not happen
    });
  }

  // Validations
  async isLoaded() {
    await this.page.waitForLoadState('networkidle');
    return await this.getPageTitle().isVisible();
  }

  async isLoggedIn() {
    return await this.getProfileLink().isVisible();
  }

  async isLoggedOut() {
    return await this.getLoginLink().isVisible();
  }

  async isNavbarVisible() {
    return await this.getNavbar().isVisible();
  }

  async hasClassesLink() {
    return await this.getClassesLink().isVisible();
  }

  async hasPackagesLink() {
    return await this.getPackagesLink().isVisible();
  }

  async hasArticlesLink() {
    return await this.getArticlesLink().isVisible();
  }
}

export default CustomerHomePage;
