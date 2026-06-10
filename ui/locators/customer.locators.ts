export const CUSTOMER_LOCATORS = {
  // Authentication
  auth: {
    loginLink: 'a:has-text("Login"), a:has-text("Sign In")',
    registerLink: 'a:has-text("Register"), a:has-text("Sign Up")',
    logoutButton: 'button:has-text("Logout"), a:has-text("Logout")',
    profileLink: 'a:has-text("Profile")',
  },

  // Login Page
  login: {
    emailInput: 'input[name="email"], input[type="email"]',
    passwordInput: 'input[name="password"], input[type="password"]',
    loginButton: 'button:has-text("Login"), button:has-text("Sign In")',
    rememberMeCheckbox: 'input[name="remember"]',
    forgotPasswordLink: 'a:has-text("Forgot"), a:has-text("forgot")',
  },

  // Register Page
  register: {
    nameInput: 'input[name="name"]',
    emailInput: 'input[name="email"], input[type="email"]',
    phoneInput: 'input[name="phone"], input[type="tel"]',
    passwordInput: 'input[name="password"]',
    passwordConfirmInput: 'input[name="password_confirmation"]',
    registerButton: 'button:has-text("Register"), button:has-text("Sign Up")',
    termsCheckbox: 'input[name="terms"], input[name="agree_terms"]',
  },

  // Home Page
  home: {
    title: 'h1, h2',
    classesSection: '[data-testid="classes-section"], section:has-text("Classes")',
    packagesSection: '[data-testid="packages-section"], section:has-text("Packages")',
    articlesSection: '[data-testid="articles-section"], section:has-text("Articles")',
    heroImage: 'img[alt*="hero"], img[alt*="banner"]',
  },

  // Classes Page
  classes: {
    list: 'h1:has-text("Classes"), h2:has-text("Classes")',
    table: 'table, [data-testid="classes-list"]',
    classCard: '[data-testid="class-card"], [class*="class-card"]',
    scheduleButton: 'button:has-text("View Schedule"), button:has-text("Jadwal")',
    detailsLink: 'a:has-text("Details"), a:has-text("View")',
    filterInput: 'input[placeholder*="Filter"], input[placeholder*="Search"]',
  },

  // Packages Page
  packages: {
    list: 'h1:has-text("Packages"), h2:has-text("Packages")',
    packageCard: '[data-testid="package-card"], [class*="package-card"]',
    priceTag: '[data-testid="price"], [class*="price"]',
    buyButton: 'button:has-text("Buy"), button:has-text("Purchase")',
    detailsButton: 'button:has-text("Details"), a:has-text("Details")',
    filterByPrice: 'input[name="price"], select[name="price"]',
  },

  // Bookings Page
  bookings: {
    list: 'h1:has-text("Bookings"), h2:has-text("Bookings")',
    table: 'table',
    bookingCard: '[data-testid="booking-card"], [class*="booking-card"]',
    cancelButton: 'button:has-text("Cancel"), button:has-text("Batalkan")',
    viewButton: 'a:has-text("View"), button:has-text("View")',
    emptyState: '[data-testid="empty-bookings"], text=/No bookings/i',
  },

  // Profile Page
  profile: {
    profileHeader: 'h1:has-text("Profile"), h2:has-text("Profile")',
    editButton: 'button:has-text("Edit Profile"), a:has-text("Edit")',
    nameDisplay: '[data-testid="profile-name"], [class*="profile-name"]',
    emailDisplay: '[data-testid="profile-email"], [class*="profile-email"]',
    phoneDisplay: '[data-testid="profile-phone"], [class*="profile-phone"]',
    changePasswordLink: 'a:has-text("Change Password"), button:has-text("Change Password")',
  },

  // Profile Edit
  profileEdit: {
    nameInput: 'input[name="name"]',
    phoneInput: 'input[name="phone"]',
    addressInput: 'textarea[name="address"]',
    saveButton: 'button:has-text("Save"), button:has-text("Simpan")',
    cancelButton: 'button:has-text("Cancel"), a:has-text("Cancel")',
  },

  // Transactions Page
  transactions: {
    list: 'h1:has-text("Transactions"), h2:has-text("Transactions")',
    table: 'table',
    dateColumn: 'table tbody td:nth-child(1)',
    amountColumn: 'table tbody td:nth-child(2)',
    statusColumn: 'table tbody td:nth-child(3)',
    filterByStatus: 'select[name="status"]',
    filterByDate: 'input[name="date"], input[type="date"]',
  },

  // Credit History
  credit: {
    saldoDisplay: '[data-testid="credit-balance"], [class*="balance"]',
    historyTable: 'table',
    historyCard: '[data-testid="credit-card"], [class*="credit-card"]',
    totalCredit: '[data-testid="total-credit"], [class*="total"]',
  },

  // Checkout/Payment
  checkout: {
    summarySection: '[data-testid="order-summary"], section:has-text("Summary")',
    totalPrice: '[data-testid="total-price"], [class*="total"]',
    paymentMethod: 'select[name="payment_method"]',
    checkoutButton: 'button:has-text("Checkout"), button:has-text("Pay")',
    applyPromoInput: 'input[name="promo_code"]',
    applyPromoButton: 'button:has-text("Apply"), button:has-text("Terapkan")',
  },

  // Articles Page
  articles: {
    list: 'h1:has-text("Articles"), h2:has-text("Articles")',
    articleCard: '[data-testid="article-card"], [class*="article-card"]',
    articleLink: 'a[href*="/articles"]',
    searchInput: 'input[placeholder*="Search"]',
    categoryFilter: 'select[name="category"]',
  },

  // Navbar
  navbar: {
    logo: 'a[href="/"]',
    homeLink: 'a:has-text("Home")',
    classesLink: 'a:has-text("Classes")',
    packagesLink: 'a:has-text("Packages")',
    articlesLink: 'a:has-text("Articles")',
    profileDropdown: 'button[aria-label="Profile"], [data-testid="profile-menu"]',
    userMenu: '[data-testid="user-menu"]',
  },
};

export default CUSTOMER_LOCATORS;
