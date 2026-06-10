import { Page, Locator } from '@playwright/test';

export class ModalComponent {
  private modal: Locator;
  private closeButton: Locator;
  private title: Locator;
  private confirmButton: Locator;
  private cancelButton: Locator;
  private content: Locator;

  constructor(private page: Page, modalSelector: string = '[role="dialog"]') {
    this.modal = page.locator(modalSelector);
    this.closeButton = this.modal.locator('button[aria-label="Close"], button:has-text("×"), button:has-text("✕")');
    this.title = this.modal.locator('h1, h2, h3, [class*="title"]');
    this.confirmButton = this.modal.locator('button:has-text("Confirm"), button:has-text("OK"), button:has-text("Yes")');
    this.cancelButton = this.modal.locator('button:has-text("Cancel"), button:has-text("No")');
    this.content = this.modal.locator('[class*="content"], [class*="body"]');
  }

  async isVisible(): Promise<boolean> {
    return await this.modal.isVisible();
  }

  async close(): Promise<void> {
    await this.closeButton.click();
    await this.page.waitForTimeout(300);
  }

  async confirm(): Promise<void> {
    await this.confirmButton.click();
    await this.page.waitForTimeout(300);
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
    await this.page.waitForTimeout(300);
  }

  async getTitle(): Promise<string | null> {
    return await this.title.textContent();
  }

  async getContent(): Promise<string | null> {
    return await this.content.textContent();
  }

  async getText(): Promise<string | null> {
    return await this.modal.textContent();
  }

  async isConfirmButtonVisible(): Promise<boolean> {
    return await this.confirmButton.isVisible().catch(() => false);
  }

  async isCancelButtonVisible(): Promise<boolean> {
    return await this.cancelButton.isVisible().catch(() => false);
  }

  async isCloseButtonVisible(): Promise<boolean> {
    return await this.closeButton.isVisible().catch(() => false);
  }

  async waitForModal(): Promise<void> {
    await this.modal.waitFor({ state: 'visible' });
  }

  async waitForModalToClose(): Promise<void> {
    await this.modal.waitFor({ state: 'hidden' });
  }

  async clickOnContent(selector: string): Promise<void> {
    const element = this.modal.locator(selector);
    await element.click();
  }

  async fillModalForm(data: Record<string, string>): Promise<void> {
    for (const [key, value] of Object.entries(data)) {
      const input = this.modal.locator(`[name="${key}"]`);
      await input.fill(value);
    }
  }

  async getBackgroundOpacity(): Promise<string | null> {
    const backdrop = this.page.locator('[class*="backdrop"], [class*="overlay"]').first();
    return await backdrop.evaluate((el) => window.getComputedStyle(el).opacity);
  }
}

export default ModalComponent;
