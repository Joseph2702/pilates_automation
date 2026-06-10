import { Page, Locator } from '@playwright/test';

export class FormComponent {
  private form: Locator;
  private submitButton: Locator;
  private cancelButton: Locator;
  private errorMessages: Locator;
  private successMessage: Locator;
  private inputs: Locator;

  constructor(private page: Page, formSelector: string = 'form') {
    this.form = page.locator(formSelector);
    this.submitButton = this.form.locator('button[type="submit"]');
    this.cancelButton = this.form.locator('button:has-text("Cancel"), a:has-text("Cancel")');
    this.errorMessages = this.form.locator('[role="alert"], .error, .text-error, [class*="error"]');
    this.successMessage = page.locator('[role="alert"]:has-text("Success"), .success, .text-success');
    this.inputs = this.form.locator('input, textarea, select');
  }

  async isVisible(): Promise<boolean> {
    return await this.form.isVisible();
  }

  async fillInput(name: string, value: string): Promise<void> {
    const input = this.form.locator(`[name="${name}"]`);
    await input.fill(value);
  }

  async selectOption(name: string, value: string): Promise<void> {
    const select = this.form.locator(`select[name="${name}"]`);
    await select.selectOption(value);
  }

  async checkCheckbox(name: string): Promise<void> {
    const checkbox = this.form.locator(`input[name="${name}"][type="checkbox"]`);
    await checkbox.check();
  }

  async uncheckCheckbox(name: string): Promise<void> {
    const checkbox = this.form.locator(`input[name="${name}"][type="checkbox"]`);
    await checkbox.uncheck();
  }

  async fillForm(data: Record<string, string | boolean>): Promise<void> {
    for (const [key, value] of Object.entries(data)) {
      const input = this.form.locator(`[name="${key}"]`);
      const type = await input.getAttribute('type').catch(() => null);

      if (type === 'checkbox') {
        if (value) {
          await this.checkCheckbox(key);
        } else {
          await this.uncheckCheckbox(key);
        }
      } else if (type === 'radio') {
        const radioButton = this.form.locator(`input[name="${key}"][value="${value}"]`);
        await radioButton.check();
      } else {
        const tagName = await input.evaluate((el) => el.tagName.toLowerCase());
        if (tagName === 'select') {
          await this.selectOption(key, value as string);
        } else {
          await this.fillInput(key, value as string);
        }
      }
    }
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
    await this.page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {});
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
    await this.page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {});
  }

  async getInputValue(name: string): Promise<string> {
    const input = this.form.locator(`[name="${name}"]`);
    return await input.inputValue();
  }

  async getErrorText(): Promise<string | null> {
    return await this.errorMessages.first().textContent();
  }

  async hasErrors(): Promise<boolean> {
    return (await this.errorMessages.count()) > 0;
  }

  async hasSuccessMessage(): Promise<boolean> {
    return await this.successMessage.isVisible().catch(() => false);
  }

  async getSuccessText(): Promise<string | null> {
    return await this.successMessage.textContent();
  }

  async isSubmitButtonEnabled(): Promise<boolean> {
    return await this.submitButton.isEnabled();
  }

  async isSubmitButtonVisible(): Promise<boolean> {
    return await this.submitButton.isVisible();
  }

  async clearField(name: string): Promise<void> {
    const input = this.form.locator(`[name="${name}"]`);
    await input.clear();
  }

  async getInputCount(): Promise<number> {
    return await this.inputs.count();
  }

  async waitForFormReady(): Promise<void> {
    await this.form.waitFor({ state: 'visible' });
  }
}

export default FormComponent;
