import { envConfig } from './env.config';

export const uiConfig = {
  baseURL: envConfig.BASE_URL,

  // Timeouts
  timeout: envConfig.TIMEOUT,
  navigationTimeout: envConfig.NAVIGATION_TIMEOUT,
  actionTimeout: 10000,
  waitForLoadStateTimeout: 30000,

  // Selectors
  selectors: {
    button: 'button',
    input: 'input',
    link: 'a',
    form: 'form',
    modal: '[role="dialog"]',
    toast: '[role="alert"]',
  },

  // Wait times
  waitTimes: {
    short: 1000,
    medium: 3000,
    long: 5000,
  },

  // Retry logic
  retry: {
    maxAttempts: 3,
    delayMs: 1000,
  },

  // Admin panel routes
  adminRoutes: {
    login: '/admin/login',
    dashboard: '/admin',
    packages: '/admin/packages',
    kelas: '/admin/kelas',
    instruktur: '/admin/instruktur',
    promo: '/admin/promo',
    artikel: '/admin/artikel',
    jadwalKelas: '/admin/jadwal-kelas',
    bookings: '/admin/bookings',
    absensi: '/admin/absensi',
    pelanggan: '/admin/pelanggan',
    transaksi: '/admin/transaksi',
    pembelianPackage: '/admin/pembelian-package',
    users: '/admin/users',
    roles: '/admin/roles',
    permissions: '/admin/permissions',
    activityLogs: '/admin/activity-logs',
  },

  // Customer portal routes
  customerRoutes: {
    home: '/',
    login: '/login',
    register: '/register',
    classes: '/classes',
    packages: '/packages',
    articles: '/articles',
    profile: '/profile',
    bookings: '/profile/schedule',
    transactions: '/profile/transactions',
  },

  // Instructor routes
  instructorRoutes: {
    login: '/instruktur/login',
    dashboard: '/instruktur',
    jadwal: '/instruktur/jadwal',
    absensi: '/instruktur/absensi',
    profile: '/instruktur/profile',
  },
};

export default uiConfig;
