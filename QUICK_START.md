# Quick Start Guide

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env.test
```

Edit `.env.test` with your credentials:
```
BASE_URL=http://localhost:8000
API_BASE_URL=http://localhost:8000/api
ADMIN_EMAIL=admin@test.com
ADMIN_PASSWORD=password123
CUSTOMER_EMAIL=customer@test.com
CUSTOMER_PASSWORD=password123
```

## Running Tests

### ✅ Run All Tests
```bash
npm test
```

### 🎯 Run Specific Test Type

**API Tests Only**
```bash
npm run test:api
```

**UI Tests Only**
```bash
npm run test:ui
```

**Specific Test File**
```bash
npx playwright test tests/api/auth/positive/login.spec.ts
```

**With Heading (Open Browser)**
```bash
npm run test:headed
```

**Debug Mode (Pause & Inspect)**
```bash
npm run test:debug
```

## Common Commands

| Command | Purpose |
|---------|---------|
| `npm test` | Run all tests |
| `npm run test:ui` | UI tests only |
| `npm run test:api` | API tests only |
| `npm run test:headed` | Run with visible browser |
| `npm run test:debug` | Debug mode |
| `npm run test:report` | View HTML report |
| `npm run lint` | Check code style |
| `npm run format` | Auto-fix code style |

## Project Structure Summary

```
tests/
├── api/           → API endpoint tests
│   ├── auth/
│   ├── admin/
│   ├── pelanggan/
│   └── instruktur/
└── ui/            → UI/Browser tests
    ├── admin/
    ├── customer/
    └── instructor/

ui/pages/          → Page Objects (Locators & Actions)
api/clients/       → HTTP Clients (axios wrappers)
services/          → Business Logic Layer
shared/            → Config, Constants, Types, Utils
```

## Writing Your First Test

### API Test Example

**Create file:** `tests/api/admin/positive/kelas.spec.ts`

```typescript
import { test, expect } from '@playwright/test';
import { BaseClient } from '../../../../api/clients/base-client';
import { AuthClient } from '../../../../api/clients/auth-client';
import { LoginRequest } from '../../../../api/requests/auth/login.request';
import { ENDPOINTS } from '../../../../shared/constants/endpoints.constants';

test.describe('API - Admin Kelas (Positive)', () => {
  let adminClient: BaseClient;

  test.beforeAll(async () => {
    const authClient = new AuthClient();
    const loginResponse = await authClient.login(LoginRequest.adminUser());
    
    adminClient = new BaseClient();
    adminClient.setToken(loginResponse.data?.token!);
  });

  test('Get all kelas', async () => {
    const response = await adminClient.get(ENDPOINTS.ADMIN.KELAS.INDEX);
    
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(Array.isArray(response.data.data)).toBe(true);
  });
});
```

### UI Test Example

**Create file:** `tests/ui/admin/master-data/kelas/positive/create-kelas.spec.ts`

```typescript
import { test, expect } from '@playwright/test';
import { AdminLoginPage } from '../../../../../ui/pages/admin/login.page';
import { AdminDashboardPage } from '../../../../../ui/pages/admin/dashboard.page';
import { envConfig } from '../../../../../shared/config/env.config';
import { RandomUtil } from '../../../../../shared/utils/random.util';

test.describe('UI - Admin Kelas Create', () => {
  let loginPage: AdminLoginPage;
  let dashboardPage: AdminDashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new AdminLoginPage(page);
    dashboardPage = new AdminDashboardPage(page);

    await loginPage.navigate();
    await loginPage.login(envConfig.ADMIN_EMAIL, envConfig.ADMIN_PASSWORD);
  });

  test('Create kelas with valid data', async () => {
    // Your test here
  });
});
```

## Test Data

Predefined test users in `.env.test`:

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@test.com` | `password123` |
| Customer | `customer@test.com` | `password123` |
| Instructor | `instructor@test.com` | `instructor123` |

## Useful Utilities

### Generate Random Data
```typescript
import { RandomUtil } from '../../../../shared/utils/random.util';

const email = RandomUtil.generateEmail();       // → test.user.12345.xyz@example.com
const name = RandomUtil.generateUsername();     // → user_12345_xyz
const phone = RandomUtil.generatePhoneNumber(); // → 628123456789
const price = RandomUtil.generatePrice();       // → 250000
```

### Use Endpoints Constant
```typescript
import { ENDPOINTS } from '../../../../shared/constants/endpoints.constants';

const packageUrl = ENDPOINTS.ADMIN.PACKAGES.INDEX;           // /admin/packages
const specificUrl = ENDPOINTS.ADMIN.PACKAGES.SHOW(id);       // /admin/packages/1
const updateUrl = ENDPOINTS.ADMIN.PACKAGES.UPDATE(id);       // /admin/packages/1
```

## Debugging

### View Test Trace
```bash
npm run test:report
```

### Enable Debug Logs
```bash
DEBUG=pw:api npm test
```

### Run Single Test
```bash
npx playwright test tests/api/auth/positive/login.spec.ts -g "Login with valid"
```

## Tips & Tricks

1. **Fast iteration**: Use `--headed` to see browser actions in real-time
2. **Debug one test**: Add `.only` → `test.only('my test', async () => {...})`
3. **Skip tests**: Use `test.skip()` to temporarily skip
4. **Watch mode**: Use `--watch` flag for auto-rerun on file changes
5. **Parallel testing**: Tests run parallel by default, use `fullyParallel: false` if needed

## Common Issues

### ❌ Timeout Errors
```
Error: Timeout 30000ms exceeded
```
**Solution**: Increase timeout in test or check if app is running

### ❌ Authentication Failed
```
Error: Login failed: Invalid credentials
```
**Solution**: Check `.env.test` credentials match test users in system

### ❌ Navigation Errors
```
Error: Target page, context or browser has been closed
```
**Solution**: Page might have closed unexpectedly, check test isolation

## Next Steps

1. ✅ Install & Setup
2. ✅ Run existing tests
3. ✅ Review test structure
4. ✅ Write new tests
5. ✅ Run full test suite
6. ✅ View HTML reports

Happy testing! 🎉
