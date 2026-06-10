# Pilates Management System - QA Automation

Comprehensive test automation suite for the Pilates Management System API and UI, built with Playwright and TypeScript.

## 📁 Project Structure

```
pilates-automation/
├── tests/                    # Test specifications
│   ├── api/                 # API test specs
│   ├── ui/                  # UI test specs
│   └── e2e/                 # End-to-end tests
├── api/                     # API testing layer
│   ├── clients/             # HTTP clients
│   ├── requests/            # Request builders
│   ├── payloads/            # Payload models
│   ├── validators/          # Response validators
│   └── fixtures/            # Test data fixtures
├── ui/                      # UI testing layer
│   ├── pages/               # Page objects
│   ├── components/          # Reusable components
│   ├── locators/            # Element selectors
│   └── fixtures/            # UI fixtures
├── services/                # Business logic layer
│   ├── api/                 # API services
│   ├── ui/                  # UI services
│   └── data/                # Data management
├── shared/                  # Shared layer
│   ├── config/              # Configuration files
│   ├── constants/           # Constants
│   ├── enums/               # Enumerations
│   ├── types/               # Type definitions
│   ├── utils/               # Utility functions
│   └── helpers/             # Helper functions
├── test-data/               # Test data
├── reports/                 # Test reports
└── scripts/                 # Setup/cleanup scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- TypeScript 5+
- Playwright 1.40+
- Access to Pilates Management System

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Setup environment**
   ```bash
   cp .env.example .env.test
   ```

3. **Update .env.test with your credentials**
   ```
   BASE_URL=http://localhost:8000
   API_BASE_URL=http://localhost:8000/api
   ADMIN_EMAIL=your-admin@email.com
   ADMIN_PASSWORD=your-password
   # ... other credentials
   ```

## 📖 Running Tests

### Run all tests
```bash
npm test
```

### Run UI tests only
```bash
npm run test:ui
```

### Run API tests only
```bash
npm run test:api
```

### Run E2E tests
```bash
npm run test:e2e
```

### Run with UI (headed mode)
```bash
npm run test:headed
```

### Debug mode
```bash
npm run test:debug
```

### View test report
```bash
npm run test:report
```

## 🏗️ Architecture

### Layered Architecture

**Test Specifications Layer** (`tests/`)
- Organized by module and feature
- Separated into positive/negative scenarios
- Pure test logic only

**API Testing Layer** (`api/`)
- `clients/` - HTTP clients with authentication
- `requests/` - Request builders with fluent API
- `payloads/` - Type-safe request/response models
- `validators/` - Response assertion helpers
- `fixtures/` - Mock data and test data

**UI Testing Layer** (`ui/`)
- `pages/` - Page Object Model implementations
- `components/` - Reusable UI components
- `locators/` - Centralized element selectors
- `fixtures/` - Page fixtures and setup

**Services Layer** (`services/`)
- `api/` - Higher-level API operations
- `ui/` - Higher-level UI operations
- `data/` - Database and data management

**Shared Layer** (`shared/`)
- `config/` - Environment and test configuration
- `constants/` - Endpoints, messages, selectors
- `enums/` - Enumerations (roles, statuses)
- `types/` - TypeScript interfaces
- `utils/` - Utility functions (random data, helpers)
- `helpers/` - Assertion and wait helpers

## 🔐 Authentication

### Admin User
```
Email: admin@test.com
Password: password123
```

### Customer User
```
Email: customer@test.com
Password: password123
```

### Instructor User
```
Email: instructor@test.com
Password: instructor123
```

## 📋 Test Coverage

### API Testing

**Authentication**
- ✅ Register with valid data
- ✅ Login with valid credentials
- ✅ Logout functionality
- ✅ Get user profile

**Admin Operations**
- ✅ Packages (CRUD)
- ✅ Classes/Kelas (CRUD)
- ✅ Instructors (CRUD)
- ✅ Promos (CRUD)
- ✅ Articles (CRUD)
- ✅ Jadwal Kelas (CRUD)
- ✅ Bookings (View)
- ✅ Absensi (Create, List)
- ✅ Users (CRUD)
- ✅ Roles (CRUD)
- ✅ Permissions (CRUD)
- ✅ Transactions (View)
- ✅ Activity Logs (View)

**Customer Operations**
- ✅ View Classes
- ✅ View Packages
- ✅ Book Classes
- ✅ View Bookings
- ✅ View Profile
- ✅ View Transactions
- ✅ View Credit

**Instructor Operations**
- ✅ View Jadwal
- ✅ Mark Absensi

### UI Testing

**Admin Panel**
- ✅ Login
- ✅ Dashboard
- ✅ Packages (List, Create, Edit, Delete)
- ✅ Kelas (List, Create, Edit, Delete)
- ✅ Instruktur (List, Create, Edit, Delete)
- ✅ Promo (List, Create, Edit, Delete)
- ✅ Artikel (List, Create, Edit, Delete)

**Customer Portal**
- ✅ Register
- ✅ Login
- ✅ View Classes
- ✅ View Packages
- ✅ Book Classes
- ✅ View Profile
- ✅ Edit Profile

## 🛠️ Writing Tests

### API Test Example

```typescript
import { test, expect } from '@playwright/test';
import { AuthClient } from '../../../../api/clients/auth-client';
import { LoginRequest } from '../../../../api/requests/auth/login.request';

