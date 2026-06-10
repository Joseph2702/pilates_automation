import { Page } from '@playwright/test';
import { AdminLoginPage } from '../pages/admin/login.page';
import { AdminDashboardPage } from '../pages/admin/dashboard.page';
import { envConfig } from '../../shared/config/env.config';

export class AdminAuthFixture {
  private loginPage: AdminLoginPage;
  private dashboardPage: AdminDashboardPage;

  constructor(private page: Page) {
    this.loginPage = new AdminLoginPage(page);
    this.dashboardPage = new AdminDashboardPage(page);
  }

  async loginAsAdmin(): Promise<void> {
    await this.loginPage.navigate();
    await this.loginPage.login(envConfig.ADMIN_EMAIL, envConfig.ADMIN_PASSWORD);
    await this.dashboardPage.isLoaded();
  }

  async logout(): Promise<void> {
    await this.dashboardPage.clickLogout();
  }

  async navigateToDashboard(): Promise<void> {
    await this.dashboardPage.navigate();
  }

  async getPage(): Page {
    return this.page;
  }

  async getLoginPage(): AdminLoginPage {
    return this.loginPage;
  }

  async getDashboardPage(): AdminDashboardPage {
    return this.dashboardPage;
  }
}

export default AdminAuthFixture;
