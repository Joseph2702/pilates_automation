# UI Components & Locators Guide

Complete reference for UI testing components, page objects, locators, and fixtures.

## 📦 Reusable Components

### 1. NavbarComponent
**Location:** `ui/components/navbar.component.ts`

Top navigation bar handling.

```typescript
import { NavbarComponent } from '@ui/components/navbar.component';
import { test } from '@playwright/test';

test('Navbar functionality', async ({ page }) => {
  const navbar = new NavbarComponent(page);
  
  await navbar.openUserMenu();
  await navbar.logout();
  await navbar.search('query');
  const hasNotifications = await navbar.hasNotificationBell();
});
```

**Methods:**
- `isVisible()` - Check navbar visibility
- `clickLogo()` - Click logo link
- `openUserMenu()` - Open user menu
- `logout()` - Logout user
- `search(query)` - Search functionality
- `hasSearchInput()` - Check search box
- `hasNotificationBell()` - Check notifications
- `clickNotificationBell()` - Open notifications

---

### 2. SidebarComponent
**Location:** `ui/components/sidebar.component.ts`

Admin sidebar navigation.

```typescript
import { SidebarComponent } from '@ui/components/sidebar.component';

test('Sidebar navigation', async ({ page }) => {
  const sidebar = new SidebarComponent(page);
  
  await sidebar.navigateTo('Packages');
  const isActive = await sidebar.getActiveMenuItem();
  await sidebar.toggleCollapse();
});
```

**Methods:**
- `isVisible()` - Check sidebar visibility
- `isCollapsed()` - Check if collapsed
- `toggleCollapse()` - Toggle collapse state
- `clickMenuItem(menuName)` - Click menu item
- `navigateTo(module)` - Navigate to module
- `getMenuItemsCount()` - Get menu items count
- `isMenuItemVisible(menuName)` - Check if item visible
- `getActiveMenuItem()` - Get active menu item
- `expandCategory(categoryName)` - Expand category

---

### 3. TableComponent
**Location:** `ui/components/table.component.ts`

Generic table operations for any data table.

```typescript
import { TableComponent } from '@ui/components/table.component';

test('Table operations', async ({ page }) => {
  const table = new TableComponent(page, 'table.data-table');
  
  const rowCount = await table.getRowCount();
  const headers = await table.getHeaderTexts();
  const rowData = await table.getRowData(0);
  
  const rowIndex = await table.findRowByValue('John');
  await table.clickRowButton(rowIndex, 'Edit');
  
  await table.sortByColumn(1);
  await table.selectRow(0);
});
```

**Methods:**
- `getRowCount()` - Get number of rows
- `getColumnCount()` - Get number of columns
- `getHeaderTexts()` - Get all header texts
- `getRowData(rowIndex)` - Get row data array
- `getCellValue(rowIndex, columnIndex)` - Get cell value
- `findRowByValue(searchValue)` - Find row by value
- `getRowByColumnValue(columnIndex, value)` - Find row by column
- `clickRowButton(rowIndex, buttonText)` - Click row button
- `clickRowActionMenu(rowIndex)` - Click row action menu
- `sortByColumn(columnIndex)` - Sort by column
- `isRowHighlighted(rowIndex)` - Check if row selected
- `selectRow(rowIndex)` - Select/check row
- `getAllRowValues(columnIndex)` - Get all column values
- `hasEmptyState()` - Check for empty state
- `waitForTable()` - Wait for table ready

---

### 4. FormComponent
**Location:** `ui/components/form.component.ts`

Generic form operations for any form.

```typescript
import { FormComponent } from '@ui/components/form.component';

test('Form operations', async ({ page }) => {
  const form = new FormComponent(page, 'form.user-form');
  
  await form.fillForm({
    email: 'test@example.com',
    password: 'password123',
    remember: true,
  });
  
  await form.submit();
  
  const hasErrors = await form.hasErrors();
  if (hasErrors) {
    const errorText = await form.getErrorText();
  }
});
```

**Methods:**
- `fillInput(name, value)` - Fill input field
- `selectOption(name, value)` - Select dropdown
- `checkCheckbox(name)` - Check checkbox
- `uncheckCheckbox(name)` - Uncheck checkbox
- `fillForm(data)` - Fill entire form
- `submit()` - Submit form
- `cancel()` - Cancel form
- `getInputValue(name)` - Get input value
- `getErrorText()` - Get error message
- `hasErrors()` - Check for errors
- `hasSuccessMessage()` - Check for success
- `getSuccessText()` - Get success message
- `isSubmitButtonEnabled()` - Check submit button
- `isSubmitButtonVisible()` - Check submit visible
- `clearField(name)` - Clear field
- `getInputCount()` - Get input count
- `waitForFormReady()` - Wait for form

---

### 5. ModalComponent
**Location:** `ui/components/modal.component.ts`

Modal/dialog handling.

