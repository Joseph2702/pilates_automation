import { Page } from '@playwright/test';
import { CustomerLoginPage } from '../pages/customer/login.page';
import { CustomerRegisterPage } from '../pages/customer/register.page';
import { CustomerHomePage } from '../pages/customer/home.page';
import { envConfig } from '../../shared/config/env.config';
import { RandomUtil } from '../../shared/utils/random.util';

export class CustomerAuthFixture {
  private loginPage: CustomerLoginPage;
  private registerPage: CustomerRegisterPage;
  private homePage: CustomerHomePage;

  constructor(private page: Page) {
    this.loginPage = new CustomerLoginPage(page);
    this.registerPage = new CustomerRegisterPage(page);
    this.homePage = new CustomerHomePage(page);
  }

  async loginAsCustomer(): Promise<void> {
    await this.loginPage.navigate();
    await this.loginPage.login(envConfig.CUSTOMER_EMAIL, envConfig.CUSTOMER_PASSWORD);
    // Wait for navigation
    await this.page.waitForLoadState('networkidle');
  }

  async registerNewCustomer(): Promise<string> {
    const email = RandomUtil.generateEmail();
    const password = 'Password123!';

    await this.registerPage.navigate();
    await this.registerPage.submitForm({
      name: 'Test Customer',
      email,
      phone: RandomUtil.generatePhoneNumber(),
      password,
      password_confirmation: password,
    });

    return email;
  }

  async logout(): Promise<void> {
    await this.homePage.page.click('button:has-text("Logout"), a:has-text("Logout")').catch(() => {});
    await this.page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {});
  }

  async navigateToHome(): Promise<void> {
    await this.homePage.navigate();
  }

  async getPage(): Page {
    return this.page;
  }

  async getLoginPage(): CustomerLoginPage {
    return this.loginPage;
  }

  async getRegisterPage(): CustomerRegisterPage {
    return this.registerPage;
  }

  async getHomePage(): CustomerHomePage {
    return this.homePage;
  }
}

export default CustomerAuthFixture;
