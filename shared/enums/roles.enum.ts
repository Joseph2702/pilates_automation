export enum Role {
  ADMIN = 'admin',
  INSTRUKTUR = 'instruktur',
  PELANGGAN = 'pelanggan',
}

export enum BookingStatus {
  BOOKED = 'booked',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
  NO_SHOW = 'no_show',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

export enum PromoStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  EXPIRED = 'expired',
}

export default {
  Role,
  BookingStatus,
  PaymentStatus,
  PromoStatus,
};
