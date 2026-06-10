import { Page, Locator } from '@playwright/test';

export class SidebarComponent {
  private sidebar: Locator;
  private menuItems: Locator;
  private collapseButton: Locator;

  constructor(private page: Page) {
    this.sidebar = page.locator('[role="navigation"], aside, .sidebar, [class*="sidebar"]');
    this.menuItems = page.locator('a[href*="/admin"], [role="navigation"] a');
    this.collapseButton = page.locator('button[aria-label*="menu"], button[aria-label*="toggle"]');
  }

  async isVisible(): Promise<boolean> {
    return await this.sidebar.isVisible();
  }

  async isCollapsed(): Promise<boolean> {
    const width = await this.sidebar.evaluate((el) => window.getComputedStyle(el).width);
    return width === '0px' || width === 'auto';
  }

  async toggleCollapse(): Promise<void> {
    await this.collapseButton.click();
    await this.page.waitForTimeout(300);
  }

  async clickMenuItem(menuName: string): Promise<void> {
    const menuItem = this.page.locator(`a:has-text("${menuName}"), button:has-text("${menuName}")`);
    await menuItem.click();
    await this.page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {});
  }

  async navigateTo(module: string): Promise<void> {
    await this.clickMenuItem(module);
  }

  async getMenuItemsCount(): Promise<number> {
    return await this.menuItems.count();
  }

  async isMenuItemVisible(menuName: string): Promise<boolean> {
    const menuItem = this.page.locator(`a:has-text("${menuName}"), button:has-text("${menuName}")`);
    return await menuItem.isVisible().catch(() => false);
  }

  async getActiveMenuItem(): Promise<string | null> {
    return await this.page.locator('[role="navigation"] a.active, [role="navigation"] a[aria-current="page"]').textContent();
  }

  async expandCategory(categoryName: string): Promise<void> {
    const expandButton = this.page.locator(`button:has-text("${categoryName}"), [data-testid="${categoryName}-expand"]`);
    if (await expandButton.isVisible()) {
      await expandButton.click();
      await this.page.waitForTimeout(300);
    }
  }

  async getSidebarText(): Promise<string | null> {
    return await this.sidebar.textContent();
  }
}

export default SidebarComponent;