```typescript
import { ModalComponent } from '@ui/components/modal.component';

test('Modal operations', async ({ page }) => {
  const modal = new ModalComponent(page, '[role="dialog"].confirm-modal');
  
  await modal.waitForModal();
  const title = await modal.getTitle();
  const content = await modal.getContent();
  
  await modal.confirm();
  await modal.waitForModalToClose();
});
```

**Methods:**
- `isVisible()` - Check modal visibility
- `close()` - Close modal
- `confirm()` - Click confirm
- `cancel()` - Click cancel
- `getTitle()` - Get modal title
- `getContent()` - Get modal content
- `getText()` - Get all text
- `isConfirmButtonVisible()` - Check confirm visible
- `isCancelButtonVisible()` - Check cancel visible
- `isCloseButtonVisible()` - Check close visible
- `waitForModal()` - Wait for modal
- `waitForModalToClose()` - Wait for close
- `clickOnContent(selector)` - Click element in modal
- `fillModalForm(data)` - Fill form in modal
- `getBackgroundOpacity()` - Get backdrop opacity

---

### 6. ToastComponent
**Location:** `ui/components/toast.component.ts`

Toast notifications handling.

```typescript
import { ToastComponent, ToastType } from '@ui/components/toast.component';

test('Toast notifications', async ({ page }) => {
  const toast = new ToastComponent(page);
  
  await toast.waitForToast();
  
  if (await toast.isSuccess()) {
    console.log(await toast.getMessage());
  }
  
  await toast.waitAndClose(2000); // Wait 2 seconds then close
});
```

**Methods:**
- `isVisible()` - Check toast visibility
- `getMessage()` - Get message
- `getToastCount()` - Get toast count
- `waitForToast(timeout)` - Wait for toast
- `waitForToastToDisappear(timeout)` - Wait disappear
- `getToastType()` - Get toast type
- `isSuccess()` - Check if success
- `isError()` - Check if error
- `isWarning()` - Check if warning
- `isInfo()` - Check if info
- `close()` - Close toast
- `waitAndClose(delayMs)` - Wait and close
- `getMessageByType(type)` - Get message by type
- `getAllMessages()` - Get all messages

---

## 🎯 Locator Libraries

### Common Locators
**Location:** `ui/locators/common.locators.ts`

Reusable selectors for common UI elements.

```typescript
import { COMMON_LOCATORS } from '@ui/locators/common.locators';

const submitBtn = COMMON_LOCATORS.buttons.submit;
const emailInput = COMMON_LOCATORS.inputs.email;
const alertMessage = COMMON_LOCATORS.feedback.alert;
```

**Available Groups:**
- `buttons` - Button selectors (submit, cancel, create, edit, etc.)
- `inputs` - Input selectors (email, password, name, phone, search)
- `selects` - Select/dropdown selectors
- `tables` - Table element selectors
- `navigation` - Nav/menu selectors
- `feedback` - Alert/message selectors
- `modals` - Modal selectors
- `pagination` - Pagination selectors
- `loading` - Loading state selectors
- `headers` - Heading selectors
- `links` - Link selectors

---

### Admin Locators
**Location:** `ui/locators/admin.locators.ts`

Admin panel specific selectors.

```typescript
import { ADMIN_LOCATORS } from '@ui/locators/admin.locators';

const packageForm = ADMIN_LOCATORS.packages.nameInput;
const kelasCreateBtn = ADMIN_LOCATORS.kelas.createButton;
const promoTable = ADMIN_LOCATORS.promo.table;
```

**Available Modules:**
- `modules` - Module navigation links
- `packages` - Packages CRUD selectors
- `kelas` - Kelas CRUD selectors
- `instruktur` - Instructor CRUD selectors
- `promo` - Promo CRUD selectors
- `artikel` - Article CRUD selectors
- `users` - User management selectors
- `roles` - Role management selectors
- `stats` - Dashboard stats selectors

---

### Customer Locators
**Location:** `ui/locators/customer.locators.ts`

Customer portal specific selectors.

```typescript
import { CUSTOMER_LOCATORS } from '@ui/locators/customer.locators';

const loginEmail = CUSTOMER_LOCATORS.login.emailInput;
const bookingsList = CUSTOMER_LOCATORS.bookings.list;
const checkoutBtn = CUSTOMER_LOCATORS.checkout.checkoutButton;
```

**Available Sections:**
- `auth` - Auth links
- `login` - Login page
- `register` - Register page
- `home` - Home page
- `classes` - Classes page
- `packages` - Packages page
- `bookings` - Bookings page
- `profile` - Profile page
- `transactions` - Transactions page
- `credit` - Credit section
- `checkout` - Checkout/Payment
- `articles` - Articles page
- `navbar` - Navigation bar

---

## 🔧 Fixtures

### AdminAuthFixture
**Location:** `ui/fixtures/admin-auth.fixture.ts`

Setup/teardown for admin authentication tests.

