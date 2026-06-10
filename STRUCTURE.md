# Project Structure & File Guide

Complete directory tree with descriptions of every component.

```
pilates-automation/
│
├── 📄 README.md                          # Complete project documentation
├── 📄 QUICK_START.md                     # Quick start guide (START HERE!)
├── 📄 PROJECT_SUMMARY.md                 # What was created & next steps
├── 📄 STRUCTURE.md                       # This file - detailed guide
├── 📄 .env.example                       # Environment variables template
├── 📄 .env.test                          # Test environment (generated)
├── 📄 .gitignore                         # Git ignore rules
├── 📄 package.json                       # NPM dependencies & scripts
├── 📄 tsconfig.json                      # TypeScript configuration
├── 📄 playwright.config.ts               # Playwright test runner config
│
│
├── 🔹 tests/                             # TEST SPECIFICATIONS LAYER
│   │
│   ├── 📂 api/                           # API Test Specs
│   │   ├── auth/
│   │   │   └── positive/
│   │   │       ├── login.spec.ts         # ✅ Login test cases
│   │   │       └── register.spec.ts      # ✅ Register test cases
│   │   └── admin/
│   │       └── positive/
│   │           └── packages.spec.ts      # ✅ Packages CRUD tests
│   │
│   ├── 📂 ui/                            # UI Test Specs
│   │   ├── admin/
│   │   │   └── master-data/packages/positive/
│   │   │       ├── create-package.spec.ts    # ✅ Create package tests
│   │   │       └── list-packages.spec.ts     # ✅ List packages tests
│   │   └── customer/
│   │       └── auth/positive/
│   │           ├── login.spec.ts         # ✅ Customer login tests
│   │           └── register.spec.ts      # ✅ Customer register tests
│   │
│   └── 📂 e2e/                           # E2E Tests (Ready to add)
│       └── user-journey/
│
│
├── 🔹 api/                               # API TESTING LAYER
│   │
│   ├── 📂 clients/                       # HTTP Clients
│   │   ├── base-client.ts                # 🔷 Base Axios wrapper
│   │   │                                  #    - Token management
│   │   │                                  #    - Interceptors
│   │   ├── auth-client.ts                # 🔷 Auth client
│   │   │                                  #    - register()
│   │   │                                  #    - login()
│   │   │                                  #    - logout()
│   │   │                                  #    - getMe()
│   │   └── admin-client.ts               # 🔷 Admin client
│   │                                      #    - CRUD operations
│   │                                      #    - Package management
│   │
│   ├── 📂 requests/                      # Request Builders
│   │   ├── auth/
│   │   │   ├── login.request.ts          # 🔷 Login request builder
│   │   │   │                              #    - adminUser()
│   │   │   │                              #    - customerUser()
│   │   │   │                              #    - instructorUser()
│   │   │   └── register.request.ts       # 🔷 Register builder
│   │   │                                  #    - valid()
│   │   │                                  #    - withEmail()
│   │   │                                  #    - withName()
│   │   └── admin/
│   │       └── packages.request.ts       # 🔷 Packages builder
│   │                                      #    - createValid()
│   │                                      #    - createWithPrice()
│   │                                      #    - updateValid()
│   │
│   ├── 📂 payloads/                      # Response Models (future)
│   │
│   ├── 📂 validators/                    # Response Validators (future)
│   │
│   └── 📂 fixtures/                      # Test Data Fixtures (future)
│
│
├── 🔹 ui/                                # UI TESTING LAYER
│   │
│   ├── 📂 pages/                         # Page Objects (POM)
│   │   │
│   │   ├── admin/                        # Admin panel page objects
│   │   │   ├── login.page.ts             # 📄 Admin login page
│   │   │   │                              #    - navigate()
│   │   │   │                              #    - login(email, pass)
│   │   │   │                              #    - getErrorText()
│   │   │   │
│   │   │   ├── dashboard.page.ts         # 📄 Admin dashboard page
│   │   │   │                              #    - navigateToModule()
│   │   │   │                              #    - clickLogout()
│   │   │   │                              #    - Module navigation links
│   │   │   │
│   │   │   └── packages/
│   │   │       ├── packages-list.page.ts # 📄 Packages list page
│   │   │       │                          #    - getTableRows()
│   │   │       │                          #    - clickCreateButton()
│   │   │       │                          #    - searchPackage()
│   │   │       │
│   │   │       └── packages-form.page.ts # 📄 Packages form page
│   │   │                                  #    - fillForm()
│   │   │                                  #    - submitForm()
│   │   │                                  #    - Form field actions
│   │   │
│   │   └── customer/                     # Customer portal page objects
│   │       ├── login.page.ts             # 📄 Customer login
│   │       ├── register.page.ts          # 📄 Customer register
│   │       └── home.page.ts              # 📄 Customer home page
│   │
│   ├── 📂 components/                    # Reusable Components (future)
│   │   ├── navbar.component.ts
│   │   ├── sidebar.component.ts
│   │   ├── table.component.ts
│   │   ├── form.component.ts
│   │   ├── modal.component.ts
│   │   └── toast.component.ts
│   │
│   ├── 📂 locators/                      # Locator Libraries (future)
│   │   ├── admin/
│   │   │   └── packages.locators.ts
│   │   ├── customer/
│   │   │   └── login.locators.ts
│   │   └── common.locators.ts
│   │
│   └── 📂 fixtures/                      # UI Test Fixtures
│       ├── browser.fixture.ts
│       ├── admin-user.fixture.ts
│       └── customer-user.fixture.ts
│
│
├── 🔹 services/                          # BUSINESS LOGIC LAYER
│   │
│   ├── 📂 api/                           # API Services
│   │   ├── auth.service.ts               # 🔧 Auth service
│   │   │                                  #    - registerUser()
│   │   │                                  #    - loginUser()
│   │   │                                  #    - logoutUser()
│   │   │
│   │   ├── admin.service.ts              # 🔧 Admin service (future)
│   │   ├── pelanggan.service.ts          # 🔧 Pelanggan service (future)
│   │   └── instruktur.service.ts         # 🔧 Instructor service (future)
│   │
│   ├── 📂 ui/                            # UI Services
│   │   ├── admin/
│   │   │   ├── auth.service.ts           # 🔧 Admin auth UI service
│   │   │   ├── packages.service.ts       # 🔧 Packages UI service (future)
│   │   │   └── dashboard.service.ts      # 🔧 Dashboard service (future)
│   │   └── customer/
│   │       ├── auth.service.ts           # 🔧 Customer auth (future)
│   │       └── booking.service.ts        # 🔧 Booking service (future)
│   │
│   └── 📂 data/                          # Data Services
│       ├── test-data.service.ts          # 🔧 Setup/teardown data
│       ├── database.service.ts           # 🔧 DB access (future)
│       └── api-data.service.ts           # 🔧 Data via API (future)
│
│
├── 🔹 shared/                            # SHARED LAYER
│   │
│   ├── 📂 config/                        # Configuration
│   │   ├── env.config.ts                 # ⚙️ Environment config
│   │   │                                  #    - BASE_URL
│   │   │                                  #    - API_BASE_URL
│   │   │                                  #    - User credentials
│   │   │                                  #    - Timeouts
│   │   │
│   │   ├── api.config.ts                 # ⚙️ API config
│   │   │                                  #    - Base URL
│   │   │                                  #    - Endpoints mapping
│   │   │                                  #    - Admin, Pelanggan, Instruktur
│   │   │
│   │   └── ui.config.ts                  # ⚙️ UI config
│   │                                      #    - Routes
│   │                                      #    - Timeouts
│   │                                      #    - Selectors
│   │
│   ├── 📂 constants/                     # Constants
│   │   ├── endpoints.constants.ts        # 📌 API endpoints
│   │   │                                  #    - All routes with helpers
│   │   │                                  #    - ADMIN.PACKAGES.INDEX
│   │   │                                  #    - ADMIN.PACKAGES.SHOW(id)
│   │   │
│   │   ├── messages.constants.ts         # 📌 Messages (future)
│   │   ├── test-data.constants.ts        # 📌 Test data (future)
│   │   ├── selectors.constants.ts        # 📌 UI selectors (future)
│   │   └── http-status.constants.ts      # 📌 HTTP statuses (future)
│   │
│   ├── 📂 enums/                         # Enumerations
│   │   ├── roles.enum.ts                 # 📋 Role enums
│   │   │                                  #    - admin
│   │   │                                  #    - instruktur
│   │   │                                  #    - pelanggan
│   │   │
│   │   ├── booking-status.enum.ts        # 📋 Booking status (future)
│   │   ├── payment-status.enum.ts        # 📋 Payment status (future)
│   │   └── promo-status.enum.ts          # 📋 Promo status (future)
│   │
│   ├── 📂 types/                         # TypeScript Types
│   │   ├── api-response.type.ts          # 📝 API response types
│   │   │                                  #    - ApiResponse<T>
│   │   │                                  #    - AuthToken
│   │   │                                  #    - UserData
│   │   │                                  #    - PackageData
│   │   │                                  #    - BookingData
│   │   │                                  #    - TransaksiData
│   │   │
│   │   └── request.type.ts               # 📝 Request types (future)
│   │
│   ├── 📂 utils/                         # Utility Functions
│   │   ├── random.util.ts                # 🔨 Random data generator
│   │   │                                  #    - generateEmail()
│   │   │                                  #    - generatePhoneNumber()
│   │   │                                  #    - generatePrice()
│   │   │                                  #    - generatePromoCode()
│   │   │
│   │   ├── string.util.ts                # 🔨 String utilities (future)
│   │   ├── date.util.ts                  # 🔨 Date utilities (future)
│   │   ├── file.util.ts                  # 🔨 File utilities (future)
│   │   └── encryption.util.ts            # 🔨 Encryption (future)
│   │
│   └── 📂 helpers/                       # Helper Functions
│       ├── assertion.helper.ts           # 📍 Assertion helpers (future)
│       ├── wait.helper.ts                # 📍 Wait helpers (future)
│       ├── retry.helper.ts               # 📍 Retry logic (future)
│       └── mock-data.helper.ts           # 📍 Mock data (future)
│
│
├── 🔹 test-data/                         # Test Data & Seeds
│   ├── admin-users.json                  # Test admin users
│   ├── customer-users.json               # Test customers
│   ├── packages.json                     # Package test data
│   ├── kelas.json                        # Classes test data
│   ├── instruktur.json                   # Instructor test data
│   ├── promo.json                        # Promo test data
│   └── scenarios.json                    # Test scenarios
│
│
├── 🔹 config/                            # Configuration Directory
│   ├── test.config.ts                    # Test configuration
│   ├── api.config.ts                     # API config (see shared)
│   └── ui.config.ts                      # UI config (see shared)
│
│
├── 🔹 scripts/                           # Setup & Cleanup Scripts
│   ├── setup.ts                          # Initial setup script
│   ├── seed-data.ts                      # Database seeding
│   └── cleanup.ts                        # Test cleanup
│
│
├── 🔹 reports/                           # Test Reports
│   ├── html-report/                      # HTML test report
│   │   └── index.html
│   ├── api-report/                       # API test report
│   ├── ui-report/                        # UI test report
│   └── test-results.json                 # Raw results
│
│
└── 🔹 node_modules/                      # Dependencies (generated)
    └── @playwright/test
    └── axios
    └── ... (others)
```

