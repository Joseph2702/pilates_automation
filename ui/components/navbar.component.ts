import { Page, Locator } from '@playwright/test';

export class NavbarComponent {
  private navbar: Locator;
  private logoLink: Locator;
  private userMenu: Locator;
  private logoutButton: Locator;
  private searchInput: Locator;
  private notificationBell: Locator;

  constructor(private page: Page) {
    this.navbar = page.locator('nav, [role="navigation"]');
    this.logoLink = page.locator('a[href="/"], a[href="/admin"]');
    this.userMenu = page.locator('[data-testid="user-menu"], button:has-text("Profile"), button:has-text("Account")');
    this.logoutButton = page.locator('button:has-text("Logout"), a:has-text("Logout")');
    this.searchInput = page.locator('input[placeholder*="Search"]');
    this.notificationBell = page.locator('[data-testid="notifications"], button:has-text("🔔")');
  }

  async isVisible(): Promise<boolean> {
    return await this.navbar.isVisible();
  }

  async clickLogo(): Promise<void> {
    await this.logoLink.click();
  }

  async openUserMenu(): Promise<void> {
    await this.userMenu.click();
  }

  async logout(): Promise<void> {
    await this.openUserMenu();
    await this.logoutButton.click();
    await this.page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {});
  }

  async search(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.page.keyboard.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  async hasSearchInput(): Promise<boolean> {
    return await this.searchInput.isVisible().catch(() => false);
  }

  async hasNotificationBell(): Promise<boolean> {
    return await this.notificationBell.isVisible().catch(() => false);
  }

  async clickNotificationBell(): Promise<void> {
    await this.notificationBell.click();
  }

  async getNavbarText(): Promise<string | null> {
    return await this.navbar.textContent();
  }
}

export default NavbarComponent;
