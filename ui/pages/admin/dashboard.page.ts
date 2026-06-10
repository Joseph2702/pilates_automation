import { Page } from '@playwright/test';
import { uiConfig } from '../../../shared/config/ui.config';

export class AdminDashboardPage {
  constructor(private page: Page) {}

  // Locators
  getSidebar() {
    return this.page.locator('[role="navigation"]');
  }

  getPageTitle() {
    return this.page.locator('h1');
  }

  getLogoutButton() {
    return this.page.locator('button:has-text("Logout"), a:has-text("Logout")');
  }

  getNavLink(module: string) {
    return this.page.locator(`a:has-text("${module}")`);
  }

  getUserMenu() {
    return this.page.locator('[data-testid="user-menu"]');
  }

  // Module navigation links
  getPackagesLink() {
    return this.getNavLink('Package');
  }

  getKelasLink() {
    return this.getNavLink('Kelas');
  }

  getInstrukturLink() {
    return this.getNavLink('Instruktur');
  }

  getPromoLink() {
    return this.getNavLink('Promo');
  }

  getArtikelLink() {
    return this.getNavLink('Artikel');
  }

  getJadwalKelasLink() {
    return this.getNavLink('Jadwal');
  }

  getBookingsLink() {
    return this.getNavLink('Booking');
  }

  getAbsensiLink() {
    return this.getNavLink('Absensi');
  }

  getPelangganLink() {
    return this.getNavLink('Pelanggan');
  }

  getTransaksiLink() {
    return this.getNavLink('Transaksi');
  }

  getUsersLink() {
    return this.getNavLink('User');
  }

  getRolesLink() {
    return this.getNavLink('Role');
  }

  getPermissionsLink() {
    return this.getNavLink('Permission');
  }

  // Actions
  async navigate() {
    await this.page.goto(uiConfig.adminRoutes.dashboard);
    await this.page.waitForLoadState('networkidle');
  }

  async clickLogout() {
    const logoutBtn = this.getLogoutButton();
    if (await logoutBtn.isVisible()) {
      await logoutBtn.click();
    } else {
      // Try user menu if exists
      const userMenu = this.getUserMenu();
      if (await userMenu.isVisible()) {
        await userMenu.click();
        await logoutBtn.click();
      }
    }
    await this.page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {
      // Navigation might not happen
    });
  }

  async navigateToModule(moduleName: string) {
    const link = this.getNavLink(moduleName);
    await link.click();
    await this.page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {
      // Navigation might not happen
    });
  }

  // Validations
  async isLoaded() {
    await this.page.waitForLoadState('networkidle');
    return await this.getPageTitle().isVisible();
  }

  async isSidebarVisible() {
    return await this.getSidebar().isVisible();
  }

  async isLogoutButtonVisible() {
    return await this.getLogoutButton().isVisible();
  }

  async getPageTitleText() {
    return await this.getPageTitle().textContent();
  }

  async getCurrentURL() {
    return this.page.url();
  }
}

export default AdminDashboardPage;
