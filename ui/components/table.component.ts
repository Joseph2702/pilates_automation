import { Page, Locator } from '@playwright/test';

export interface TableCell {
  rowIndex: number;
  columnIndex: number;
  value: string;
}

export class TableComponent {
  private table: Locator;
  private headers: Locator;
  private rows: Locator;
  private cells: Locator;

  constructor(private page: Page, tableSelector: string = 'table') {
    this.table = page.locator(tableSelector);
    this.headers = page.locator(`${tableSelector} thead th, ${tableSelector} thead td`);
    this.rows = page.locator(`${tableSelector} tbody tr`);
    this.cells = page.locator(`${tableSelector} tbody td`);
  }

  async isVisible(): Promise<boolean> {
    return await this.table.isVisible();
  }

  async getRowCount(): Promise<number> {
    return await this.rows.count();
  }

  async getColumnCount(): Promise<number> {
    return await this.headers.count();
  }

  async getHeaderTexts(): Promise<string[]> {
    const texts: string[] = [];
    const count = await this.getColumnCount();
    for (let i = 0; i < count; i++) {
      const text = await this.headers.nth(i).textContent();
      texts.push(text || '');
    }
    return texts;
  }

  async getRowData(rowIndex: number): Promise<string[]> {
    const rowCells = this.rows.nth(rowIndex).locator('td');
    const count = await rowCells.count();
    const data: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await rowCells.nth(i).textContent();
      data.push(text || '');
    }
    return data;
  }

  async getCellValue(rowIndex: number, columnIndex: number): Promise<string | null> {
    return await this.rows.nth(rowIndex).locator('td').nth(columnIndex).textContent();
  }

  async findRowByValue(searchValue: string): Promise<number> {
    const count = await this.getRowCount();
    for (let i = 0; i < count; i++) {
      const rowText = await this.rows.nth(i).textContent();
      if (rowText?.includes(searchValue)) {
        return i;
      }
    }
    return -1;
  }

  async getRowByColumnValue(columnIndex: number, value: string): Promise<number> {
    const count = await this.getRowCount();
    for (let i = 0; i < count; i++) {
      const cellValue = await this.getCellValue(i, columnIndex);
      if (cellValue?.includes(value)) {
        return i;
      }
    }
    return -1;
  }

  async clickRowButton(rowIndex: number, buttonText: string): Promise<void> {
    const button = this.rows.nth(rowIndex).locator(`button:has-text("${buttonText}")`);
    await button.click();
  }

  async clickRowActionMenu(rowIndex: number): Promise<void> {
    const actionMenu = this.rows.nth(rowIndex).locator('[data-testid="row-menu"], button:has-text("⋯")');
    await actionMenu.click();
  }

  async sortByColumn(columnIndex: number): Promise<void> {
    const header = this.headers.nth(columnIndex);
    await header.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isRowHighlighted(rowIndex: number): Promise<boolean> {
    const row = this.rows.nth(rowIndex);
    const classAttr = await row.getAttribute('class');
    return classAttr?.includes('active') || classAttr?.includes('selected') || false;
  }

  async selectRow(rowIndex: number): Promise<void> {
    const checkbox = this.rows.nth(rowIndex).locator('input[type="checkbox"]');
    if (await checkbox.isVisible()) {
      await checkbox.click();
    }
  }

  async getAllRowValues(columnIndex: number): Promise<string[]> {
    const values: string[] = [];
    const count = await this.getRowCount();
    for (let i = 0; i < count; i++) {
      const value = await this.getCellValue(i, columnIndex);
      if (value) values.push(value);
    }
    return values;
  }

  async hasEmptyState(): Promise<boolean> {
    const emptyMessage = this.page.locator('text=/No data|empty|tidak ada/i');
    return await emptyMessage.isVisible().catch(() => false);
  }

  async waitForTable(): Promise<void> {
    await this.table.waitFor({ state: 'visible' });
    await this.page.waitForLoadState('networkidle');
  }
}

export default TableComponent;
