export const COMMON_LOCATORS = {
  // Buttons
  buttons: {
    submit: 'button[type="submit"]',
    cancel: 'button:has-text("Cancel"), a:has-text("Cancel")',
    create: 'button:has-text("Create"), button:has-text("Tambah"), button:has-text("Add")',
    edit: 'button:has-text("Edit"), button:has-text("Ubah")',
    delete: 'button:has-text("Delete"), button:has-text("Hapus")',
    save: 'button:has-text("Save"), button:has-text("Simpan")',
    back: 'button:has-text("Back"), a:has-text("Back")',
    close: 'button[aria-label="Close"], button:has-text("×")',
    logout: 'button:has-text("Logout"), a:has-text("Logout")',
    login: 'button:has-text("Login"), button:has-text("Sign In")',
    register: 'button:has-text("Register"), button:has-text("Sign Up")',
  },

  // Inputs
  inputs: {
    email: 'input[name="email"], input[type="email"]',
    password: 'input[name="password"], input[type="password"]',
    name: 'input[name="name"]',
    phone: 'input[name="phone"], input[type="tel"]',
    search: 'input[placeholder*="Search"], input[placeholder*="search"]',
    text: 'input[type="text"]',
    number: 'input[type="number"]',
    date: 'input[type="date"]',
  },

  // Selects
  selects: {
    role: 'select[name="role"]',
    status: 'select[name="status"]',
    category: 'select[name="category"]',
  },

  // Tables
  tables: {
    table: 'table',
    header: 'table thead th, table thead td',
    row: 'table tbody tr',
    cell: 'table tbody td',
    checkbox: 'table tbody tr input[type="checkbox"]',
  },

  // Navigation
  navigation: {
    navbar: 'nav, [role="navigation"]',
    sidebar: 'aside, .sidebar, [class*="sidebar"]',
    breadcrumb: '[role="navigation"] [aria-label*="Breadcrumb"]',
    menu: '[role="menu"]',
  },

  // Feedback
  feedback: {
    alert: '[role="alert"]',
    error: '[role="alert"], .error, .text-error, [class*="error"]',
    success: '[role="alert"]:has-text("Success"), .success, .text-success',
    warning: '[role="alert"]:has-text("Warning"), .warning, .text-warning',
    info: '[role="alert"]:has-text("Info"), .info, .text-info',
  },

  // Modals
  modals: {
    modal: '[role="dialog"]',
    backdrop: '[class*="backdrop"], [class*="overlay"]',
    title: '[role="dialog"] h1, [role="dialog"] h2, [role="dialog"] h3',
    content: '[role="dialog"] [class*="content"], [role="dialog"] [class*="body"]',
  },

  // Pagination
  pagination: {
    container: '[aria-label="Pagination"], nav[role="navigation"]',
    nextButton: 'button[aria-label*="Next"], a:has-text("Next")',
    previousButton: 'button[aria-label*="Previous"], a:has-text("Previous")',
    pageButton: (page: number) => `button:has-text("${page}"), a:has-text("${page}")`,
  },

  // Loading
  loading: {
    spinner: '[class*="spinner"], [class*="loading"], [role="status"]:has-text("Loading")',
    skeleton: '[class*="skeleton"], [class*="placeholder"]',
  },

  // Headers
  headers: {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    pageTitle: 'h1, h2, [class*="title"]',
  },

  // Links
  links: {
    link: 'a',
    navLink: 'nav a, [role="navigation"] a',
  },
};

export default COMMON_LOCATORS;