## 📊 File Type Legend

| Icon | Meaning |
|------|---------|
| 📄 | Documentation/Config |
| 🔹 | Directory |
| 🔧 | Service/Helper |
| 🔷 | Client/Request |
| 📄 | Page Object |
| 📌 | Constant |
| 📋 | Enum |
| 📝 | Type/Interface |
| 🔨 | Utility |
| 📍 | Helper |
| ✅ | Implemented |
| (future) | Ready to implement |

## 🗺️ Navigation Guide

### Finding Things

**API Endpoints?**
→ `shared/constants/endpoints.constants.ts`

**Test Users?**
→ `.env.test`

**Admin Login Test?**
→ `tests/ui/admin/auth/positive/login.spec.ts`

**Login Page Object?**
→ `ui/pages/admin/login.page.ts`

**Login Request Builder?**
→ `api/requests/auth/login.request.ts`

**Configuration?**
→ `shared/config/` directory

**Random Data Generator?**
→ `shared/utils/random.util.ts`

**API Response Types?**
→ `shared/types/api-response.type.ts`

## 🚀 Quick Reference

### Run Tests
```bash
npm test                    # All tests
npm run test:ui             # UI only
npm run test:api            # API only
npm run test:headed         # With browser
npm run test:debug          # Debug mode
```