test.describe('API - Auth', () => {
  let authClient: AuthClient;

  test.beforeEach(() => {
    authClient = new AuthClient();
  });

  test('Login with valid credentials', async () => {
    const payload = LoginRequest.adminUser();
    const response = await authClient.login(payload);

    expect(response.success).toBe(true);
    expect(response.data?.token).toBeTruthy();
  });
});
```

### UI Test Example

```typescript
import { test, expect } from '@playwright/test';
import { AdminLoginPage } from '../../../../../ui/pages/admin/login.page';

test.describe('UI - Admin Login', () => {
  let loginPage: AdminLoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new AdminLoginPage(page);
  });

  test('Login with valid credentials', async () => {
    await loginPage.navigate();
    await loginPage.login('admin@test.com', 'password123');

    expect(loginPage.page.url()).not.toContain('login');
  });
});
```

## 📊 Test Reports

Reports are generated in `reports/` directory:
- `html-report/` - Interactive HTML report
- `test-results.json` - JSON results
- `junit.xml` - JUnit format for CI/CD

View HTML report:
```bash
npm run test:report
```

## 🔧 Configuration

### Environment Variables (`.env.test`)

| Variable | Description |
|----------|-------------|
| `BASE_URL` | Application base URL |
| `API_BASE_URL` | API base URL |
| `ADMIN_EMAIL` | Admin user email |
| `ADMIN_PASSWORD` | Admin user password |
| `CUSTOMER_EMAIL` | Customer user email |
| `CUSTOMER_PASSWORD` | Customer password |
| `TIMEOUT` | Default timeout in ms |

### Playwright Config

Key settings in `playwright.config.ts`:
- Browser projects: Chromium, Firefox, WebKit
- Screenshot/video: On failure
- Trace: On first retry
- Reporters: HTML, JSON, JUnit

## 🎯 Best Practices

1. **Test Organization**
   - One test file per feature/module
   - Positive scenarios in `positive/` folder
   - Negative scenarios in `negative/` folder

2. **Page Objects**
   - Separate locators from actions
   - Reusable page objects
   - Fluent API for interactions

3. **Data Management**
   - Use request builders for test data
   - Centralize test credentials
   - Clean up after tests

4. **Assertions**
   - Use descriptive assertion messages
   - Validate response structure
   - Check both happy and edge paths

5. **Error Handling**
   - Graceful navigation handling
   - Meaningful error messages
   - Proper test isolation

## 📝 Naming Conventions

- **Test files**: `feature.spec.ts`
- **Page objects**: `module-name.page.ts`
- **Services**: `module-name.service.ts`
- **Requests**: `module-name.request.ts`
- **Test suites**: `API - Module Action` or `UI - Module Action`

## 🚀 CI/CD Integration

Tests can be integrated into CI/CD pipelines:

```bash
# Run with CI configuration
CI=true npm test

# Generate reports
npm run test:report
```

## 📦 Dependencies

- `@playwright/test` - E2E testing framework
- `axios` - HTTP client
- `dotenv` - Environment variables
- `typescript` - Type support
- `eslint` - Code linting
- `prettier` - Code formatting

## 🤝 Contributing

1. Follow the layered architecture
2. Write tests in TypeScript
3. Use meaningful test names
4. Add documentation for complex tests
5. Run linting before commits

```bash
npm run lint
npm run format
```

## 📞 Support

For issues or questions, refer to:
- Playwright docs: https://playwright.dev
- Project CLAUDE.md: Architecture and setup guide

## 📄 License

ISC License - See LICENSE file for details
