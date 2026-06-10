import { envConfig } from './env.config';

export const apiConfig = {
  baseURL: envConfig.API_BASE_URL,
  timeout: envConfig.TIMEOUT,

  endpoints: {
    // Auth
    auth: {
      register: '/auth/register',
      login: '/auth/login',
      logout: '/auth/logout',
      me: '/auth/me',
    },

    // Admin
    admin: {
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

    // Pelanggan
    pelanggan: {
      jadwalKelas: '/pelanggan/jadwal-kelas',
      artikel: '/pelanggan/artikel',
      bookings: '/pelanggan/bookings',
      pembelian: '/pelanggan/pembelian',
      transaksi: '/pelanggan/transaksi',
      kredit: '/pelanggan/kredit',
      payments: '/pelanggan/payments/checkout',
    },

    // Instruktur
    instruktur: {
      jadwal: '/instruktur/jadwal',
      absensi: '/instruktur/absensi',
    },

    // Public
    public: {
      packages: '/packages',
      webhook: '/webhook/midtrans',
    },
  },
};

export default apiConfig;
