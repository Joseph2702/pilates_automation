export const ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },

  ADMIN: {
    PACKAGES: {
      INDEX: '/admin/packages',
      STORE: '/admin/packages',
      SHOW: (id: number) => `/admin/packages/${id}`,
      UPDATE: (id: number) => `/admin/packages/${id}`,
      DELETE: (id: number) => `/admin/packages/${id}`,
    },
    KELAS: {
      INDEX: '/admin/kelas',
      STORE: '/admin/kelas',
      SHOW: (id: number) => `/admin/kelas/${id}`,
      UPDATE: (id: number) => `/admin/kelas/${id}`,
      DELETE: (id: number) => `/admin/kelas/${id}`,
    },
    INSTRUKTUR: {
      INDEX: '/admin/instruktur',
      STORE: '/admin/instruktur',
      SHOW: (id: number) => `/admin/instruktur/${id}`,
      UPDATE: (id: number) => `/admin/instruktur/${id}`,
      DELETE: (id: number) => `/admin/instruktur/${id}`,
    },
    PROMO: {
      INDEX: '/admin/promo',
      STORE: '/admin/promo',
      SHOW: (id: number) => `/admin/promo/${id}`,
      UPDATE: (id: number) => `/admin/promo/${id}`,
      DELETE: (id: number) => `/admin/promo/${id}`,
    },
    ARTIKEL: {
      INDEX: '/admin/artikel',
      STORE: '/admin/artikel',
      SHOW: (id: number) => `/admin/artikel/${id}`,
      UPDATE: (id: number) => `/admin/artikel/${id}`,
      DELETE: (id: number) => `/admin/artikel/${id}`,
    },
    JADWAL_KELAS: {
      INDEX: '/admin/jadwal-kelas',
      STORE: '/admin/jadwal-kelas',
      SHOW: (id: number) => `/admin/jadwal-kelas/${id}`,
      UPDATE: (id: number) => `/admin/jadwal-kelas/${id}`,
      DELETE: (id: number) => `/admin/jadwal-kelas/${id}`,
    },
    BOOKINGS: {
      INDEX: '/admin/bookings',
      SHOW: (id: number) => `/admin/bookings/${id}`,
    },
    ABSENSI: {
      BY_JADWAL: (idJadwalKelas: number) => `/admin/absensi/jadwal/${idJadwalKelas}`,
      STORE: '/admin/absensi',
    },
    PELANGGAN: {
      INDEX: '/admin/pelanggan',
      SHOW: (id: number) => `/admin/pelanggan/${id}`,
      UPDATE: (id: number) => `/admin/pelanggan/${id}`,
      DELETE: (id: number) => `/admin/pelanggan/${id}`,
    },
    TRANSAKSI: {
      INDEX: '/admin/transaksi',
      SHOW: (id: number) => `/admin/transaksi/${id}`,
    },
    PEMBELIAN_PACKAGE: {
      INDEX: '/admin/pembelian-package',
      SHOW: (id: number) => `/admin/pembelian-package/${id}`,
    },
    USERS: {
      INDEX: '/admin/users',
      SHOW: (id: number) => `/admin/users/${id}`,
      UPDATE: (id: number) => `/admin/users/${id}`,
      DEACTIVATE: (id: number) => `/admin/users/${id}/deactivate`,
      SYNC_ROLES: (id: number) => `/admin/users/${id}/roles`,
    },
    ROLES: {
      INDEX: '/admin/roles',
      STORE: '/admin/roles',
      SHOW: (id: number) => `/admin/roles/${id}`,
      UPDATE: (id: number) => `/admin/roles/${id}`,
      DELETE: (id: number) => `/admin/roles/${id}`,
      SYNC_PERMISSIONS: (id: number) => `/admin/roles/${id}/permissions`,
    },
    PERMISSIONS: {
      INDEX: '/admin/permissions',
      STORE: '/admin/permissions',
      SHOW: (id: number) => `/admin/permissions/${id}`,
      UPDATE: (id: number) => `/admin/permissions/${id}`,
      DELETE: (id: number) => `/admin/permissions/${id}`,
    },
    ACTIVITY_LOGS: {
      INDEX: '/admin/activity-logs',
      BY_USER: (id: number) => `/admin/activity-logs/user/${id}`,
    },
  },

  PELANGGAN: {
    JADWAL_KELAS: {
      INDEX: '/pelanggan/jadwal-kelas',
      SHOW: (id: number) => `/pelanggan/jadwal-kelas/${id}`,
    },
    ARTIKEL: {
      INDEX: '/pelanggan/artikel',
      SHOW: (id: number) => `/pelanggan/artikel/${id}`,
    },
    BOOKINGS: {
      INDEX: '/pelanggan/bookings',
      SHOW: (id: number) => `/pelanggan/bookings/${id}`,
      STORE: '/pelanggan/bookings',
      CANCEL: (id: number) => `/pelanggan/bookings/${id}/cancel`,
    },
    PEMBELIAN: {
      INDEX: '/pelanggan/pembelian',
      SHOW: (id: number) => `/pelanggan/pembelian/${id}`,
    },
    TRANSAKSI: {
      INDEX: '/pelanggan/transaksi',
    },
    KREDIT: {
      SALDO: '/pelanggan/kredit/saldo',
      HISTORY: '/pelanggan/kredit/history',
    },
    PAYMENTS: {
      CHECKOUT: '/pelanggan/payments/checkout',
    },
  },

  INSTRUKTUR: {
    JADWAL: {
      INDEX: '/instruktur/jadwal',
      SHOW: (id: number) => `/instruktur/jadwal/${id}`,
    },
    ABSENSI: {
      BY_JADWAL: (idJadwalKelas: number) => `/instruktur/absensi/jadwal/${idJadwalKelas}`,
      STORE: '/instruktur/absensi',
    },
  },

  PUBLIC: {
    PACKAGES: {
      INDEX: '/packages',
      SHOW: (id: number) => `/packages/${id}`,
    },
    WEBHOOK_MIDTRANS: '/webhook/midtrans',
  },
};

export default ENDPOINTS;
