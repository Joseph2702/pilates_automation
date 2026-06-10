import { Page, Locator } from '@playwright/test';

export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

export class ToastComponent {
  private container: Locator;
  private toasts: Locator;

  constructor(private page: Page, containerSelector: string = '[role="alert"], [class*="toast"], [class*="notification"]') {
    this.container = page.locator(containerSelector).first();
    this.toasts = page.locator('[role="alert"], [class*="toast"], [class*="notification"]');
  }

  async isVisible(): Promise<boolean> {
    return await this.container.isVisible().catch(() => false);
  }

  async getMessage(): Promise<string | null> {
    return await this.container.textContent();
  }

  async getToastCount(): Promise<number> {
    return await this.toasts.count();
  }

  async waitForToast(timeout: number = 5000): Promise<void> {
    await this.container.waitFor({ state: 'visible', timeout });
  }

  async waitForToastToDisappear(timeout: number = 5000): Promise<void> {
    await this.container.waitFor({ state: 'hidden', timeout });
  }

  async getToastType(): Promise<string> {
    const classAttr = await this.container.getAttribute('class');
    if (classAttr?.includes('success')) return ToastType.SUCCESS;
    if (classAttr?.includes('error')) return ToastType.ERROR;
    if (classAttr?.includes('warning')) return ToastType.WARNING;
    if (classAttr?.includes('info')) return ToastType.INFO;
    return 'unknown';
  }

  async isSuccess(): Promise<boolean> {
    const type = await this.getToastType();
    return type === ToastType.SUCCESS;
  }

  async isError(): Promise<boolean> {
    const type = await this.getToastType();
    return type === ToastType.ERROR;
  }

  async isWarning(): Promise<boolean> {
    const type = await this.getToastType();
    return type === ToastType.WARNING;
  }

  async isInfo(): Promise<boolean> {
    const type = await this.getToastType();
    return type === ToastType.INFO;
  }

  async close(): Promise<void> {
    const closeButton = this.container.locator('button[aria-label="Close"], button:has-text("×")');
    if (await closeButton.isVisible()) {
      await closeButton.click();
    }
  }

  async waitAndClose(delayMs: number = 0): Promise<void> {
    await this.waitForToast();
    if (delayMs > 0) {
      await this.page.waitForTimeout(delayMs);
    }
    await this.close();
  }

  async getMessageByType(type: ToastType): Promise<string | null> {
    const toast = this.page.locator(`[role="alert"], [class*="toast"]`).filter({ has: this.page.locator(`[class*="${type}"]`) });
    return await toast.first().textContent();
  }

  async getAllMessages(): Promise<string[]> {
    const count = await this.getToastCount();
    const messages: string[] = [];
    for (let i = 0; i < count; i++) {
      const message = await this.toasts.nth(i).textContent();
      if (message) messages.push(message);
    }
    return messages;
  }
}

export default ToastComponent;