```typescript
import { AdminAuthFixture } from '@ui/fixtures/admin-auth.fixture';

test('Admin module test', async ({ page }) => {
  const auth = new AdminAuthFixture(page);
  
  await auth.loginAsAdmin();
  
  const dashboardPage = await auth.getDashboardPage();
  await dashboardPage.navigateToModule('Packages');
  
  await auth.logout();
});
```

**Methods:**
- `loginAsAdmin()` - Login to admin panel
- `logout()` - Logout from admin panel
- `navigateToDashboard()` - Go to dashboard
- `getPage()` - Get Playwright page
- `getLoginPage()` - Get login page object
- `getDashboardPage()` - Get dashboard page object

---

### CustomerAuthFixture
**Location:** `ui/fixtures/customer-auth.fixture.ts`

Setup/teardown for customer authentication tests.

```typescript
import { CustomerAuthFixture } from '@ui/fixtures/customer-auth.fixture';

test('Customer test', async ({ page }) => {
  const auth = new CustomerAuthFixture(page);
  
  await auth.loginAsCustomer();
  
  const homePage = await auth.getHomePage();
  await homePage.clickClassesLink();
  
  await auth.logout();
});
```

**Methods:**
- `loginAsCustomer()` - Login as customer
- `registerNewCustomer()` - Register new customer
- `logout()` - Logout
- `navigateToHome()` - Go to home
- `getPage()` - Get page object
- `getLoginPage()` - Get login page object
- `getRegisterPage()` - Get register page object
- `getHomePage()` - Get home page object

---

## 📋 Page Objects

### Admin Pages
- `AdminLoginPage` - Admin login page
- `AdminDashboardPage` - Admin dashboard
- `PackagesListPage` - Packages list
- `PackagesFormPage` - Packages form (create/edit)
- `KelasListPage` - Kelas list
- `KelasFormPage` - Kelas form

### Customer Pages
- `CustomerLoginPage` - Customer login
- `CustomerRegisterPage` - Customer register
- `CustomerHomePage` - Customer home

**All page objects include:**
- Locator getters
- Action methods
- Validation methods
- Fluent API for interactions

---

## 🎯 Best Practices

### 1. Using Components
```typescript
// ✅ Good - Use components for reusable logic
const form = new FormComponent(page, 'form.my-form');
await form.fillForm(data);
await form.submit();

// ❌ Avoid - Direct page interactions
await page.fill('input[name="name"]', 'John');
await page.click('button[type="submit"]');
```

### 2. Using Locators
```typescript
// ✅ Good - Use locator constants
const emailInput = page.locator(COMMON_LOCATORS.inputs.email);
await emailInput.fill('test@example.com');

// ❌ Avoid - Hardcoded selectors everywhere
await page.fill('input[type="email"]', 'test@example.com');
```

### 3. Using Page Objects
```typescript
// ✅ Good - Use page objects
const loginPage = new CustomerLoginPage(page);
await loginPage.login('email@example.com', 'password');

// ❌ Avoid - Testing implementation details
await page.fill('input[name="email"]', 'email@example.com');
await page.fill('input[name="password"]', 'password');
await page.click('button[type="submit"]');
```

### 4. Using Fixtures
```typescript
// ✅ Good - Use fixtures for setup
const auth = new AdminAuthFixture(page);
await auth.loginAsAdmin();

// ❌ Avoid - Repeated login code in each test
await page.goto('/admin/login');
await page.fill(...);
```

---

## 🚀 Creating New Components

### Template
```typescript
import { Page, Locator } from '@playwright/test';

export class MyComponent {
  private element: Locator;
  private button: Locator;

  constructor(private page: Page) {
    this.element = page.locator('selector');
    this.button = page.locator('button');
  }

  async isVisible(): Promise<boolean> {
    return await this.element.isVisible();
  }

  async clickButton(): Promise<void> {
    await this.button.click();
  }
}
```

### Checklist
- ✅ Extend Locators interface
- ✅ Create getters for each locator
- ✅ Create action methods
- ✅ Create validation methods
- ✅ Add JSDoc comments
- ✅ Export as default
- ✅ Add to index if needed

---

## 🔍 Debugging Tips

### 1. Inspect Locators
```typescript
const count = await page.locator('selector').count();
const text = await page.locator('selector').textContent();
```

### 2. Wait for Elements
```typescript
await page.locator('selector').waitFor({ state: 'visible' });
```

### 3. Screenshot on Failure
```typescript
if (await form.hasErrors()) {
  await page.screenshot({ path: 'error.png' });
}
```

### 4. Debug Trace
```typescript
await page.context().tracing.start({ screenshots: true });
// ... your test
await page.context().tracing.stop({ path: 'trace.zip' });
```

---

## 📚 Resources

- **Playwright Docs:** https://playwright.dev
- **Selectors Guide:** https://playwright.dev/docs/locators
- **Best Practices:** https://playwright.dev/docs/best-practices

---

**Happy Testing! 🎉**
