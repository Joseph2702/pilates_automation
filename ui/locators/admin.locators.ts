export const ADMIN_LOCATORS = {
  // Admin Panel
  admin: {
    dashboard: 'h1:has-text("Dashboard")',
    sidebar: 'aside, [class*="sidebar"]',
  },

  // Master Data Modules
  modules: {
    packages: 'a:has-text("Package"), a:has-text("Paket")',
    kelas: 'a:has-text("Kelas"), a:has-text("Classes")',
    instruktur: 'a:has-text("Instruktur"), a:has-text("Instructor")',
    promo: 'a:has-text("Promo")',
    artikel: 'a:has-text("Artikel"), a:has-text("Article")',
    jadwalKelas: 'a:has-text("Jadwal"), a:has-text("Schedule")',
    pelanggan: 'a:has-text("Pelanggan"), a:has-text("Customer")',
  },

  // Packages Module
  packages: {
    list: 'h1:has-text("Package"), h2:has-text("Package")',
    createButton: 'button:has-text("Create Package"), button:has-text("Tambah Package")',
    table: 'table',
    nameColumn: (index: number) => `table tbody tr:nth-child(${index}) td:nth-child(1)`,
    priceColumn: (index: number) => `table tbody tr:nth-child(${index}) td:nth-child(2)`,
    editButton: (packageId: string) => `tr:has-text("${packageId}") button:has-text("Edit")`,
    deleteButton: (packageId: string) => `tr:has-text("${packageId}") button:has-text("Delete")`,
    nameInput: 'input[name="name"]',
    priceInput: 'input[name="price"]',
    durationInput: 'input[name="duration_days"]',
    creditsInput: 'input[name="credit_session"]',
    descriptionTextarea: 'textarea[name="description"]',
  },

  // Kelas Module
  kelas: {
    list: 'h1:has-text("Kelas"), h2:has-text("Kelas")',
    createButton: 'button:has-text("Create Kelas"), button:has-text("Tambah Kelas")',
    table: 'table',
    nameInput: 'input[name="name"]',
    descriptionTextarea: 'textarea[name="description"]',
    editButton: (kelasName: string) => `tr:has-text("${kelasName}") button:has-text("Edit")`,
    deleteButton: (kelasName: string) => `tr:has-text("${kelasName}") button:has-text("Delete")`,
  },

  // Instruktur Module
  instruktur: {
    list: 'h1:has-text("Instruktur"), h2:has-text("Instruktur")',
    createButton: 'button:has-text("Create Instruktur"), button:has-text("Tambah Instruktur")',
    table: 'table',
    nameInput: 'input[name="name"]',
    emailInput: 'input[name="email"]',
    phoneInput: 'input[name="phone"]',
    editButton: (name: string) => `tr:has-text("${name}") button:has-text("Edit")`,
    deleteButton: (name: string) => `tr:has-text("${name}") button:has-text("Delete")`,
  },

  // Promo Module
  promo: {
    list: 'h1:has-text("Promo"), h2:has-text("Promo")',
    createButton: 'button:has-text("Create Promo"), button:has-text("Tambah Promo")',
    table: 'table',
    codeInput: 'input[name="code"]',
    discountInput: 'input[name="discount_percent"], input[name="discount_nominal"]',
    maxUsageInput: 'input[name="max_usage"]',
    editButton: (code: string) => `tr:has-text("${code}") button:has-text("Edit")`,
    deleteButton: (code: string) => `tr:has-text("${code}") button:has-text("Delete")`,
  },

  // Artikel Module
  artikel: {
    list: 'h1:has-text("Artikel"), h2:has-text("Artikel")',
    createButton: 'button:has-text("Create Artikel"), button:has-text("Tambah Artikel")',
    table: 'table',
    titleInput: 'input[name="title"]',
    contentTextarea: 'textarea[name="content"]',
    authorInput: 'input[name="author"]',
    editButton: (title: string) => `tr:has-text("${title}") button:has-text("Edit")`,
    deleteButton: (title: string) => `tr:has-text("${title}") button:has-text("Delete")`,
  },

  // User Management
  users: {
    list: 'h1:has-text("User"), h2:has-text("User")',
    createButton: 'button:has-text("Create User"), button:has-text("Tambah User")',
    table: 'table',
    emailInput: 'input[name="email"]',
    nameInput: 'input[name="name"]',
    roleSelect: 'select[name="role"]',
    editButton: (email: string) => `tr:has-text("${email}") button:has-text("Edit")`,
    deleteButton: (email: string) => `tr:has-text("${email}") button:has-text("Delete")`,
  },

  // Roles & Permissions
  roles: {
    list: 'h1:has-text("Role"), h2:has-text("Role")',
    createButton: 'button:has-text("Create Role"), button:has-text("Tambah Role")',
    table: 'table',
    nameInput: 'input[name="name"]',
    permissionsCheckboxes: 'input[type="checkbox"]',
  },

  // Dashboard Stats
  stats: {
    totalUsers: '[data-testid="total-users"], [class*="total-users"]',
    totalBookings: '[data-testid="total-bookings"], [class*="total-bookings"]',
    totalRevenue: '[data-testid="total-revenue"], [class*="total-revenue"]',
    totalPackages: '[data-testid="total-packages"], [class*="total-packages"]',
  },
};

export default ADMIN_LOCATORS;