### View Reports
```bash
npm run test:report         # HTML report
```

### Code Quality
```bash
npm run lint                # Check style
npm run format              # Fix style
```

### Scripts (future)
```bash
npm run setup               # Setup
npm run seed                # Seed data
npm run cleanup             # Cleanup
```

## 📚 Learning Path

### Beginner
1. Read `README.md` - Overview
2. Read `QUICK_START.md` - Getting started
3. Run `npm test` - See tests work
4. Study `tests/api/auth/positive/login.spec.ts` - Example API test
5. Study `tests/ui/admin/auth/positive/login.spec.ts` - Example UI test

### Intermediate
1. Review `api/clients/base-client.ts` - HTTP client
2. Review `ui/pages/admin/login.page.ts` - Page Object
3. Review `shared/utils/random.util.ts` - Utilities
4. Review `services/api/auth.service.ts` - Services

### Advanced
1. Create new page objects
2. Create new request builders
3. Create new test specs
4. Extend services layer
5. Optimize test execution

## ✅ Checklist

### Setup
- [ ] `npm install`
- [ ] Update `.env.test`
- [ ] Run `npm test`
- [ ] View report

### Create API Test
- [ ] Create request builder if needed
- [ ] Create `.spec.ts` file in `tests/api/`
- [ ] Use existing clients/builders
- [ ] Add positive scenarios
- [ ] Run & verify

### Create UI Test
- [ ] Create page object if needed
- [ ] Create `.spec.ts` file in `tests/ui/`
- [ ] Use existing page objects
- [ ] Add positive scenarios
- [ ] Run & verify headless

---

**Total Files:** 35+  
**Total Code:** 1500+ lines  
**Test Cases:** 15+  
**Ready to extend:** ✅ Yes!

Happy Testing! 🎉
